package com.jellingsen.games.echoes_of_unreality.Database;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import java.util.ArrayList;
import java.util.Vector;

import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Updates;

import tools.jackson.databind.ObjectMapper;

public class DatabaseConnection {
    private MongoClient mongoClient;
    final private String connectionString = "mongodb://localhost:27017";

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
        // josh lots more

        this.locationsAndCharactersDatabase = this.mongoClient.getDatabase(locationsAndCharactersDatabaseName).withCodecRegistry(pojoCodecRegistry); // actual generated data
        this.locationsCollection = createOrGetCollection(this.locationsAndCharactersDatabase, locationsCollectionName);
        this.charactersCollection = createOrGetCollection(this.locationsAndCharactersDatabase, charactersCollectionName);

        this.jsonMapper = new ObjectMapper();
    }   

    private MongoCollection<Document> createOrGetCollection(MongoDatabase database, String collectionName) {
        for (String name : database.listCollectionNames()) {
            if (name.equals(collectionName)) { return database.getCollection(collectionName); }
        }
        MongoCollection<Document> newCollection = database.getCollection(collectionName);
        newCollection.createIndex(Indexes.ascending("key"), new IndexOptions().unique(true));
        return newCollection;
    }

    public boolean checkForKeyInCollection(String collectionName, String key) {
        MongoCollection<Document> tempCollection = switch (collectionName) {
            case randomLocationNamesList -> this.randomLocationNamesCollection;
            case randomCharacterNamesList -> this.randomCharacterNamesCollection;
            case locationsCollectionName -> this.locationsCollection;
            case charactersCollectionName -> this.charactersCollection;
            // josh todo expand as i make more collections
            default -> null; // should never happen
        };
        return tempCollection != null && tempCollection.find(new Document("key", key)).first() != null;
    }

    public Location createNewLocationSave(Location location) { // creating a new location
        String key = location.makeNameTypeKey();
        if (key == null) {
            System.out.println("Error: Location key is null.");
            return null;
        }
        if (checkForKeyInCollection(locationsCollectionName, key)) {
            System.out.println("Location already exists: " + location.name);
            return getLocation(key);
        }

        try {
            this.locationsCollection.insertOne(new Document("key", key)
                                    .append("name", location.name)
                                    .append("type", location.type)
                                    .append("summary", location.summary)
                                    .append("size", location.size)
                                    .append("modifier", location.modifier)
                                    .append("nature", location.nature)
                                    .append("society", location.society)
                                    .append("anomalies", location.anomalies)
                                    .append("parent", location.parent)
                                    .append("positionOnParent", location.positionOnParent)
                                    .append("children", location.children));
            System.out.println("Inserted location " + location.name);
            return location;
        } catch (Exception e) {
            System.out.println("Error inserting location " + location.name + ": " + e.getMessage());
            return null;
        }
    }

    public Location getLocation(String key) {
        Document tempDoc = this.locationsCollection.find(Filters.eq("key", key)).first();
        if (tempDoc == null) {
            // System.out.println("Location not found for key: " + key);
            return null;
        }
        return jsonMapper.readValue(tempDoc.toJson(), Location.class);
    }

    public CompressedLocation getCompressedLocation(String key) {
        CompressedLocation tempCompressedLocation = jsonMapper.readValue(this.locationsCollection
        .find(Filters.eq("key", key))
            .projection(new Document("name", 1)
            .append("type", 1))
        .first().toJson(), CompressedLocation.class);

        return tempCompressedLocation;
    }

    public CompressedLocation getLocationsParent(String key) {
        Document tempDoc = this.locationsCollection
        .find(Filters.eq("key", key))
            .projection(new Document("parent", 1))
        .first();

        // System.out.println("TempDoc for parent retrieval: " + tempDoc.toJson());
        
        CompressedLocation tempParent = jsonMapper.readValue(tempDoc.get("parent", Document.class).toJson(), CompressedLocation.class);
        return tempParent;
    }

    public Vector<CompressedLocation> getLocationsChildren(String key) {
        Document tempDoc = this.locationsCollection
        .find(Filters.eq("key", key))
            .projection(new Document("children", 1))
        .first();

        System.out.println("tempDoc for children retreival: " + tempDoc);

        Vector<CompressedLocation> tempChildren = new Vector<CompressedLocation>();
        for (Object child_ : tempDoc.get("children", ArrayList.class)) {
            Document temperDoc = (Document) child_;
            System.out.println("temperDoc for children retreival: " + temperDoc);
            tempChildren.add(jsonMapper.readValue(temperDoc.toJson(), CompressedLocation.class));
        }

        return tempChildren;
    } 

    // public void updateLocation(Location location) { // josh fix
    //     this.locationsCollection.updateOne(Filters.eq("key", location.makeNameTypeKey()), 
    //     Updates.set("location", location));
    //     System.out.println("Location updated: " + location.name);
    // }  

    public void updateLocationsCompressedParent(String key, CompressedLocation newParent) {
        System.out.println("    -> Updating parent for location: " + key + " to new parent: " + newParent.name);
        this.locationsCollection.updateOne(Filters.eq("key", key),
        Updates.set("parent",  newParent));
        // System.out.println("Location's parent updated.");
    }

    public void updateLocationsCompressedChildren(String key, Vector<CompressedLocation> newChildren) {
        System.out.println("    -> Updating children for location: " + key + " to new children num: " + newChildren.size());
        this.locationsCollection.updateOne(Filters.eq("key", key),
        Updates.set("children",  newChildren));
        // System.out.println("Location's children updated.");
    }




    //// CHARACTER ////

    public String saveNpc(NPC npc) {
        String key = npc.makeNameTitleTypeSpeciesKey();
        if (key == null) {
            return "Error: NPC key is null.";
        }
        if (checkForKeyInCollection(charactersCollectionName, key)) {
            return "Character already exists: " + npc.name;
        }

        try {
            this.charactersCollection.insertOne(new Document("key", key).append("npc", npc));
            return "Character added: " + npc.name;
        } catch (Exception e) {
            return "Error inserting character " + npc.name + ": " + e.getMessage();
        }
    }

    public String savePc(PlayableCharacter pc) {
        String key = pc.makeNameTitleTypeSpeciesKey();
        if (key == null) {
            return "Error: PlayableCharacter key is null. Make sure all fields are filled out.";
        }
        if (checkForKeyInCollection(charactersCollectionName, key)) {
            return "Character already exists: " + pc.name;
        }

        try {
            this.charactersCollection.insertOne(new Document("key", key).append("pc", pc));
            return "Character added: " + pc.name;
        } catch (Exception e) {
            return "Error inserting character " + pc.name + ": " + e.getMessage();
        }
    }

















    

    public void clearAllCollections() { // josh BE CAREFUL WITH THIS, IT WILL DELETE ALL DATA IN THE DATABASES, FOR TESTING ONLY
        this.randomLocationNamesCollection.drop();
        this.randomCharacterNamesCollection.drop();
        this.locationsCollection.drop();
        this.charactersCollection.drop();
        this.randomListsDatabase.drop();
        this.locationsAndCharactersDatabase.drop();
        System.out.println("All databases cleared.");
    }
}
