package com.jellingsen.games.echoes_of_unreality.Database;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;
// import static com.mongodb.client.model.Aggregates.sample;
// import static com.mongodb.client.model.Aggregates.match;

import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.jellingsen.games.echoes_of_unreality.API.Filters.LocationFilterOptions;
import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.VectorChecks;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.AtmosphereFilter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Field;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

public class DatabaseConnection {
    private MongoClient mongoClient;
    final private String connectionString = "mongodb://localhost:20002";

    private MongoDatabase randomListsDatabase;
    final private String randomListsDatabaseName = "randomListsDatabase";
    private MongoCollection<Document> randomLocationNamesCollection;
    final private String randomLocationNamesList = "randomLocationNamesList";
    private MongoCollection<Document> randomCharacterNamesCollection;
    final private String randomCharacterNamesList = "randomCharacterNamesList";

    private MongoDatabase locationsAndCharactersDatabase;
    final private String locationsAndCharactersDatabaseName = "locationsAndCharactersDatabase";
    private MongoCollection<Document> locationsCollection;
    final public String locationsCollectionName = "locationsCollection";
    private MongoCollection<Document> charactersCollection;
    final public String charactersCollectionName = "charactersCollection";

    ObjectMapper jsonMapper;

    public DatabaseConnection() {
        System.out.println("\nConnecting backend to database...");

        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(PojoCodecProvider.builder().automatic(true).build()));

        this.mongoClient = MongoClients.create(connectionString);

        this.randomListsDatabase = this.mongoClient.getDatabase(randomListsDatabaseName).withCodecRegistry(pojoCodecRegistry); // lists for generation
        this.randomLocationNamesCollection = createOrGetCollection(this.randomListsDatabase, randomLocationNamesList);
        this.randomCharacterNamesCollection = createOrGetCollection(this.randomListsDatabase, randomCharacterNamesList);

        this.locationsAndCharactersDatabase = this.mongoClient.getDatabase(locationsAndCharactersDatabaseName).withCodecRegistry(pojoCodecRegistry); // actual generated data
        this.locationsCollection = createOrGetCollection(this.locationsAndCharactersDatabase, locationsCollectionName);
        this.charactersCollection = createOrGetCollection(this.locationsAndCharactersDatabase, charactersCollectionName);

        this.jsonMapper = new ObjectMapper();

        // Runtime.getRuntime().addShutdownHook(new Thread(() -> {
        //     closeConnection();
        // }));
    }   

    private MongoCollection<Document> createOrGetCollection(MongoDatabase database, String collectionName) {
        for (String name : database.listCollectionNames()) {
            if (name.equals(collectionName)) { return database.getCollection(collectionName); }
        }
        MongoCollection<Document> newCollection = database.getCollection(collectionName);
        newCollection.createIndex(Indexes.ascending("name","type"), new IndexOptions().unique(true));
        return newCollection;
    }

    // public void closeConnection() {
    //     if (mongoClient != null) {
    //         mongoClient.close();
    //         System.out.println("Database connection closed.");  
    //     }
    // }

    // GET UP TO 50 LOCATIONS, COMPRESSED //

    public Vector<CompressedLocation> getPaginatedCompressedLocations(int offset, int limit, LocationFilterOptions filter) {
        
        Bson locationsFilter = combineFilters(
            combineFilters(
                getNameFilter(filter.name), 
                getTypeFilter(filter.type)
            ), 
            combineFilters(
                getAtmosphereFilter(filter.breathable), 
                getParentFilter(filter.parent)
            )
        );
        Bson locationsSorts;
        switch (filter.sortBy) {
            case NAME -> locationsSorts = Sorts.orderBy(getAscendingOrDescendingSort(filter.descending, "name"), getAscendingOrDescendingSort(filter.descending, "timestamp")); // secondary sort by time
            case TYPE -> { return getPaginatedCompressedLocationsSortedByType(offset, limit, filter.descending, locationsFilter); } // secondary sort by name, then timestamp
            case POSITION -> locationsSorts = Sorts.orderBy(getAscendingOrDescendingSort(filter.descending, "position.0"), getAscendingOrDescendingSort(filter.descending, "name"), getAscendingOrDescendingSort(filter.descending, "timestamp")); // secondary sort by name, then timestamp
            case TIME -> locationsSorts = Sorts.orderBy(getAscendingOrDescendingSort(filter.descending, "timestamp"), getAscendingOrDescendingSort(filter.descending, "name"));
            default -> locationsSorts = Sorts.orderBy(Sorts.ascending("timestamp"), Sorts.ascending("name")); // default
        }

        ArrayList<Object> tempList;
        final Document compressedDocumentTemplate = new Document("name", 1).append("type", 1);
        if (locationsFilter != null) {
            tempList = this.locationsCollection.find()
                .filter(locationsFilter)
                .projection(compressedDocumentTemplate)
                .sort(locationsSorts)
            .skip(offset)
            .limit(limit)
            .into(new ArrayList<>());
        } else {
            tempList = this.locationsCollection.find()
                .projection(compressedDocumentTemplate)
                .sort(locationsSorts)
            .skip(offset)
            .limit(limit)
            .into(new ArrayList<>());
        }

        Vector<CompressedLocation> compressedLocsPage = new Vector<CompressedLocation>();
        for (Object tempDoc : tempList) {
            compressedLocsPage.add(jsonMapper.readValue(((Document) tempDoc).toJson(), CompressedLocation.class));
        }
        return compressedLocsPage;
    }

    private Vector<CompressedLocation> getPaginatedCompressedLocationsSortedByType(int offset, int limit, boolean descending, Bson locationsFilter) {
        // System.out.println("getting compressed locations sorted by type with filter options: " + 
        //     ((locationsFilter != null) ? locationsFilter.toString() + ", " : "") +
        //     "descending=" + descending);

        List<Bson> aggregatesList = Arrays.asList(
            Aggregates.addFields(new Field<>("typeSize", 
            new Document("$switch", new Document("branches", Arrays.asList(
                new Document("case", new Document("$eq", Arrays.asList("$type", "DIMENSION"))).append("then", 1),
                new Document("case", new Document("$eq", Arrays.asList("$type", "UNIVERSE"))).append("then", 2),
                new Document("case", new Document("$eq", Arrays.asList("$type", "GALAXY"))).append("then", 3),
                new Document("case", new Document("$eq", Arrays.asList("$type", "SPACE"))).append("then", 4),
                new Document("case", new Document("$eq", Arrays.asList("$type", "STAR"))).append("then", 5),
                new Document("case", new Document("$eq", Arrays.asList("$type", "PLANET"))).append("then", 6),
                new Document("case", new Document("$eq", Arrays.asList("$type", "MOON"))).append("then", 7),
                new Document("case", new Document("$eq", Arrays.asList("$type", "FEATURE"))).append("then", 8),
                new Document("case", new Document("$eq", Arrays.asList("$type", "CONTINENT"))).append("then", 9),
                new Document("case", new Document("$eq", Arrays.asList("$type", "COUNTRY"))).append("then", 10),
                new Document("case", new Document("$eq", Arrays.asList("$type", "AREA"))).append("then", 11),
                new Document("case", new Document("$eq", Arrays.asList("$type", "CITY"))).append("then", 12),
                new Document("case", new Document("$eq", Arrays.asList("$type", "PLACE"))).append("then", 13)
            )).append("default", 14)))),
            Aggregates.sort(Sorts.orderBy(
                getAscendingOrDescendingSort(descending, "typeSize"), 
                getAscendingOrDescendingSort(descending, "name"), 
                getAscendingOrDescendingSort(descending, "timestamp"))), 
            Aggregates.skip(offset),
            Aggregates.limit(limit)
        );
        if (locationsFilter != null) { aggregatesList.add(Aggregates.match(locationsFilter)); }
        List<Document> results = this.locationsCollection.aggregate(aggregatesList).into(new ArrayList<>());

        Vector<CompressedLocation> compressedLocsPage = new Vector<CompressedLocation>();
        for (Document tempDoc : results) {
            compressedLocsPage.add(jsonMapper.readValue(tempDoc.toJson(), CompressedLocation.class));
        }
        return compressedLocsPage;
    }

    private Bson getNameFilter(String name) {
        if (name == null || name.isEmpty()) { return null; }
        return Filters.regex("name", name, "i");
    }
    private Bson getTypeFilter(LocationType type) {
        if (type == null) { return null; }
        return Filters.eq("type", type);
    }
    private Bson getAtmosphereFilter(AtmosphereFilter breathable) {
        if (breathable == null) { return null; }
        Bson bFilter;
        if (AtmosphereFilter.BREATHABLE == breathable) {
            bFilter = Filters.eq("nature.breathable", true);
        } else {
            bFilter = Filters.or(Filters.eq("nature.breathable", false), Filters.eq("nature.breathable", null));
        }
        return bFilter;
    }
    private Bson getParentFilter(CompressedLocation parent) {
        if (parent == null) { return null; }
        return combineFilters(
            Filters.eq("parent.name", parent.name), 
            Filters.eq("parent.type", parent.type)
        );
    }

    private Bson combineFilters(Bson f1, Bson f2) {
        if (f1 == null) { return f2; }
        if (f2 == null) { return f1; }
        return Filters.and(f1,f2);
    }
    
    private Bson getAscendingOrDescendingSort(boolean descending, String sortField) {
        if (sortField == null || sortField.isEmpty()) { return null; }
        if (descending) { return Sorts.descending(sortField); }
        return Sorts.ascending(sortField);
    }

    // LOCATION //

    public boolean isLocationInCollection(String name, LocationType type) {
        return locationsCollection != null && locationsCollection.find(new Document("name", name).append("type", type)).first() != null;
    }

    private boolean isLocationInCollectionById(ObjectId id) {
        return locationsCollection != null && locationsCollection.find(new Document("_id", id)).first() != null;
    }

    public Location createNewLocationSave(Location location) { // creating a new location
        if (location == null || location.name == null || location.type == null) {
            System.out.println("> Error: Location name or type is null.");
            return null;
        }

        if (isLocationInCollection(location.name, location.type)) {
            System.out.println("> Can not create a new location with name " + location.name + " & type " + location.type + ", a location with that name and type already exists.");
            return location;
        }

        // System.out.println(
        //     "  -->  saving location: " + 
        //     location.name +
        //     " of type " + location.type +
        //     ((location.parent != null) ? (", with parent " + location.parent.name) : "") +
        //     ((location.children != null && !location.children.isEmpty()) ? (
        //         ", with children: " + 
        //         Arrays.toString(location.children.stream().map(ch -> ch.name + " (" + ch.charted + ")").toArray(String[]::new))
        //     ) : "") 
        // );

        try {
            location._id = this.locationsCollection.insertOne(new Document("name", location.name)
                .append("type", location.type)
                .append("appearance", location.appearance)
                .append("summary", location.summary)
                .append("size", location.size)
                .append("modifier", location.modifier)
                .append("nature", location.nature)
                .append("society", location.society)
                .append("anomalies", location.anomalies)
                .append("parent", location.parent)
                .append("position", location.position)
                .append("children", location.children)
                .append("timestamp", Instant.now().atZone(ZoneId.of("UTC")).getLong(ChronoField.INSTANT_SECONDS)))
            .getInsertedId().asObjectId().getValue().toHexString();
            System.out.println("> Inserted location " + location.name);
            return location;
        } catch (Exception e) {
            System.out.println("> Error inserting location " + location.name + ": " + e.getMessage());
            return null;
        }
    }

    public Location updateLocationSave(Location location) {
        if (location != null && location._id != null && location._id.length() > 0) {
            // String id = "ObjectId('" + location._id + "')";
            ObjectId locationId = new ObjectId(location._id);
            if (!isLocationInCollectionById(locationId)) {
                System.out.println("> Can not update location with id " + locationId + ", no location with that id exists.");
                return null;
            }
            try {
                this.locationsCollection.updateOne(
                    Filters.eq("_id", locationId),
                    Updates.combine( // add all fields
                        Updates.set("name", location.name),
                        Updates.set("type", location.type),
                        Updates.set("appearance", location.appearance),
                        Updates.set("summary", location.summary),
                        Updates.set("size", location.size),
                        Updates.set("modifier", location.modifier),
                        Updates.set("nature", location.nature),
                        Updates.set("society", location.society),
                        Updates.set("anomalies", location.anomalies),
                        Updates.set("parent", location.parent),
                        Updates.set("position", location.position),
                        Updates.set("children", location.children),
                        Updates.set("timestamp", Instant.now().atZone(ZoneId.of("UTC")).getLong(ChronoField.INSTANT_SECONDS)
                    )));
                    System.out.println("> Updated location " + location.name);
                    return location;
            } catch (Exception e) {
                System.out.println("> Error updating location " + location.name + ": " + e.getMessage());
                return null;
            }
        } else {
            System.out.println("> Id missing: Can not update location.");
            return null;
        }
    }

    public boolean deleteLocationSave(String _id, String locationName) {
        if (_id != null && _id.length() > 0) {
            // String id = "ObjectId('" + location._id + "')";
            ObjectId locationId = new ObjectId(_id);
            if (!isLocationInCollectionById(locationId)) {
                System.out.println("> Can not delete location with id " + locationId + ", no location with that id exists.");
                return false;
            }
            try {
                this.locationsCollection.deleteOne(Filters.eq("_id", locationId));
                System.out.println("> Deleted location " + locationName + ".");
                return true;
            } catch (Exception e) {
                System.out.println("> Error deleting location " + locationName + ": " + e.getMessage());
                return false;
            }
        } else {
            System.out.println("> Id missing: Can not delete location.");
            return false;
        }
    }

    public Location getLocation(String locName, LocationType locType) {
        Document tempDoc = this.locationsCollection.find(combineFilters(
            Filters.eq("name", locName), 
            Filters.eq("type", locType)))
        .first();
        if (tempDoc == null) { return null; }
        ObjectNode node = (ObjectNode) jsonMapper.readTree(tempDoc.toJson());
        String _id = jsonMapper.writeValueAsString(node.remove("_id").get("$oid")).replace("\"", "");
        Location retrievedLocation = jsonMapper.readValue(jsonMapper.writeValueAsString(node), Location.class);
        retrievedLocation._id = _id; // set the _id field of the retrieved location
        // System.out.println("retrieved location id: " + _id);
        return retrievedLocation;
    }

    public CompressedLocation findExistingParent(CompressedLocation currentLoc) {
        System.out.println("  --> Searching for an existing parent of "+currentLoc.name);
        CompressedLocation existingParent = null;
        Document tempDoc = this.locationsCollection    
        .find(combineFilters( // get only locations with currentLoc in children
            Filters.in("children.name", currentLoc.name),
            Filters.in("children.type", currentLoc.type)
        ))
        .projection(new Document("name", 1).append("type", 1))
        .first();
        if (tempDoc == null) { 
            System.out.println("    > No existing parent found for "+currentLoc.name);
            return null; 
        }
        existingParent = new CompressedLocation();
        existingParent.type = LocationType.valueOf(tempDoc.get("type", String.class));
        existingParent.name = tempDoc.get("name", String.class);
        existingParent.charted = true; // if found as a parent, it is charted
        System.out.println("    > Found existing parent for "+currentLoc.name+": " + existingParent.name);
        return existingParent;
    }

    public Vector<CompressedLocation> findAllExistingChildren(CompressedLocation currentLoc) {
        System.out.println("  --> Searching for any existing children of "+currentLoc.name);
       Vector<CompressedLocation> existingChildren = new Vector<CompressedLocation>();

        for (Document tempDoc : this.locationsCollection
        .find(getParentFilter(currentLoc)) // get only locations with currentLoc as parent
        .projection(new Document("name", 1).append("type", 1))) {
            // System.out.println("tempDoc for existing child retreival: " + tempDoc);
            CompressedLocation chLoc = new CompressedLocation();
            chLoc. type = LocationType.valueOf(tempDoc.get("type", String.class));
            chLoc.name = tempDoc.get("name", String.class);
            chLoc.charted = true; // if found as a child, it is charted
            existingChildren.add(chLoc);
        }
        System.out.println("    > Found "+existingChildren.size()+" existing child(ren) for "+currentLoc.name);
        return existingChildren;
    }

    public Vector<CompressedLocation> getLocationsChildren(CompressedLocation loc) {
        Document tempDoc = this.locationsCollection
        .find(combineFilters(
            Filters.eq("name", loc.name),
            Filters.eq("type", loc.type)
        ))
            .projection(new Document("children", 1))
        .first();
        if (tempDoc == null) { return null; }
        Vector<CompressedLocation> tempChildren = new Vector<CompressedLocation>();
        for (Object child_ : tempDoc.get("children", ArrayList.class)) {
            Document temperDoc = (Document) child_;
            tempChildren.add(jsonMapper.readValue(temperDoc.toJson(), CompressedLocation.class));
        }
        return tempChildren;
    } 

    public void updateLocationsCompressedParent(CompressedLocation loc, CompressedLocation newParent) {
        this.locationsCollection.updateOne(combineFilters(
            Filters.eq("name", loc.name),
            Filters.eq("type", loc.type)
        ), Updates.set("parent", newParent));
    }

    public void updateLocationsCompressedChildren(CompressedLocation loc, Vector<CompressedLocation> newChildren) {
        this.locationsCollection.updateOne(combineFilters(
            Filters.eq("name", loc.name),
            Filters.eq("type", loc.type)
        ),
        Updates.set("children",  newChildren));
    }

    public void unlinkParentFromAllOtherChildren(CompressedLocation pLoc, Vector<CompressedLocation> children) { // if childern == null, unlink from all children   
        Vector<CompressedLocation> foundChildrenLocs = findAllExistingChildren(pLoc);
        if (foundChildrenLocs == null || foundChildrenLocs.isEmpty()) return; // found no children
        for (CompressedLocation foundChLoc : foundChildrenLocs) {
            if (children == null || !VectorChecks.childrenVectorContainsNameAndType(children, foundChLoc)) {// removeParent (unlink children not contained in current) -> (unlink all children if null)
                System.out.println("      > Unlinking "+foundChLoc.name+" from parent "+pLoc.name);
                updateLocationsCompressedParent(foundChLoc, null);
            }
        }
    }

    public void unlinkChildFromAllOtherParents(CompressedLocation chLoc, CompressedLocation parentLoc) { // if parentLoc == null, remove from all parents
        CompressedLocation foundParentLoc = findExistingParent(chLoc);
        if (foundParentLoc == null) return; // found no parents
        if (parentLoc != null && (foundParentLoc.name.equals(parentLoc.name) && foundParentLoc.type == parentLoc.type)) return; // found the same parent, no need to unlink
        System.out.println("      > Unlinking "+foundParentLoc.name+" from child "+chLoc.name);
        Vector<CompressedLocation> children = getLocationsChildren(foundParentLoc);
        children = removeChild(children, chLoc);
        updateLocationsCompressedChildren(foundParentLoc, children);
    }

    private Vector<CompressedLocation> removeChild(Vector<CompressedLocation> childrenIn, CompressedLocation chLoc) {
        Vector<CompressedLocation> updatedChildren = new Vector<CompressedLocation>();
        for (CompressedLocation child : childrenIn) {
            if (!child.name.equals(chLoc.name) || child.type != chLoc.type) {
                updatedChildren.add(child);
            }
        }
        return updatedChildren;
    }

    // public void unlinkChildFromDeletedParent(CompressedLocation chLoc) {
    //     updateLocationsCompressedParent(chLoc, null);
    // }

    // public void unlinkParentFromDeletedChild(CompressedLocation parent, CompressedLocation loc) {
    //     updateLocationsCompressedChildren(parent, removeChild(getLocationsChildren(parent), loc));
    // }

    // public Location getRandomChartedLocation() {
    //     Document tempDoc = this.locationsCollection.aggregate(Arrays.asList(sample(1))).first();
    //     if (tempDoc == null) {
    //         return null;
    //     }
    //     return jsonMapper.readValue(tempDoc.toJson(), Location.class);
    // }

    // public Location getRandomChartedLocationFromType(LocationType type) {
    //     Document tempDoc = this.locationsCollection.aggregate(Arrays.asList(match(Filters.eq("type", type)),sample(1))).first();
    //     if (tempDoc == null) {
    //         return null;
    //     }
    //     return jsonMapper.readValue(tempDoc.toJson(), Location.class);
    // }

    // public CompressedLocation getCompressedLocation(String key) {
    //     CompressedLocation tempCompressedLocation = jsonMapper.readValue(this.locationsCollection
    //     .find(Filters.eq("key", key))
    //         .projection(new Document("name", 1)
    //         .append("type", 1))
    //     .first().toJson(), CompressedLocation.class);

    //     return tempCompressedLocation;
    // }

    // public CompressedLocation getLocationsParent(String key) {
    //     Document tempDoc = this.locationsCollection
    //     .find(Filters.eq("key", key))
    //         .projection(new Document("parent", 1))
    //     .first();
    //     if (tempDoc == null) { return null; }
    //     System.out.println("TempDoc for parent retrieval: " + tempDoc.toJson());
    //     CompressedLocation tempParent = jsonMapper.readValue(tempDoc.get("parent", Document.class).toJson(), CompressedLocation.class);
    //     return tempParent;
    // }

    //// CHARACTER ////

    private boolean isCharacterInCollection(String name, String title, CharacterType type, String species) {
        return charactersCollection != null && charactersCollection.find(new Document("name", name).append("title", title).append("type", type).append("species", species)).first() != null;
    }

    public String saveNpc(NPC npc) {
        if (npc == null || npc.name == null || npc.type == null || npc.species == null || npc.title == null) {
             return "Error: NPC name or type or species or title is null. Make sure all fields are filled out.";
        }
        if (isCharacterInCollection(npc.name, npc.title, npc.type, npc.species)) {
            return "NPC already exists: " + npc.name;
        }

        try {
            this.locationsCollection.insertOne(new Document("name", npc.name)
                .append("level", npc.level)
                .append("title", npc.title)
                .append("type", npc.type)
                .append("species", npc.species)
                .append("appearance", npc.appearance)
                .append("modifier", npc.modifier)
                .append("attitude", npc.attitude)
                .append("consciousness", npc.consciousness)
                .append("health", npc.health)
                .append("wounds", npc.wounds)
                .append("bruises", npc.bruises)
                .append("defenses", npc.defenses)
                .append("weaknesses", npc.weaknesses)
                .append("currentEffects", npc.currentEffects)
                .append("actions", npc.actions)
                .append("reactions", npc.reactions)
                .append("attacks", npc.attacks)
                .append("abilities", npc.abilities)
                .append("aura", npc.aura)
                .append("anomalies", npc.anomalies)
                .append("chaos", npc.chaos)
                .append("mass", npc.mass)
                .append("movement", npc.movement)
                .append("inventory", npc.inventory)
                .append("traitsAndTalents", npc.traitsAndTalents)
                .append("other", npc.other)
                .append("timestamp", Instant.now().atZone(ZoneId.of("UTC")).getLong(ChronoField.INSTANT_SECONDS)));
            System.out.println("> Inserted NPC " + npc.name);
            return npc.name;
        } catch (Exception e) {
            System.out.println("> Error inserting npc " + npc.name + ": " + e.getMessage());
            return null;
        }
    }

    public String savePc(PlayableCharacter pc) {
        if (pc == null || pc.name == null || pc.type == null || pc.species == null || pc.title == null) {
            return "Error: Playable character name or type or species or title is null. Make sure all fields are filled out.";
        }
        if (isCharacterInCollection(pc.name, pc.title, pc.type, pc.species)) {
            return "Playable character already exists: " + pc.name;
        }

        try {
            this.locationsCollection.insertOne(new Document("name", pc.name)
                .append("level", pc.level)
                .append("title", pc.title)
                .append("type", pc.type)
                .append("species", pc.species)
                .append("appearance", pc.appearance)
                .append("health", pc.health)
                .append("wounds", pc.wounds)
                .append("bruises", pc.bruises)
                .append("defenses", pc.defenses)
                .append("weaknesses", pc.weaknesses)
                .append("ruin", pc.ruin)
                .append("currentStance", pc.currentStance)
                .append("currentEffects", pc.currentEffects)
                .append("actions", pc.actions)
                .append("reactions", pc.reactions)
                .append("attacks", pc.attacks)
                .append("abilities", pc.abilities)
                .append("aura", pc.aura)
                .append("anomalies", pc.anomalies)
                .append("chaos", pc.chaos)
                .append("mass", pc.mass)
                .append("movement", pc.movement)
                .append("allies", pc.allies)
                .append("goals", pc.goals)
                .append("origin", pc.origin)
                .append("gimmick", pc.gimmick)
                .append("beliefs", pc.beliefs)
                .append("flaws", pc.flaws)
                .append("cultures", pc.cultures)
                .append("wealth", pc.wealth)
                .append("might", pc.might)
                .append("foresight", pc.foresight)
                .append("inventory", pc.inventory)
                .append("crew", pc.crew)
                .append("otherStances", pc.otherStances)
                .append("traitsAndTalents", pc.traitsAndTalents)
                .append("other", pc.other)
                .append("timestamp", Instant.now().atZone(ZoneId.of("UTC")).getLong(ChronoField.INSTANT_SECONDS)));
            System.out.println("> Inserted playable character " + pc.name);
            return pc.name;
        } catch (Exception e) {
            System.out.println("> Error inserting playable character " + pc.name + ": " + e.getMessage());
            return null;
        }
    }

















    // CLEAR DATABASES //

    public void clearAllCollections() { // BE CAREFUL WITH THIS, IT WILL DELETE ALL DATA IN THE DATABASES, FOR TESTING ONLY
        this.randomLocationNamesCollection.drop();
        this.randomCharacterNamesCollection.drop();
        this.locationsCollection.drop();
        this.charactersCollection.drop();
        this.randomListsDatabase.drop();
        this.locationsAndCharactersDatabase.drop();
        System.out.println("All databases cleared.");
    }
}
