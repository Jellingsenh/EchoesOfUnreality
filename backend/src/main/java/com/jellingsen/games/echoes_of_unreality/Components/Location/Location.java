package com.jellingsen.games.echoes_of_unreality.Components.Location;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationNature;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationSociety;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "name", "type", "summary", "size", "modifier", "nature", "society", "anomalies", "parent", "positionOnParent", "children" })
public class Location extends CompressedLocation {
    // CompressedLocation has type & name

    // VARIATIONS
    public LocationModifier modifier;
    public Vector<String> anomalies; // any strange anomalies of the area

    // STRUCTURE
    public CompressedLocation parent;
    public LocationSize size; // relative to 'standard' size for the type.
    public Vector<Integer> positionOnParent;
    public Vector<CompressedLocation> children;

    // NATURE
    public LocationNature nature;

    // SOCIETY
    public LocationSociety society;

    // SUMMARY
    public String summary;

    public Location() {}

    public void setupLocation(String name, LocationType type, String summary, LocationSize size, 
        LocationModifier modifier, LocationNature nature, LocationSociety society,Vector<String> anomalies, 
        CompressedLocation parent, Vector<Integer> positionOnParent, Vector<CompressedLocation> children) {

        this.type = (type != null) ? type : generateType();
        this.name = (name != null) ? name : generateNameFromType();
        this.modifier = (modifier != null) ? modifier : generateModifier();
        this.size = (size != null) ? size : generateSize();
        this.anomalies = (anomalies != null) ? anomalies : generateNewAnomalies();
        this.parent = (parent != null) ? parent : generateCompressedParent();
        this.positionOnParent = (positionOnParent != null) ? positionOnParent : generatePositionOnParent();
        this.children = (children != null) ? children : generateCompressedChildren();
        this.nature = (nature != null) ? nature : generateNature();
        this.society = (society != null) ? society : generateSociety();
        this.summary = (summary != null) ? summary : generateSummary();
    }

    private LocationModifier generateModifier() {
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

    private LocationSize generateSize() {
       if (this.modifier == LocationModifier.CONTRARY) {
            switch (Randomizer.randomIntXtoY(1, 5)) {
                case 1,2 -> { return LocationSize.SMALL; } // 40%
                case 3,4 -> { return LocationSize.HUGE; } // 40%
                default -> { return LocationSize.MASSIVE; } // 20%  
            }
        }
        return LocationSize.STANDARD;
    }

    private Vector<String> generateNewAnomalies() {
        Vector<String> newAnomalies = new Vector<String>();
        int anomaliesToAdd = 0;

        if (this.modifier == LocationModifier.UNREAL) { anomaliesToAdd += 2; }
        
        switch (Randomizer.randomIntXtoY(1, 10)) {
            case 1,2 -> anomaliesToAdd++; // 20%
            case 3 -> anomaliesToAdd += 2; // 10%
            case 4 -> anomaliesToAdd += 3; //10%
            case 5 -> anomaliesToAdd += 4; // 10%
            default -> {} // 50%
        }
        if (anomaliesToAdd == 0) { return null; }

        for (int i = 0; i < anomaliesToAdd; i++) {
            newAnomalies.add(generateAnomaly(newAnomalies)); 
        }

        return newAnomalies;
    }

    private String generateAnomaly(Vector<String> newAnomalies) { 
        String resultStr = switch (this.type) {
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

        if (newAnomalies.contains(resultStr)) { // ensure no duplicates
            String anomNumber = Integer.toString(Randomizer.randomIntXtoY(1, 1000) * Randomizer.randomIntXtoY(1, 1000)).substring(0, 2);
            return "placeholder anomaly " + anomNumber; // generateAnomaly(newAnomalies); uncomment once large choice set is made (no loops)
        }
        
        return resultStr;
    }

    private CompressedLocation generateCompressedParent() {
        CompressedLocation newParent = new CompressedLocation();
        
        switch (this.type) {
            case DIMENSION -> {
                if (Randomizer.randomIntXtoY(1,100) <= 1) { newParent.type = LocationType.PLACE; } // 1% pocket dimension with a place as a parent
                else { newParent.type = null; } // 99% dimensions have no parent
            }
            case UNIVERSE -> newParent.type = LocationType.DIMENSION;
            case GALAXY -> newParent.type = LocationType.UNIVERSE;
            case SPACE -> newParent.type = LocationType.UNIVERSE;
            case STAR -> {
                if (Randomizer.randomIntXtoY(1,20) <= 1) { newParent.type = LocationType.SPACE; } // 5% in empty space
                else { newParent.type = LocationType.GALAXY; } // 95% in a galaxy
            }
            case PLANET -> newParent.type = LocationType.STAR;
            case MOON -> newParent.type = LocationType.PLANET;
            case FEATURE -> {
                switch (Randomizer.randomIntXtoY(1,10)) {
                    case 1 -> newParent.type = LocationType.SPACE; // 10%
                    case 2 -> newParent.type = LocationType.STAR; // 10%
                    case 3,4,5,6,7 -> newParent.type = LocationType.PLANET; // 50%
                    case 8,9,10 -> newParent.type = LocationType.MOON; // 30%
                }
            }
            case CONTINENT -> {
                switch (Randomizer.randomIntXtoY(1,20)) {
                    case 1 -> newParent.type = LocationType.STAR; // 5%
                    case 2,3,4,5,6 -> newParent.type = LocationType.MOON; // 25%
                    default-> newParent.type = LocationType.PLANET; // 70%
                }
            }
            case COUNTRY -> newParent.type = LocationType.CONTINENT;
            case AREA -> {
                switch (Randomizer.randomIntXtoY(1,10)) {
                    case 1 -> newParent.type = LocationType.FEATURE; // 10%
                    case 2,3,4 -> newParent.type = LocationType.PLANET; // 30%   
                    case 5 -> newParent.type = LocationType.MOON; // 10%
                    case 6,7,8,9 -> newParent.type = LocationType.CONTINENT; // 40%
                    default -> newParent.type = LocationType.COUNTRY; // 10%
                }
            }
            case CITY -> {
                if (Randomizer.randomIntXtoY(1, 10) <= 9) { newParent.type = LocationType.COUNTRY; } // 90% country
                else { newParent.type = LocationType.AREA; } // 10% area
            }
            case PLACE -> {
                if (Randomizer.randomIntXtoY(1, 10) <= 9) { newParent.type = LocationType.CITY; } // 90% city
                else { newParent.type = LocationType.AREA; } // 10% area
            }
        }

        if (newParent.type == null) { return null; }

        newParent.name = newParent.generateNameFromType();

        return newParent;
    }

    private Vector<Integer> generatePositionOnParent() { // josh todo avoid child collisions (separate check?)
        if (this.parent == null) { return null; }
        Vector<Integer> newPosition = new Vector<Integer>();

        switch (this.type) {
            case PLANET,MOON,FEATURE -> { // <distance in AG, orbital angle in degrees> (if a feature is in space, just divide the angle by 3 and treat as 2d coordinates)
                newPosition.add(Randomizer.randomIntXtoY(1, 100)); // distance in AG
                newPosition.add(Randomizer.randomIntXtoY(0, 3)*90); // 4 possible angles for simplicity
            }
            default -> { // <x,y> (dimension coords are only for pocket dimensions)
                newPosition.add(Randomizer.randomIntXtoY(0, 100)); // x
                newPosition.add(Randomizer.randomIntXtoY(0, 100));  // y
            }
        }

        return newPosition;
    }

    private Vector<CompressedLocation> generateCompressedChildren() {
        int numberOfChildren;
        LocationType childType;
        Vector<CompressedLocation> newChildren = new Vector<CompressedLocation>();
        
        switch (this.type) {
            case DIMENSION -> {
                switch (Randomizer.randomIntXtoY(1, 10)) {
                    case 1 -> numberOfChildren = Randomizer.randomIntXtoY(2, 4); // 10% -> 2 to 4 child universes
                    default -> numberOfChildren = 1; // 90% -> 1 child universes
                }
                for (int i = 0; i < numberOfChildren; i++) { // 1 to 4 child universes
                    newChildren.add(generateCompressedChild(LocationType.UNIVERSE)); 
                }
            } 
            case UNIVERSE -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12)+Randomizer.randomIntXtoY(1, 12); i++) { // 2 to 24 children
                    newChildren.add(generateCompressedChild((Randomizer.randomIntXtoY(1, 10) <= 8) ? LocationType.SPACE : LocationType.GALAXY)); 
                }
            }
            case GALAXY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12)+Randomizer.randomIntXtoY(1, 12); i++) { // 2 to 24 children
                    newChildren.add(generateCompressedChild(LocationType.STAR)); 
                }
            }
            case SPACE -> {
                switch (Randomizer.randomIntXtoY(1, 10)) {
                    case 1 -> numberOfChildren = Randomizer.randomIntXtoY(1, 3); // 10% -> 1 to 3 children
                    default -> numberOfChildren = 0; // 90% no children
                }
                for (int i = 0; i < numberOfChildren; i++) {
                    newChildren.add(generateCompressedChild((Randomizer.randomIntXtoY(1, 5) <= 4) ? LocationType.STAR : LocationType.FEATURE)); // 80% star, 20% feature
                }
            }
            case STAR -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(0, 12); i++) { // 0 to 12 children
                    // josh add continent
                    childType = switch (Randomizer.randomIntXtoY(0, 20)) {
                        case 1 -> LocationType.CONTINENT; // 5%
                        case 2,3 -> LocationType.FEATURE; // 10%
                        default -> LocationType.PLANET; // 85%
                    };
                    newChildren.add(generateCompressedChild(childType)); 
                }
            }
            case PLANET -> {
                newChildren.add(generateCompressedChild(LocationType.CONTINENT)); // all planets have 1 continent and 1 area (like an ocean)
                newChildren.add(generateCompressedChild(LocationType.AREA));
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8)+Randomizer.randomIntXtoY(1, 8); i++) { // 2 to 16 children
                    childType = switch (Randomizer.randomIntXtoY(0, 10)) {
                        case 1 -> LocationType.FEATURE; // 10%
                        case 2,3 -> LocationType.MOON; // 20%
                        case 4,5,6 -> LocationType.AREA; // 30%
                        default -> LocationType.CONTINENT; // 40%
                    };
                    newChildren.add(generateCompressedChild(childType));
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
                    newChildren.add(generateCompressedChild(childType));
                }
            }
            case FEATURE -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedChild(LocationType.AREA)); 
                }
            }
            case CONTINENT -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 4)+Randomizer.randomIntXtoY(1, 4); i++) { // 2 to 8 children
                    newChildren.add(generateCompressedChild((Randomizer.randomIntXtoY(1, 10) <= 7) ? LocationType.COUNTRY : LocationType.AREA)); 
                }
            }
            case COUNTRY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedChild((Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.CITY : LocationType.AREA)); 
                }
            }
            case AREA -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 8); i++) { // 1 to 8 children
                    newChildren.add(generateCompressedChild((Randomizer.randomIntXtoY(1, 2) <= 1) ? LocationType.CITY : LocationType.PLACE)); 
                }
            }
            case CITY -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(1, 12); i++) { // 1 to 12 children
                    newChildren.add(generateCompressedChild(LocationType.PLACE)); 
                }
            }
            case PLACE -> { return null; } // no children
        }

        if (newChildren.size() == 0) { return null; }

        return newChildren;
    }

    private CompressedLocation generateCompressedChild(LocationType childType) {
        if (childType == null) { return null; }
        CompressedLocation newChild = new CompressedLocation();
        newChild.type = childType;
        newChild.name = newChild.generateNameFromType();
        return newChild;
    }

    public LocationNature generateNature() { // Nature is based on type, modifier,  anomalies, and size.
        if (this.type == null) { 
            this.nature = null;
            return null;
        }

        switch (this.type) {
            case DIMENSION,UNIVERSE,GALAXY,SPACE -> this.nature = null;
            case STAR -> {
                this.nature = new LocationNature();
                this.nature.setupNature(this.type, this.modifier, this.size, containsContinent());
            }
            case PLANET,MOON -> {
                this.nature = new LocationNature();
                this.nature.setupNature(this.type, this.modifier, this.size, true);
            }
            default -> this.nature = inheritNatureFromParent(); // inherit from parent, if parent is SPACE, then null
        }

        return this.nature;
    }

    private boolean containsContinent() { // only for STAR types, to determine if they have nature
        if (this.children == null) { return false; }
        for (CompressedLocation child : this.children) {
            if (child.type == LocationType.CONTINENT) { return true; }
        }
        return false;
    }

    private LocationNature inheritNatureFromParent() {
        return null;
        // josh todo call DB to get parent (or maybe generate one then call DB) to get nature
        // then modify it based on this location's type & modifier. Materials & Environemnts might change during this process.       
        // if generating parent, must set this location as child! 
    }

    public LocationSociety generateSociety() {
        if (this.type == null) { return null; };

        switch (this.type) {
            case DIMENSION,UNIVERSE,SPACE -> this.society = null;
            case GALAXY -> this.society = (Randomizer.randomIntXtoY(1, 10) <= 8) ? null : getSocietyFromChild();
            case STAR -> this.society = (Randomizer.randomIntXtoY(1, 10) <= 6) ? null : getSocietyFromChild();
            case PLANET,MOON,FEATURE -> this.society = (Randomizer.randomIntXtoY(1, 10) <= 4) ? null : getSocietyFromChild();
            case CONTINENT -> this.society = (Randomizer.randomIntXtoY(1, 10) <= 2) ? null : getSocietyFromChild();
            case COUNTRY,AREA -> this.society = makeNewSociety();
            case CITY -> this.society = (Randomizer.randomIntXtoY(1, 10) <= 2) ? makeNewSociety() : inheritSocietyFromParent();
            case PLACE -> this.society = inheritSocietyFromParent();
        }

        return this.society;
    }

    private Vector<CompressedLocation> getSiblings() { // josh call db to get parent (or maybe generate one then call DB) to get siblings
        return null;
        // josh todo call DB to get parent (or maybe generate one then call DB) to get parent's CompressedChildren.
        // if generating parent, must set this location as child!

        // josh might make an getAllNearbyLocations function to check siblings, parent, & children & nephews.
    }

    private LocationSociety inheritSocietyFromParent() {
        return null;
        // josh todo call DB to get parent (or maybe generate one then call DB) to get society
        // if generating parent, must set this location as child!
    }

    private LocationSociety getSocietyFromChild() {
        
        // josh todo call DB to get child (or maybe generate one then call DB) to get society
        // if generating child, must set this location as parent!
        return makeNewSociety();
    }

    private LocationSociety makeNewSociety() {
        if (this.nature == null || this.nature.environments == null) { return null; }
        LocationSociety newSociety = new LocationSociety();
        newSociety.setupLocationSociety(this.anomalies, this.nature.environments, getSiblings());
        // josh todo call DB to get child (or maybe generate one then call DB) to get society
        // if generating child, must set this location as parent!
        return newSociety;
    }

    private String generateSummary() {
        return "A " + this.modifier + " " + this.type + " called " + this.name + ".";
        // josh todo generate based on type, modifier, materials, environments, appearance, anomalies, culture, & secrets. (use LLM?)
    }

    public void linkNewChildren(Vector<CompressedLocation> andChildren) {
        if (andChildren == null || andChildren.isEmpty()) { return; }

        if (this.children == null) { this.children = new Vector<CompressedLocation>(); }
        for (CompressedLocation child : andChildren) {
            if (!this.children.contains(child)) { 
                this.children.add(child);
            }
        }
    }

    public void linkNewParent(CompressedLocation parentAnd) {
        if (parentAnd == null) { return; }
        this.parent = parentAnd;
    }
   
    public Vector<CompressedLocation> chartNewChildren() {
        Vector<CompressedLocation> unchartedChildren = new Vector<CompressedLocation>();

        LocationType tempType;
        int numKids = 1;
        switch (this.type) {
            case DIMENSION -> {
                if (Randomizer.randomIntXtoY(1, 10) <= 9) { return null; } // 90% chance of none
                tempType = LocationType.UNIVERSE;
            }
            case UNIVERSE -> {
                if (Randomizer.randomIntXtoY(1, 2) <= 1) { return null; } // 50% chance of none
                tempType = LocationType.GALAXY;
            }
            case GALAXY -> {
                tempType = LocationType.STAR;
                numKids = Randomizer.randomIntXtoY(1, 4);
            }
            case SPACE -> tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.STAR : LocationType.FEATURE; // 90% star
            case STAR -> {
                tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.PLANET : LocationType.FEATURE; // 90% planet
                numKids = Randomizer.randomIntXtoY(1, 6);
            }
            case PLANET -> {
                tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.MOON : LocationType.FEATURE; // 90% moon
                numKids = Randomizer.randomIntXtoY(1, 8);
            }
            case MOON -> {
                if (Randomizer.randomIntXtoY(1, 2) <= 1) { return null; } // 50% chance of none
                tempType = LocationType.FEATURE;
            }
            default -> { return null; } // no uncharted children for smaller types
        }

        for (int i = 0; i < numKids; i++) {
            unchartedChildren.add(generateCompressedChild(tempType));
        }

        linkNewChildren(unchartedChildren);
        return this.children;
    }

    // josh todo new fucntion to get potential children from the DB. (check nephews)
    // call DB to get all locations with this location as their parent. 
}
