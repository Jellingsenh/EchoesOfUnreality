package com.jellingsen.games.echoes_of_unreality.Manager;
import java.util.Arrays;
import java.util.Vector;
import java.util.Comparator;

import com.jellingsen.games.echoes_of_unreality.API.Filters.LocationFilterOptions;
import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationNature;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationSociety;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSort;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
import com.jellingsen.games.echoes_of_unreality.Database.DatabaseConnection;

public class UnrealityManager {
    private DatabaseConnection databaseConnection;

    public UnrealityManager() {
        this.databaseConnection = new DatabaseConnection();
    }  

    // HEALTH CHECK //

    public String getHeartbeat() {
        return "Echoes of Unreality combat engine is running.";
    }

    // PAGINATED COMPRESSED LOCATIONS //

    public Vector<CompressedLocation> getPaginatedCompressedLocations(int offset, int limit, LocationFilterOptions filter) {
        if (filter != null) { 
            if (filter.parent != null) {
                filter.sortBy = LocationSort.POSITION; // position on parent
            }
            if (filter.sortBy != null) {
                if (LocationSort.TYPE == filter.sortBy && filter.type != null) {
                    filter.sortBy = LocationSort.TIME; // cannot sort by type if only 1 type
                }
            } else { 
                filter.sortBy = LocationSort.TIME; // default
            } 
            if (filter.descending == null) { filter.descending = false; } // default
        } else {
            filter = new LocationFilterOptions();
            filter.sortBy = LocationSort.TIME; // default
            filter.descending = false; // default
        }

        // System.out.println("  > Getting compressed locations with filter options: " + 
        //     ((filter.name != null) ? "name=" + filter.name + ", " : "") +
        //     ((filter.type != null) ? "type=" + filter.type + ", " : "") +
        //     ((filter.breathable != null) ? "breathable=" + filter.breathable + ", " : "") +
        //     ((filter.parent != null) ? "parent=" + filter.parent.name + " (" + filter.parent.type + "), " : "") +
        //     "sortBy=" + filter.sortBy + ", descending=" + filter.descending +
        //     ", offset = " + offset + ", limit = " + limit + "."
        // );

        return databaseConnection.getPaginatedCompressedLocations(offset, limit, filter);
    }

    // FULLY RANDOM LOCATION //

    public Location generateRandomLocation() {
        Location randomLocation = new Location();
        return generatePartiallyRandomLocation(randomLocation, null, false); // randomize all fields
    }

    // PARTIALLY RANDOM LOCATION //

    public Location generatePartiallyRandomLocation(Location location, String[] locked, boolean saveToDB) {
        if (location == null) {
            return null;
        }

        Vector<String> unlockedVector = new Vector<String>(Arrays.asList(
            "name",
            "type",
            "appearance",
            "summary",
            "size",
            "modifier",
            "nature",
            "society",
            "anomalies",
            "parent",
            "position",
            "children"));
        if (locked != null) {
            for (String lockedField : locked) { unlockedVector.remove(lockedField);}
        }
        int unlockedSize = unlockedVector.size();
        if (unlockedSize < 1) {
            System.out.println("  -->  No fields unlocked for randomization. Returning location as is.");
            return location;
        }
        String nameStr = (location.name != null) ? "currently named" + location.name : "not yet named";
        System.out.println("  -->  Randomizing " + unlockedSize + " fields for location (" + nameStr + "): " + String.join(", ", unlockedVector));
        System.out.println(saveToDB ? "    > Saving randomized result to DB..." : "    > Not saving result...");

        CompressedLocation uniqueLoc = generateUniqueCompressedNameAndType(location.name, !unlockedVector.contains("name"), location.type, !unlockedVector.contains("type"), saveToDB);
        if (uniqueLoc == null) { return null; }
        location.name = uniqueLoc.name;
        location.type = uniqueLoc.type;

        if (unlockedVector.contains("modifier")) { location.modifier = generateRandomLocationModifier(); } 
        if (unlockedVector.contains("size")) { location.size = generateRandomLocationSize(location.modifier); } // based on modifier (contrary or extreme)
        if (unlockedVector.contains("anomalies")) { location.anomalies = generateRandomLocationAnomalies(location.type, location.modifier); } // based on type and modifier (unreal) (use llm?)

        if (unlockedVector.contains("parent")) { 
            CompressedLocation existingParent = null;
            if (saveToDB) { // only check for existing parent is saving (will be linked on official save later)
                existingParent = databaseConnection.findExistingParent(uniqueLoc); // find any exisitng location that has this as a child
            }
            location.parent = (existingParent != null) ? existingParent : generateRandomCompressedParent(location.type, LocationModifier.DISORDERED == location.modifier, false); // based on type and modifier (disordered)
        }
        if (unlockedVector.contains("position")) { location.position = generateRandomPositionOnParent(location.type); } // based on type
        if (unlockedVector.contains("children")) { 
            Vector<CompressedLocation> existingChildren = null;
            if (saveToDB) {
                existingChildren = databaseConnection.findAllExistingChildren(uniqueLoc); // find any existing locaions that have this as a parent
            }
            location.children = joinChildrenAndRemoveDuplicates((existingChildren != null && !existingChildren.isEmpty()) ? existingChildren : generateRandomCompressedChildren(location.type), location.children); // based on type, adds any children passed in
        }

        boolean natureUnlocked = unlockedVector.contains("nature");
        boolean societyUnlocked = unlockedVector.contains("society");
        Location parentLocation = null; 
        if ((natureUnlocked && (LocationType.CONTINENT == location.type 
                            || LocationType.COUNTRY == location.type 
                            || LocationType.AREA == location.type 
                            || LocationType.CITY == location.type 
                            || LocationType.PLACE == location.type)) 
            || (societyUnlocked && (LocationType.CITY == location.type 
                            || LocationType.PLACE == location.type))) 
        { 
            parentLocation = uncompressParentLocation(location.parent, saveToDB, compressLocation(location)); // recursively generate or find parent until a society or nature to inherit is found
            if (parentLocation != null) {
                location.parent.charted = true; // if parent is uncompressed, it is now charted
            }
        } 
        if (natureUnlocked) { location.nature = generateRandomLocationNature(location.type, location.modifier, location.size, (location.parent != null ? location.parent.type : null), (parentLocation == null) ? null : parentLocation.nature, location.children); } // based on type, modifer (deserted or volatile or extreme), size, , children, & parentType (& if contains continent if star) (use llm?)
        if (societyUnlocked) { location.society = generateRandomLocationSociety(uniqueLoc, location.modifier, location.anomalies, location.nature, (parentLocation == null) ? null : parentLocation.society, (parentLocation == null) ? null : parentLocation.children); } // based on type and modifier (deserted or extreme), anomalies, environments, & siblings (use llm?) 
        
        if (unlockedVector.contains("appearance")) { location.appearance = generateRandomAppearance(location.type, location.size, location.nature, (location.parent != null ? location.parent.type : null)); } // based on type, size, and materials (use llm?)
        if (unlockedVector.contains("summary")) { location.summary = generateRandomLocationSummary(location.type, location.anomalies, location.society); } // based on type, anomalies, culture, & secrets (use llm?)

        return (saveToDB) ? saveLocationToDatabase(location) : location; // only save if requested
    }

    // RANDOM LOCATION GENERATION FUNCTIONS //

    private CompressedLocation generateUniqueCompressedNameAndType(String name, boolean nameLocked, LocationType type, boolean typeLocked, boolean saveToDB) {
        CompressedLocation compressedLocation = new CompressedLocation();
        compressedLocation.type = (typeLocked) ? type : generateRandomLocationType();
        compressedLocation.name = (nameLocked) ? name : generateRandomLocationName(compressedLocation.type);

        compressedLocation.charted = databaseConnection.isLocationInCollection(compressedLocation.name, compressedLocation.type);

        if (saveToDB && compressedLocation.charted) { // regenerate name if planning to save AND it already exists
            int safeCount = 0;
            while (compressedLocation.charted) { 
                if (nameLocked) { 
                    if (typeLocked) { 
                        System.out.println("  -->  Location with name " + compressedLocation.name + " and type " + compressedLocation.type + " already exists. Cannot generate new name & type due to locked name and type fields. Returning null.");
                        return null; 
                    } 
                    else { // name locked, type unlocked
                        compressedLocation.type = generateRandomLocationType(); // regen type
                    }
                } else { // name unlocked
                    compressedLocation.name = generateRandomLocationName(compressedLocation.type); // regen name
                }
                if (safeCount++ > 1000) { return null; } // safety break
                compressedLocation.charted = databaseConnection.isLocationInCollection(compressedLocation.name, compressedLocation.type);
            }
        }
    
        return compressedLocation;
    }

    private LocationType generateRandomLocationType() {
        int randInt = Randomizer.randomIntXtoY(1, 1000);
        if (randInt == 1) { return LocationType.DIMENSION; } // .1%
        if (randInt <= 10) { return LocationType.UNIVERSE; } // .9%
        if (randInt <= 20) { return LocationType.GALAXY; } // 1%
        if (randInt <= 50) { return LocationType.SPACE; } // 3%
        if (randInt <= 150) { return LocationType.STAR; } // 10%
        if (randInt <= 350) { return LocationType.PLANET; }// 20%
        if (randInt <= 400) { return LocationType.MOON; }// 5%
        if (randInt <= 450) { return LocationType.FEATURE; }// 5%
        if (randInt <= 500) { return LocationType.CONTINENT; } // 5%
        if (randInt <= 600) { return LocationType.COUNTRY; } // 10%
        if (randInt <= 650) { return LocationType.AREA; } // 5%
        if (randInt <= 950) { return LocationType.CITY; } // 30%
        return LocationType.PLACE; // 5%
    }

    private String generateRandomLocationName(LocationType type) {
        if (type == null) { return null; }
        String nameNumber = Integer.toString(Randomizer.randomIntXtoY(1, 1000) * Randomizer.randomIntXtoY(1, 1000)).substring(0, 2);
        switch (type) {
            case DIMENSION -> { return "Random_Dimension_" + nameNumber; } // josh todo make random lists and use numbers only if conflicts
            case UNIVERSE -> { return "Random_Universe_" + nameNumber; }
            case GALAXY -> { return "Random_Galaxy_" + nameNumber; }
            case SPACE -> { return "Random_Space_" + nameNumber; }
            case STAR -> { return "Random_Star_" + nameNumber; }
            case PLANET -> { return "Random_Planet_" + nameNumber; }
            case MOON -> { return "Random_Moon_" + nameNumber; }
            case FEATURE -> { return "Random_Feature_" + nameNumber; }
            case CONTINENT -> { return "Random_Continent_" + nameNumber; }
            case COUNTRY -> { return "Random_Country_" + nameNumber; }
            case AREA -> { return "Random_Area_" + nameNumber; }
            case CITY -> { return "Random_City_" + nameNumber; }
            case PLACE -> { return "Random_Place_" + nameNumber; }
        }
        return "Unknown location"; // should never happen
    }

    private LocationModifier generateRandomLocationModifier() {
        switch (Randomizer.randomIntXtoY(1, 20)) {
            case 1, 2 -> { return LocationModifier.CONTRARY; } // 10%
            case 3, 4 -> { return LocationModifier.DISORDERED; } // 10%
            case 5, 6 -> { return LocationModifier.DESERTED; } //10%
            case 7, 8 -> { return LocationModifier.VOLATILE; } // 10%
            case 9 -> { return LocationModifier.EXTREME; } // 5%
            case 10 -> { return LocationModifier.UNREAL; }// 5%
            default -> { return null; } // 50%
        }
    }

        private LocationSize generateRandomLocationSize(LocationModifier modifier) {
        if (LocationModifier.EXTREME == modifier) {
            return LocationSize.MASSIVE;
        }
        if (LocationModifier.CONTRARY == modifier || Randomizer.randomIntXtoY(1, 20) <= 1) { // 5% or contrary
            switch (Randomizer.randomIntXtoY(1, 10)) {
                case 1,2,3,4,5 -> { return LocationSize.SMALL; } // 50%
                case 6,7,8,9 -> { return LocationSize.HUGE; } // 40%
                default -> { return LocationSize.MASSIVE; } // 10%  
            }
        }
        return LocationSize.STANDARD;
    }

    private Vector<String> generateRandomLocationAnomalies(LocationType type, LocationModifier modifier) {
        Vector<String> newAnomalies = new Vector<String>();
        int anomaliesToAdd = 0;

        if (modifier == LocationModifier.UNREAL) { anomaliesToAdd += 2; }
        
        switch (Randomizer.randomIntXtoY(1, 10)) {
            case 1,2 -> anomaliesToAdd++; // 20%
            case 3 -> anomaliesToAdd += 2; // 10%
            case 4 -> anomaliesToAdd += 3; //10%
            case 5 -> anomaliesToAdd += 4; // 10%
            default -> {} // 50%
        }
        if (anomaliesToAdd == 0) { return null; }

        for (int i = 0; i < anomaliesToAdd; i++) {
            newAnomalies.add(generateLocationAnomaly(type, newAnomalies)); 
        }

        return newAnomalies;
    }

    private String generateLocationAnomaly(LocationType type, Vector<String> anomalies) { // josh LLM?
        String resultStr = switch (type) {
            case DIMENSION -> "Dimensional instability"; // josh todo make list of env anomalies by type and use numbers for random getting
            case UNIVERSE -> "Unknown physical laws";
            case GALAXY -> "Dark matter storms";
            case SPACE -> "Spatial distortions";
            case STAR -> "Solar flares";
            case PLANET -> "Magnetic field fluctuations";
            case MOON -> "Tidal anomalies";
            case FEATURE -> "Geological instability";
            case CONTINENT -> "Climate anomalies";
            case COUNTRY -> "Political unrest";
            case AREA -> "Natural disasters";
            case CITY -> "Technological malfunctions";
            case PLACE -> "Temporal loops";
            default -> "Unknown anomaly"; // should never happen
        };

        if (anomalies.contains(resultStr)) { // ensure no duplicates (josh fix)
            String anomNumber = Integer.toString(Randomizer.randomIntXtoY(1, 1000) * Randomizer.randomIntXtoY(1, 1000)).substring(0, 2);
            return "placeholder anomaly " + anomNumber; // generateAnomaly(newAnomalies); uncomment once large choice set is made (no loops)
        }
        
        return resultStr;
    }

    private CompressedLocation generateRandomCompressedParent(LocationType type, boolean disordered, boolean alwaysParent) { // (disordered)        ;
        LocationType newType = null;

        switch (type) {
            case DIMENSION -> {
                if (disordered || alwaysParent || Randomizer.randomIntXtoY(1,100) <= 1) { newType = LocationType.PLACE; } // 1% pocket dimension with a place as a parent
                else { newType = null; } // 99% dimensions have no parent
            }
            case UNIVERSE -> newType = (disordered) ? LocationType.PLACE : LocationType.DIMENSION;
            case GALAXY -> newType = (disordered) ? LocationType.PLACE : LocationType.UNIVERSE;
            case SPACE -> newType = (disordered) ? LocationType.PLACE : LocationType.UNIVERSE;
            case STAR -> {
                if (disordered) { newType = LocationType.PLANET; }
                // else if (Randomizer.randomIntXtoY(1,20) <= 1) { newType = LocationType.SPACE; } // 5% in empty space
                else { newType = LocationType.GALAXY; } // 100% in a galaxy
            }
            case PLANET -> newType = (disordered) ? LocationType.MOON : LocationType.STAR;
            case MOON -> newType = (disordered) ? LocationType.STAR : LocationType.PLANET;
            case FEATURE -> {
                if (disordered) { newType = LocationType.GALAXY; }
                else {
                    switch (Randomizer.randomIntXtoY(1,10)) {
                        case 1 -> newType = LocationType.SPACE; // 10%
                        case 2 -> newType = LocationType.STAR; // 10%
                        case 3,4,5,6,7 -> newType = LocationType.PLANET; // 50%
                        case 8,9,10 -> newType = LocationType.MOON; // 30%
                    }
                }
            }
            case CONTINENT -> {
                if (disordered) { newType = LocationType.STAR; }
                else {
                    switch (Randomizer.randomIntXtoY(1,20)) {
                        case 1 -> newType = LocationType.STAR; // 5%
                        case 2,3,4,5,6 -> newType = LocationType.MOON; // 25%
                        default-> newType = LocationType.PLANET; // 70%
                    }
                }
            }
            case COUNTRY -> newType = (disordered) ? LocationType.CITY : LocationType.CONTINENT;
            case AREA -> {
                if (disordered) { newType = LocationType.STAR; }
                else {
                    switch (Randomizer.randomIntXtoY(1,10)) {
                        case 1 -> newType = LocationType.FEATURE; // 10%
                        case 2,3,4 -> newType = LocationType.PLANET; // 30%   
                        case 5 -> newType = LocationType.MOON; // 10%
                        case 6,7,8,9 -> newType = LocationType.CONTINENT; // 40%
                        default -> newType = LocationType.COUNTRY; // 10%
                    }
                }
            }
            case CITY -> {
                if (disordered) { newType = LocationType.FEATURE; }
                else if (Randomizer.randomIntXtoY(1, 10) <= 9) { newType = LocationType.COUNTRY; } // 90% country
                else { newType = LocationType.AREA; } // 10% area
            }
            case PLACE -> {
                if (disordered) { newType = LocationType.MOON; }
                else if (Randomizer.randomIntXtoY(1, 10) <= 9) { newType = LocationType.CITY; } // 90% city
                else { newType = LocationType.AREA; } // 10% area
            }
        }

        return generateUniqueCompressedNameAndType(null, false, newType, true, false);
    }

    private Vector<Integer> generateRandomPositionOnParent(LocationType type) { // josh for on-paper mode use average distance to parent
        Vector<Integer> newPosition = new Vector<Integer>();
        switch (type) {
            case STAR,PLANET,MOON,FEATURE -> { // <distance in AG, orbital angle in degrees> (if a feature is in space, just divide the angle by 3 and treat as 2d coordinates)
                newPosition.add(Randomizer.randomIntXtoY(1, 100)); // distance (in Kilo-AG, AG, or 1/10 AG, depending on parent type)
                newPosition.add(Randomizer.randomIntXtoY(0, 359)); // angle around star (changes with time)
            }
            default -> { // <x,y> (dimension coords are only for pocket dimensions)
                newPosition.add(Randomizer.randomIntXtoY(0, 100)); // x
                newPosition.add(Randomizer.randomIntXtoY(0, 100));  // y
            }
        }
        return newPosition;
    }

    private Vector<CompressedLocation> generateRandomCompressedChildren(LocationType type) {
        int numberOfChildren;
        LocationType childType;
        Vector<CompressedLocation> newChildren = new Vector<CompressedLocation>();
        
        switch (type) {
            case DIMENSION -> {
                switch (Randomizer.randomIntXtoY(1, 10)) {
                    case 1 -> numberOfChildren = Randomizer.randomIntXtoY(2, 4); // 10% -> 2 to 4 child universes
                    default -> numberOfChildren = 1; // 90% -> 1 child universes
                }
                for (int i = 0; i < numberOfChildren; i++) { // 1 to 4 child universes
                    newChildren.add(generateCompressedLocationByType(LocationType.UNIVERSE)); 
                }
            } 
            case UNIVERSE -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12)+Randomizer.randomIntXtoY(1, 12); i++) { // 2 to 24 children
                    newChildren.add(generateCompressedLocationByType((Randomizer.randomIntXtoY(1, 10) <= 8) ? 
                        LocationType.SPACE : 
                        LocationType.GALAXY)); 
                }
            }
            case GALAXY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12)+Randomizer.randomIntXtoY(1, 12); i++) { // 2 to 24 children
                    newChildren.add(generateCompressedLocationByType(LocationType.STAR)); 
                }
            }
            case SPACE -> {
                switch (Randomizer.randomIntXtoY(1, 10)) {
                    case 1 -> numberOfChildren = Randomizer.randomIntXtoY(1, 3); // 10% -> 1 to 3 children
                    default -> numberOfChildren = 0; // 90% no children
                }
                for (int i = 0; i < numberOfChildren; i++) {
                    newChildren.add(generateCompressedLocationByType( LocationType.FEATURE)); // 100% feature
                }
            }
            case STAR -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(0, 12); i++) { // 0 to 12 children
                    childType = switch (Randomizer.randomIntXtoY(0, 20)) {
                        case 1 -> LocationType.CONTINENT; // 5%
                        case 2,3 -> LocationType.FEATURE; // 10%
                        default -> LocationType.PLANET; // 85%
                    };
                    newChildren.add(generateCompressedLocationByType(childType)); 
                }
            }
            case PLANET -> {
                newChildren.add(generateCompressedLocationByType(LocationType.CONTINENT)); // all planets have 1 continent and 1 area (like an ocean)
                newChildren.add(generateCompressedLocationByType(LocationType.AREA));
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8)+Randomizer.randomIntXtoY(1, 8); i++) { // 2 to 16 children
                    childType = switch (Randomizer.randomIntXtoY(0, 10)) {
                        case 1 -> LocationType.FEATURE; // 10%
                        case 2,3 -> LocationType.MOON; // 20%
                        case 4,5,6 -> LocationType.AREA; // 30%
                        default -> LocationType.CONTINENT; // 40%
                    };
                    newChildren.add(generateCompressedLocationByType(childType));
                }

            }
            case MOON -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 6); i++) { // 1 to 6 children
                    if (i ==  0) { childType = LocationType.CONTINENT; } // ensure at least 1 continent
                    else {
                        childType = switch (Randomizer.randomIntXtoY(0, 10)) {
                            case 1 -> LocationType.FEATURE; // 10%
                            case 2,3,4 -> LocationType.AREA; // 30%
                            default -> LocationType.CONTINENT; // 60%
                        };
                    }
                    newChildren.add(generateCompressedLocationByType(childType));
                }
            }
            case FEATURE -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedLocationByType(LocationType.AREA)); 
                }
            }
            case CONTINENT -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 4)+Randomizer.randomIntXtoY(1, 4); i++) { // 2 to 8 children
                    newChildren.add(generateCompressedLocationByType((Randomizer.randomIntXtoY(1, 10) <= 7) ? 
                        LocationType.COUNTRY : 
                        LocationType.AREA)); 
                }
            }
            case COUNTRY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedLocationByType((Randomizer.randomIntXtoY(1, 10) <= 9) ? 
                        LocationType.CITY : 
                        LocationType.AREA)); 
                }
            }
            case AREA -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedLocationByType((Randomizer.randomIntXtoY(1, 4) <= 1) ? 
                        LocationType.CITY : 
                        LocationType.PLACE)); 
                }
            }
            case CITY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12); i++) { // 1 to 12 children
                    newChildren.add(generateCompressedLocationByType(LocationType.PLACE)); 
                }
            }
            case PLACE -> { return null; } // no children
        }

        if (newChildren.size() == 0) { return null; }

        return newChildren;
    }

    private CompressedLocation generateCompressedLocationByType(LocationType type) {
        if (type == null) { return null; }
        return generateUniqueCompressedNameAndType(null, false, type, true, false);
    }

    private Vector<CompressedLocation> joinChildrenAndRemoveDuplicates(Vector<CompressedLocation> children, Vector<CompressedLocation> andChildren) {
        if (children == null) { children = new Vector<CompressedLocation>(); }
        if (andChildren == null) { andChildren = new Vector<CompressedLocation>(); }
        Vector<CompressedLocation> uniqueChildren = new Vector<>();
        for (CompressedLocation cLoc : children) {
            // System.out.println("  >  child location: " + cLoc.name + " (" + cLoc.type + ")");
            if (!containsChild(uniqueChildren, cLoc)) { uniqueChildren.add(cLoc); }
        }
        for (CompressedLocation cLoc : andChildren) {
            // System.out.println("  >  additional child location: " + cLoc.name + " (" + cLoc.type + ")");
            if (!containsChild(uniqueChildren, cLoc)) { uniqueChildren.add(cLoc); }
        }
        // System.out.println("-->  Joined " + children.size() + " existing children and " + andChildren.size() + " additional children to get " + uniqueChildren.size() + " unique children:");
        // for (CompressedLocation uLoc : uniqueChildren) {
            // System.out.println("  >  Unique child location: " + uLoc.name + " (" + uLoc.type + ")");
        // }
        return uniqueChildren;
    }

    private boolean containsChild(Vector<CompressedLocation> vector, CompressedLocation child) {
        for (CompressedLocation c : vector) {
            if (c.name.equals(child.name) && c.type == child.type) {
                return true;
            }
        }
        return false;
    }

    private LocationNature generateRandomLocationNature(LocationType type, LocationModifier modifier, LocationSize size, LocationType parentType, LocationNature parentNature, Vector<CompressedLocation> children) {
        if (type == null) { return null; }
        LocationNature ln = null;
        switch (type) {
            case DIMENSION,UNIVERSE,GALAXY,SPACE,FEATURE -> { return null; }
            case STAR -> {
                ln = new LocationNature();
                ln.setupNature(type, modifier, size, containsContinent(children));
            }
            case PLANET,MOON -> {
                ln = new LocationNature();
                ln.setupNature(type, modifier, size, true); // planets and moons always containt a continent on generation
            }
            case AREA -> {
                if (LocationType.FEATURE == parentType || parentNature == null) {
                    ln = new LocationNature();
                    ln.setupNature(type, modifier, size, true); 
                } else {
                    ln = inheritNatureFromParent(parentNature, modifier);
                }
            }
            default -> { 
                if (parentNature != null) {
                    ln = inheritNatureFromParent(parentNature, modifier); 
                } else {
                    ln = new LocationNature();
                    ln.setupNature(type, modifier, size, true); 
                }
            } 
        }
        return ln;
    }

    private boolean containsContinent(Vector<CompressedLocation> childLocs) { // only for STAR types, to determine if they have nature
        if (childLocs == null) { return false; }
        for (CompressedLocation child : childLocs) {
            if (child.type == LocationType.CONTINENT) { return true; }
        }
        return false;
    }

    private LocationNature inheritNatureFromParent(LocationNature parentNature, LocationModifier currentModifier) {
        if (LocationModifier.DESERTED == currentModifier) { // modidy by this location's modifier
            // josh potential llm
            parentNature.breathable = false;
            parentNature.environments = new Vector<String>(Arrays.asList("barren"));
        } else if (LocationModifier.VOLATILE == currentModifier) {
            // josh potential llm
            parentNature.breathable = true;
            parentNature.environments.add("overgrown");
            parentNature.environments.add("dangerous");
        } else if (LocationModifier.EXTREME == currentModifier) {
            for (int i = 0; i < parentNature.environments.size(); i++) {
                parentNature.environments.set(i, "Extreme(ly) " + parentNature.environments.get(i));
            }
        }
        return parentNature; // return now-modified parent nature
    }

    private LocationSociety generateRandomLocationSociety(CompressedLocation currentLoc, LocationModifier modifier, Vector<String> anomalies, LocationNature nature, LocationSociety parentSociety, Vector<CompressedLocation> tooManySiblings) { 
                if (nature == null || (LocationModifier.DESERTED == modifier)) { return null;}

                Vector<CompressedLocation> siblings = null; 
                if (tooManySiblings != null) {
                    siblings = new Vector<>(); 
                    for (CompressedLocation sibling : tooManySiblings) { 
                        if (!sibling.equals(currentLoc)) {
                            siblings.add(sibling);
                        }
                    }
                } 
                
                int chanceOfSociety = 0;
                switch (currentLoc.type) {
                    case DIMENSION,UNIVERSE,SPACE -> {}
                    case GALAXY -> chanceOfSociety = 1; // 10% chance of galactic society
                    case STAR -> chanceOfSociety = 3; // 40% chance of solar society
                    case PLANET,MOON,FEATURE -> chanceOfSociety = 6; // 60% chance of planetary society
                    case CONTINENT -> chanceOfSociety = 9; // 80% chance of continental society
                    case COUNTRY,AREA -> chanceOfSociety = 10; 
                    case CITY,PLACE -> chanceOfSociety = (parentSociety != null) ? -1 : 7; // inheritFromParent or 70%
                }

                LocationSociety newSociety = null;
                if (chanceOfSociety == -1) {
                    newSociety = inheritSocietyFromParent(parentSociety, modifier);
                } else if ((Randomizer.randomIntXtoY(1, 10) <= chanceOfSociety)) {
                    newSociety = new LocationSociety();
                    newSociety.setupLocationSociety(LocationModifier.EXTREME == modifier, anomalies, nature.environments, siblings);
                }
                return newSociety;
    }

    private LocationSociety inheritSocietyFromParent(LocationSociety parentSociety, LocationModifier modifier) {
        if (LocationModifier.DESERTED == modifier || parentSociety == null) {
            return null;
        } else {
            if (LocationModifier.EXTREME == modifier) {
                // josh potential llm
                parentSociety.governemnt = "Extreme " + parentSociety.governemnt;
                parentSociety.religion = "Extreme " + parentSociety.religion;
                parentSociety.culture = "Extreme " + parentSociety.culture;
                parentSociety.technology = "Extreme " + parentSociety.technology;
            }
            return parentSociety;
        }
    }

    private String generateRandomAppearance(LocationType type, LocationSize size, LocationNature nature, LocationType parentType) { // shape & color
        Vector<String> materials = (nature == null) ? null : nature.materials;
        String returnStr = null;

        switch (type) {
            case GALAXY -> { returnStr = "A " + size.toString().toLowerCase() + " collection of swirling stars" + ((materials == null) ? "." : ", made of " + String.join(", ", materials) + "."); }
            case FEATURE -> { returnStr = "A " + size.toString().toLowerCase() + " feature, orbiting a " + parentType.toString().toLowerCase() + ((materials == null) ? ", made of asteroids." : ", made of " + String.join(", ", materials) + "."); }
            case STAR -> { returnStr = "A " + size.toString().toLowerCase() + ", bright, glowing mass of plasma" + ((materials == null) ? "." : ", made of " + String.join(", ", materials) + "."); }
            case PLANET -> { returnStr = "A "+ size.toString().toLowerCase() +", spherical body with a varied surface" + ((materials == null) ? "." : ", made of " + String.join(", ", materials) + "."); }
            case MOON -> { returnStr = "A "+ size.toString().toLowerCase() +", spherical body orbiting a planet" + ((materials == null) ? "." : ", made of " + String.join(", ", materials) + "."); }
            default -> { returnStr = "A "+ size.toString().toLowerCase() +" location" + ((materials == null) ? "." : ", made of " + String.join(", ", materials) + "."); } // should never happen
        }
        
        return returnStr; // josh todo llm?
    }
    
    private String generateRandomLocationSummary(LocationType type, Vector<String> anomalies, LocationSociety society) {
        String returnStr = "A " + type.toString().toLowerCase();
        if (anomalies == null || anomalies.isEmpty()) {
            returnStr += ", with no anomalies";
        } else {
            returnStr += ", with anomales: " + String.join(",", anomalies);
        }
        if (society == null) {
            returnStr += ", and no society.";
        } else {
            returnStr += ", and " + society.culture + ".";
        }
        return returnStr; // josh todo llm?
    }

    // GENERATING & DISCOVERING COMPRESSED LOCATIONS //

    public CompressedLocation generateNewCompressedParent(LocationType type, boolean disordered) {
        return generateRandomCompressedParent(type, disordered, true);
    }

    public CompressedLocation generateNewCompressedChild(LocationType type) {
        LocationType newChildType = getChildType(type);
        return generateCompressedLocationByType(newChildType);
    }

    private LocationType getChildType(LocationType type) {
        switch (type) {
            case DIMENSION -> { return LocationType.UNIVERSE; }
            case UNIVERSE -> { return (Randomizer.randomIntXtoY(1, 5) <= 4) ? LocationType.SPACE : LocationType.GALAXY; } // 80% space, 20% galaxy
            case GALAXY -> { return LocationType.STAR; }
            case SPACE -> { return LocationType.FEATURE; } // 100% feature
            case STAR -> { return switch (Randomizer.randomIntXtoY(0, 20)) {
                case 1 -> LocationType.CONTINENT; // 5%
                case 2,3 -> LocationType.FEATURE; // 10%
                default -> LocationType.PLANET; // 85%
            }; }
            case PLANET -> { return switch (Randomizer.randomIntXtoY(0, 10)) {
                case 1 -> LocationType.FEATURE; // 10%
                case 2,3 -> LocationType.MOON; // 20%
                case 4,5,6 -> LocationType.AREA; // 30%
                default -> LocationType.CONTINENT; // 40%
            }; }
            case MOON -> { return switch (Randomizer.randomIntXtoY(0, 10)) {
                case 1 -> LocationType.FEATURE; // 10%
                case 2,3,4 -> LocationType.AREA; // 30%
                default -> LocationType.CONTINENT; // 60%
            }; }
            case FEATURE -> { return LocationType.AREA; }
            case CONTINENT -> { return (Randomizer.randomIntXtoY(1, 10) <= 7) ? LocationType.COUNTRY : LocationType.AREA; } // 70% country, 30% area
            case COUNTRY -> { return (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.CITY : LocationType.AREA; } // 90% city, 10% area
            case AREA -> { return (Randomizer.randomIntXtoY(1, 4) <= 1) ? LocationType.CITY : LocationType.PLACE; } // 25% city, 75% place
            case CITY -> { return LocationType.PLACE; }
            default -> { return LocationType.DIMENSION; } // PLACEs can have DIMENSIONs as children (extremely rare)
        }
    }

    public boolean chartUnchartedLocation(String unchartedName, LocationType unchartedType, String currentName, LocationType currentType) {
        if (databaseConnection.isLocationInCollection(unchartedName, unchartedType)) {
            return true; // already charted
        } else {
            // generate new location
            Location newChartedLocation = new Location();
            newChartedLocation.name = unchartedName;
            newChartedLocation.type = unchartedType;
            if (generatePartiallyRandomLocation(newChartedLocation, new String[] {"name", "type"}, true) != null) {
                // now set their compressed locations to CHARTED
                Location currentLocationToUpdate = databaseConnection.getLocation(currentName, currentType);
                if (currentLocationToUpdate == null) return false;
                if (currentLocationToUpdate.parent != null) {
                    // boolean parentFound = false;
                    if (unchartedName.equals(currentLocationToUpdate.parent.name) && unchartedType == currentLocationToUpdate.parent.type) {
                        currentLocationToUpdate.parent.charted = true;
                        databaseConnection.updateLocationsCompressedParent(compressLocation(currentLocationToUpdate), compressLocation(newChartedLocation));
                        return true;
                    }
                }
                if (currentLocationToUpdate.children != null && currentLocationToUpdate.children.size() > 0) {
                    Vector<CompressedLocation> newChildren = currentLocationToUpdate.children;
                    Boolean childFound = false;
                    for (CompressedLocation child : newChildren) {
                        if (unchartedName.equals(child.name) && unchartedType == child.type) {
                            child.charted = true;
                            childFound = true;
                            break;
                        }
                    }
                    if (childFound) { 
                        databaseConnection.updateLocationsCompressedChildren(compressLocation(currentLocationToUpdate), newChildren);
                        return true;
                    }
                }
                return true; // true response causes refresh on frontend
            } else {
                return false;
            }
        }
    }
    
    // LINKING LOCATIONS //

    public String linkLocations(Vector<CompressedLocation> parentAndChildren) {
        CompressedLocation parentLoc = parentAndChildren.remove(0); // pop parent
        System.out.println("  --> Linking "+parentLoc.name+" to "+parentAndChildren.size()+" child(ren) (uncharted locations are ignored)");

        for (CompressedLocation chLoc : parentAndChildren) {
            if (!chLoc.charted) {
                System.out.println("    > Skipping uncharted child location: " + chLoc.name + " (" + chLoc.type + ")");
            } else {
                System.out.println("    > Linking child location: " + chLoc.name + " (" + chLoc.type + ")");
            }
        }

        Vector<CompressedLocation> parentLocationsChildren = databaseConnection.getLocationsChildren(parentLoc);
        if (parentLocationsChildren != null) {
            databaseConnection.updateLocationsCompressedChildren(parentLoc, joinChildrenAndRemoveDuplicates(parentLocationsChildren, parentAndChildren));
        }
        for (CompressedLocation chLoc : parentAndChildren) {
            databaseConnection.updateLocationsCompressedParent(chLoc, parentLoc); // will not update if child doesn't exist
        }

        String returnStr = "Linking complete";
        System.out.println("    > " + returnStr);
        return returnStr;
    }
    
    // DATABASE LOCATION FUNCTIONS //

    public Location saveLocationToDatabase(Location location) {
        if (location == null) {
            System.out.println("Error: Cannot save null location");
            return null;
        }
        if (location.name == null || location.name.length() == 0 || location.type == null) {
            System.out.println("Error: Cannot save location with missing or empty name or type");
            return null;
        }

        if (location.parent != null) {
            location.parent.charted = databaseConnection.isLocationInCollection(location.parent.name, location.parent.type);
            if (location.parent.charted) {
                linkLocations(new Vector<CompressedLocation>(Arrays.asList(location.parent, compressLocation(location)))); // link to parent if parent already charted
            }
        }
        
        if (location.children != null) {
            for (CompressedLocation chLoc : location.children) {
                if (!chLoc.charted) { 
                    chLoc.charted = databaseConnection.isLocationInCollection(chLoc.name, chLoc.type); 
                    if (chLoc.charted) {
                        CompressedLocation loc = compressLocation(location);
                        databaseConnection.unlinkChildFromAllOtherParents(chLoc, loc);
                        linkLocations(new Vector<CompressedLocation>(Arrays.asList(loc, chLoc))); // link to child if child already charted
                    }
                }
            }
        }
        return databaseConnection.createNewLocationSave(location);
    }  

    public Location editLocationInDatabase(Location location) {
        if (location == null) {
            System.out.println("Error: Cannot edit null location");
            return null;
        }
        if (location.name == null || location.name.length() == 0 || location.type == null) {
            System.out.println("Error: Cannot edit location with missing or empty name or type");
            return null;
        }

        if (location._id != null && location._id.length() > 0) {
            if (location.parent != null) {
                location.parent.charted = databaseConnection.isLocationInCollection(location.parent.name, location.parent.type);
                if (location.parent.charted) {
                    linkLocations(new Vector<CompressedLocation>(Arrays.asList(location.parent, compressLocation(location)))); // link to parent if parent already charted
                }
            }
            
            if (location.children != null) {
                for (CompressedLocation chLoc : location.children) {
                    if (!chLoc.charted) { 
                        chLoc.charted = databaseConnection.isLocationInCollection(chLoc.name, chLoc.type); 
                        if (chLoc.charted) {
                            CompressedLocation loc = compressLocation(location);
                            databaseConnection.unlinkChildFromAllOtherParents(chLoc, loc);
                            linkLocations(new Vector<CompressedLocation>(Arrays.asList(loc, chLoc))); // link to child if child already charted
                        }
                    }
                }
            }
            return databaseConnection.updateLocationSave(location);
        } else {
            System.out.println("Error: Cannot edit location that isn't in the database (missing or invalid _id)");
            return null; // can't edit a location that isn't in the database
        }
    }

    public boolean deleteLocationFromDatabase(Location location) {
        if (location == null) {
            System.out.println("Error: Cannot edit null location");
            return false;
        }
        if (location.name == null || location.name.length() == 0 || location.type == null) {
            System.out.println("Error: Cannot edit location with missing or empty name or type");
            return false;
        }
        if (location._id == null || location._id.length() == 0) {
            System.out.println("Error: Cannot delete location with missing or empty id");
            return false;
        }

        if (location.parent != null) {
            if (location.parent.charted) {
                databaseConnection.unlinkParentFromDeletedChild(location.parent, compressLocation(location));
            }
        }
        if (location.children != null) {
            for (CompressedLocation chLoc : location.children) {
                if (chLoc.charted) { 
                    databaseConnection.unlinkChildFromDeletedParent(chLoc);
                }
            }
        }
        return databaseConnection.deleteLocationSave(location._id, location.name);
    }

    public Location getLocationFromDatabase(CompressedLocation loc) {
        if (loc == null) return null;
        // sort children before returning
        Location location = databaseConnection.getLocation(loc.name, loc.type);
        if (location != null && location.children != null) {
            location.children = sortLocationsChildren(location.children);
        }
        return location;
    }

    private Vector<CompressedLocation> sortLocationsChildren(Vector<CompressedLocation> children) {
        if (children == null) { return null; }
        Vector<CompressedLocation> sortedChildren = new Vector<>();

        // 3 by name
        children.sort(Comparator.comparing(c -> c.name));
        
        // 2 by type
        Vector<CompressedLocation> placeTypes = new Vector<>();
        Vector<CompressedLocation> cityTypes = new Vector<>();
        Vector<CompressedLocation> areaTypes = new Vector<>();
        Vector<CompressedLocation> countryTypes = new Vector<>();
        Vector<CompressedLocation> continentTypes = new Vector<>();
        Vector<CompressedLocation> featureTypes = new Vector<>();
        Vector<CompressedLocation> moonTypes = new Vector<>();
        Vector<CompressedLocation> planetTypes = new Vector<>();
        Vector<CompressedLocation> starTypes = new Vector<>();
        Vector<CompressedLocation> spaceTypes = new Vector<>();
        Vector<CompressedLocation> galaxyTypes = new Vector<>();
        Vector<CompressedLocation> universeTypes = new Vector<>();
        Vector<CompressedLocation> dimensionTypes = new Vector<>();

        for (CompressedLocation child : children) {
            switch (child.type) {
                case PLACE -> placeTypes.add(child);
                case CITY -> cityTypes.add(child);
                case AREA -> areaTypes.add(child);
                case COUNTRY -> countryTypes.add(child);
                case CONTINENT -> continentTypes.add(child);
                case FEATURE -> featureTypes.add(child);
                case MOON -> moonTypes.add(child);
                case PLANET -> planetTypes.add(child);
                case STAR -> starTypes.add(child);
                case SPACE -> spaceTypes.add(child);
                case GALAXY -> galaxyTypes.add(child);
                case UNIVERSE -> universeTypes.add(child);
                case DIMENSION -> dimensionTypes.add(child);
            }
            // children.remove(child);
        }
        children = new Vector<>(); // clear children to be re-added in order

        children.addAll(dimensionTypes);
        children.addAll(universeTypes);
        children.addAll(galaxyTypes);
        children.addAll(spaceTypes);
        children.addAll(starTypes);
        children.addAll(planetTypes);
        children.addAll(moonTypes);
        children.addAll(featureTypes);
        children.addAll(continentTypes);
        children.addAll(countryTypes);
        children.addAll(areaTypes);
        children.addAll(cityTypes);
        children.addAll(placeTypes);

        // 1 by charted
        for (int i = 0; i < children.size(); i++) {
            if (children.get(i).charted) { // charted children go to the beginning of the list
                CompressedLocation chartedLoc = children.remove(i);
                sortedChildren.add(chartedLoc);
                i--; // adjust index after removal
            }
        }
        sortedChildren.addAll(children); // add uncharted

        return sortedChildren;
    }
    
    private Location uncompressParentLocation(CompressedLocation compressedLocation, boolean saveToDB, CompressedLocation childLoc) {
        if (compressedLocation == null) { return null; }
        if (compressedLocation.charted) {
            Location pLocation = getLocationFromDatabase(compressedLocation);
            if (childLoc != null) { // link child if given
                if (pLocation.children == null) { pLocation.children = new Vector<>(); }
                pLocation.children.add(childLoc);
                databaseConnection.updateLocationsCompressedChildren(compressLocation(pLocation), pLocation.children); // update DB with new child link
            }
            return pLocation;
        } else {
            if (!saveToDB) { return null; } // not charted & won't create a new save
            Location l = new Location();
            l.name = compressedLocation.name;
            l.type = compressedLocation.type;
            l.children = (childLoc == null) ? null : new Vector<>(Arrays.asList(childLoc)); // link child if given
            return generatePartiallyRandomLocation(l, new String[] {"name", "type"}, true); // will find & link exisiting parent or children automatically
        }
    }

    private CompressedLocation compressLocation(Location location) {
        if (location == null) { return null; }
        CompressedLocation loc = new CompressedLocation();
        loc.name = location.name;
        loc.type = location.type;
        loc.charted = true; // charted if an uncompressed location exists
        return loc;
    }

    // GET RANDOM LOCATION FUNCTIONS //

    // public Location getRandomChartedLocation() {
    //     return databaseConnection.getRandomChartedLocation();
    // }

    // public Location getRandomChartedLocationFromType(LocationType type) {
    //     return databaseConnection.getRandomChartedLocationFromType(type);
    // }

    // public Location getRandomSiblingLocation(boolean uncharted, CompressedLocation loc, CompressedLocation parentLoc) {
    //     if (parentLoc == null) { return null; } // no parent means no siblings
    //     Location parentLocation = uncompressLocation(parentLoc, true);
        
    //     Location randomSibling = null;
    //     if (uncharted) { // create new child 
    //         randomSibling = new Location();
    //         randomSibling.parent = parentLoc;
    //         randomSibling.type = generateRandomChildType(parentLoc.type);
    //         randomSibling.modifier = parentLocation.modifier;
    //         randomSibling.society = parentLocation.society;
    //         String[] locked = {"type","parent","modifier","society"};
    //         randomSibling = generatePartiallyRandomLocation(randomSibling, locked, true);
    //         databaseConnection.updateLocationsCompressedChildren(parentLoc, new Vector<CompressedLocation>(Arrays.asList(compressLocation(randomSibling)))); 
    //     } else { // use existing sibling
    //         if (parentLocation.children == null || parentLocation.children.size() <= 1) { return null; } // no siblings
    //         Vector<CompressedLocation> parentLocsChildren = new Vector<>();
    //         for (CompressedLocation chLoc : parentLocation.children) {
    //             if (!chLoc.equals(loc)) { parentLocsChildren.add(chLoc); } // siblings only
    //         }
    //         randomSibling = uncompressLocation(parentLocsChildren.get(Randomizer.randomIntXtoY(0, parentLocsChildren.size()-1)), true);
    //     }
    //     return randomSibling;
    // }

    // private LocationType generateRandomChildType(LocationType type) {
    //     switch (type) {
    //         case DIMENSION -> { return LocationType.UNIVERSE; }
    //         case UNIVERSE -> { return (Randomizer.randomIntXtoY(1, 10) <= 8) ? LocationType.SPACE : LocationType.GALAXY; }
    //         case GALAXY -> { return LocationType.STAR; }
    //         case SPACE -> { return (Randomizer.randomIntXtoY(1, 5) <= 4) ? LocationType.STAR : LocationType.FEATURE; }
    //         case STAR -> { 
    //             switch (Randomizer.randomIntXtoY(0, 20)) {
    //                 case 1 -> { return LocationType.CONTINENT; } // 5%
    //                 case 2,3 -> { return LocationType.FEATURE; } // 10%
    //                 default -> { return LocationType.PLANET; } // 85%
    //             }
    //         }
    //         case PLANET -> { 
    //             switch (Randomizer.randomIntXtoY(0, 10)) {
    //                 case 1 -> { return LocationType.FEATURE; } // 10%
    //                 case 2,3 -> { return LocationType.MOON; } // 20%
    //                 case 4,5,6 -> { return LocationType.AREA; } // 30%
    //                 default -> { return LocationType.CONTINENT; } // 40%
    //             }
    //         }
    //         case MOON -> { 
    //             switch (Randomizer.randomIntXtoY(0, 10)) {
    //                 case 1 -> { return LocationType.FEATURE; } // 10%
    //                 case 2,3,4 -> { return LocationType.AREA; } // 30%
    //                 default -> { return LocationType.CONTINENT; } // 60%
    //             }
    //         }
    //         case FEATURE -> { return LocationType.AREA; }
    //         case CONTINENT -> { return (Randomizer.randomIntXtoY(1, 10) <= 7) ? LocationType.COUNTRY : LocationType.AREA; }
    //         case COUNTRY -> { return (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.CITY : LocationType.AREA; }
    //         case AREA -> { return (Randomizer.randomIntXtoY(1, 4) <= 1) ? LocationType.CITY : LocationType.PLACE; }
    //         case CITY -> { return LocationType.PLACE; }
    //         case PLACE -> { return (Randomizer.randomIntXtoY(1, 100) <= 1) ? LocationType.DIMENSION : null; } // 99% no children
    //         default -> { return null; } // should never happen
    //     }
    // }

    // josh when use uncompressChild? -> when wanting to specifically pass modifier & society down while uncomporessing

    // private Location uncompressChild(CompressedLocation compressedLocation, CompressedLocation parentLoc, LocationModifier modifier, LocationSociety society) {
    //     Location l = getLocationFromDatabase(compressedLocation.makeNameTypeKey()); // if got from database, assume already linked
    //     if (l != null) { return l; }
    //     l = new Location();
    //     l.name = compressedLocation.name;
    //     l.type = compressedLocation.type;
    //     l.parent = parentLoc;
    //     l.modifier = modifier;
    //     l.society = society;
    //     l = generatePartiallyRandomLocation(l, new String[] {"name", "type", "parent", "modifier", "society"}); 
    //     return saveLocationToDatabase(l); 
    // }

//     public Location chartNewChildrenForParent(String parentKey) { // josh make only do moons / space stuff?
//         Location tempParentLocation = databaseConnection.getLocation(parentKey);
//         if (tempParentLocation.chartNewChildren() != null) {
//             databaseConnection.updateLocationsCompressedChildren(parentKey, tempParentLocation.children);
//         }
//         return tempParentLocation;
//     }

//     // josh todo new fucntion to get potential children from the DB. (check nephews)
//     // call DB to get all locations with this location as their parent. 




//     // CHARACTER //

    public NPC generateRandomNpc() {
        NPC npc = new NPC();

        npc.setupNPC(null, null, null, null, null, null, 
            null, null, null, null, null, 
            null, null, null, null, 
            null, null, null, null, 
            null, null, null, null, 
            null, null, null);

        System.out.println(saveNpcToDatabase(npc));

        return npc;
    }

    public String saveNpcToDatabase(NPC npc) {
        return databaseConnection.saveNpc(npc);
    }

    public String savePcToDatabase(PlayableCharacter pc) {
        return databaseConnection.savePc(pc);
    }









    // CLEAR DATABASES //

    public void clearDatabase() { // josh !!!!!!!! BE CAREFUL WITH THIS, IT WILL DELETE ALL DATA IN THE DATABASES, FOR TESTING ONLY
        databaseConnection.clearAllCollections();
    }
}
