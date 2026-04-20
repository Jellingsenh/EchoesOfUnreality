package com.jellingsen.games.echoes_of_unreality.Manager;
import java.util.Arrays;
import java.util.Vector;

import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
import com.jellingsen.games.echoes_of_unreality.Database.DatabaseConnection;

public class UnrealityManager {
    private DatabaseConnection databaseConnection;

    public UnrealityManager() {
        this.databaseConnection = new DatabaseConnection();
    }  

    public String getHeartbeat() {
        return "Echoes of Unreality combat engine is running.";
    }

    // LOCATION //

    public Location generateRandomLocation() {
        Location loc = new Location();
        
        loc.setupLocation(null, null, null, null, 
            null, null, null, null, 
            null, null, null);

        return saveLocationToDatabase(loc);
    }

    public Location generateRandomLocationByType(LocationType type) {
        Location loc = new Location();
        
        loc.setupLocation(null, type, null, null, 
            null, null, null, null, 
            null, null, null);

        return saveLocationToDatabase(loc);
    } 

    public Location saveLocationToDatabase(Location location) {
        System.out.println("  -->  saving location: " + location.name);
        return databaseConnection.createNewLocationSave(location);
    }  

    public Location getLocationFromDatabase(String key) {
        return databaseConnection.getLocation(key);
    }

    private Location uncompressLocation(CompressedLocation compressedLocation, CompressedLocation parentLoc, Vector<CompressedLocation> childrenLocs) {
        Location l = getLocationFromDatabase(compressedLocation.makeNameTypeKey()); // if got from database, assume already linked
        if (l == null) {
            l = new Location();
            l.setupLocation(compressedLocation.name, compressedLocation.type, null, null, 
            null, null, null, null, 
            parentLoc, null, childrenLocs);
            return saveLocationToDatabase(l); 
        }
        return l;
    }

    public Location getParent(String key) {
        if (!databaseConnection.checkForKeyInCollection(databaseConnection.locationsCollectionName, key)) {
            return null;
        }

        return uncompressLocation(databaseConnection.getLocationsParent(key), null, new Vector<CompressedLocation> (Arrays.asList(databaseConnection.getCompressedLocation(key))) 
        ); 
    }

    public Vector<Location> getChildren(String key) {
        if (!databaseConnection.checkForKeyInCollection(databaseConnection.locationsCollectionName, key)) {
            return null;
        }

        Vector<Location> tempChildren = new Vector<Location>();
        for (CompressedLocation cLoc : databaseConnection.getLocationsChildren(key)) {
            tempChildren.add(uncompressLocation(cLoc, databaseConnection.getCompressedLocation(key), null));
        }

        return tempChildren;
    } 

    public String linkLocations(Vector<CompressedLocation> parentAndChildren) { // josh todo change
        // 0: check if all exist
        for (CompressedLocation cLoc : parentAndChildren) {
            if (!databaseConnection.checkForKeyInCollection(databaseConnection.locationsCollectionName, cLoc.makeNameTypeKey())) {
                String printStr = cLoc.name + " not found in database. Please save all locations before linking.";
                System.out.println(printStr); //josh debug
                return printStr;
            }
        }
        // 1: split parent & children
        CompressedLocation parentLoc = parentAndChildren.remove(0); // pop parent
        // 2: parent - link & update in DB
        linkParentToNewChildren(databaseConnection.getLocation(parentLoc.makeNameTypeKey()), parentAndChildren); // only children now
        // 3: children - link & update in DB
        for (CompressedLocation cLoc: parentAndChildren) { // only children now
            linkChildToOneParent(databaseConnection.getLocation(cLoc.makeNameTypeKey()), parentLoc);
        }
        // return a String (josh future change to location?)
        String returnStr = "Linked " + parentLoc.name + " to "+parentAndChildren.size()+" child(ren)";
        System.out.println(returnStr); // josh debug    
        return returnStr;
    }

    private void linkParentToNewChildren(Location parentLocation, Vector<CompressedLocation> andChildLocs) {
        if (!parentLocation.children.equals(andChildLocs)) {
            parentLocation.linkNewChildren(andChildLocs);
            databaseConnection.updateLocationsCompressedChildren(parentLocation.makeNameTypeKey(), parentLocation.children);
        }
    }

    private void linkChildToOneParent(Location childLocation, CompressedLocation parentLoc) { // returns child
        if (!childLocation.parent.equals(parentLoc)) {
            childLocation.linkNewParent(parentLoc);
            databaseConnection.updateLocationsCompressedParent(childLocation.makeNameTypeKey(), parentLoc);
        }
    }

    // private Location linkParentToOneChild(Location parentLocation, CompressedLocation childLoc) { // return parent
    //     parentLocation.linkNewChildren(new Vector<CompressedLocation>(Arrays.asList(childLoc)));
    //     databaseConnection.updateLocationsCompressedChildren(parentLocation.makeNameTypeKey(), parentLocation.children);
    //     return parentLocation;
    // }

    public Location chartNewChildrenForParent(String parentKey) { // josh make only do moons / space stuff?
        Location tempParentLocation = databaseConnection.getLocation(parentKey);
        if (tempParentLocation.chartNewChildren() != null) {
            databaseConnection.updateLocationsCompressedChildren(parentKey, tempParentLocation.children);
        }
        return tempParentLocation;
    }

    // CHARACTER //

    public NPC generateRandomNpc() {
        NPC npc = new NPC();

        npc.setupNPC(null, null, null, null, null, null, 
            null, null, null, null, null, 
            null, null, null, null, 
            null, null, null, null, 
            null, null, null, null, 
            null, null);

        System.out.println(saveNpcToDatabase(npc));

        return npc;
    }

    public String saveNpcToDatabase(NPC npc) {
        return databaseConnection.saveNpc(npc);
    }

    public String savePcToDatabase(PlayableCharacter pc) {
        return databaseConnection.savePc(pc);
    }


    // !!!!

    public void clearDatabase() { // josh !!!!!!!! BE CAREFUL WITH THIS, IT WILL DELETE ALL DATA IN THE DATABASES, FOR TESTING ONLY
        databaseConnection.clearAllCollections();
    }
}
