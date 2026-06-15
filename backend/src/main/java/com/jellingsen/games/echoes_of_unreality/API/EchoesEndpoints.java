package com.jellingsen.games.echoes_of_unreality.API;

import java.util.Vector;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jellingsen.games.echoes_of_unreality.API.Filters.LocationFilterOptions;
import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
import com.jellingsen.games.echoes_of_unreality.Manager.UnrealityManager;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:2012")
@RestController
@RequestMapping("/echoes")
public class EchoesEndpoints {
    private UnrealityManager unrealityManager;

    public EchoesEndpoints() {
        this.unrealityManager = new UnrealityManager();
        System.out.println("\nEchoesEndpoints listening...");
    }

    @GetMapping("/heartbeat")
    public String heartbeat() {
        return unrealityManager.getHeartbeat();
    }

    // // // LOCATION ENDPOINTS // // //

    @PostMapping("/getCompressedLocations/{offset}/{limit}")
    // {
    //     // "name": "26", // search string
    //     // "type": "PLANET", // PLACE, CITY, AREA, COUNTRY, CONTINENT, FEATURE, MOON, PLANET, STAR, SPACE, GALAXY, UNIVERSE, or DIMENSION
    //     // "breathable": "BREATHABLE", // BREATHABLE or UNBREATHABLE
    //     // "parent": {
    //     //     "name": "Random_Star_31",
    //     //     "type": "STAR" // PLACE, CITY, AREA, COUNTRY, CONTINENT, FEATURE, MOON, PLANET, STAR, SPACE, GALAXY, UNIVERSE, or DIMENSION 
    //     // },
    //     "sortBy": "TIME", // NAME, TYPE, or TIME
    //     "descending": "true"
    // }
    public Vector<CompressedLocation> getPaginatedCompressedLocations(@PathVariable int offset, @PathVariable int limit, @RequestBody(required = false) LocationFilterOptions filter) {     
        // default limit is 20, minimum is 5, maximum is 50
        // default and minimum offset is 0, no maximum
        if (offset < 0) offset = 0;
        if (limit < 5) limit = 5;
        if (limit > 50) limit = 50;
        return unrealityManager.getPaginatedCompressedLocations(offset, limit, filter);
    }

    // @GetMapping("/generateRandom/location")
	// public Location generateRandomLocation() {
    //     return unrealityManager.generateRandomLocation();
    // }

    // @GetMapping("/generateRandom/location/{type}")
    // public Location generateRandomLocationFromType(@PathVariable LocationType type) {
    //     String[] lockedType = {"type"};
    //     Location location = new Location();
    //     location.type = type;
    //     return unrealityManager.generatePartiallyRandomLocation(location, lockedType, true);
    // }

    @PostMapping("/randomizeLocation/{locked}") // name,type,appearance,summary,size,modifier,nature,society,anomalies,parent,position,children
    public Location randomizeLocation(@PathVariable String[] locked, @RequestBody Location location) {
        return unrealityManager.generatePartiallyRandomLocation(location, locked, false);
    }

    @PostMapping("/addLocation")
    public Location addNewLocation(@RequestBody Location location) { 
        return unrealityManager.saveLocationToDatabase(location); 
    }

    @PostMapping("/editLocation")
    public Location editLocation(@RequestBody Location location) { 
        return unrealityManager.editLocationInDatabase(location); // josh if exists, update by _id
    }

    @PostMapping("/deleteLocation")
    public boolean deleteLocation(@RequestBody Location location) { 
        return unrealityManager.deleteLocationFromDatabase(location);
    }

    @GetMapping("/getLocation/{name}/{type}")
    public Location getLocation(@PathVariable String name, @PathVariable LocationType type) {
        CompressedLocation loc = new CompressedLocation();
        loc.name = name;
        loc.type = type;
        return unrealityManager.getLocationFromDatabase(loc); // josh include _id
    }

    @GetMapping("/generateNewCompressedParent/{type}/{disordered}")
    public CompressedLocation generateNewCompressedParent(@PathVariable LocationType type, @PathVariable boolean disordered) {
        return unrealityManager.generateNewCompressedParent(type, disordered);
    }

    @GetMapping("/generateNewCompressedChild/{type}")
    public CompressedLocation generateNewCompressedChild(@PathVariable LocationType type) {
        return unrealityManager.generateNewCompressedChild(type);
    }

    @GetMapping("/discoverUnchartedLocation/{unchartedName}/{unchartedType}/{currentName}/{currentType}")
    public boolean discoverUnchartedLocation(@PathVariable String unchartedName, @PathVariable LocationType unchartedType, @PathVariable String currentName, @PathVariable LocationType currentType) {
        if (unchartedName.isEmpty() || currentName.isEmpty()) { return false; }
        return unrealityManager.chartUnchartedLocation(unchartedName, unchartedType, currentName, currentType);
    }

    // @PutMapping("/updateLocation/{_id}") josh
    // public String updateLocation(@PathVariable String _id, @RequestBody Location location) {
    //     if (_id == null || _id.isEmpty()) { return "Update failed: Invalid location ID";}
    //     location._id = _id;
    //     return unrealityManager.updateLocationInDatabase(location);
    // }

    // @PostMapping("/linkParentAndChildren")
    // public String linkLocations(@RequestBody Vector<CompressedLocation> parentAndChildren) {
    //     return unrealityManager.linkLocations(parentAndChildren); 
    // }

    // @GetMapping("/getRandom/location/{uncharted}")
    // public Location getRandomLocation(@PathVariable boolean uncharted) {
    //     if (uncharted) {
    //         return generateRandomLocation();
    //     }
    //     return unrealityManager.getRandomChartedLocation();
    // }

    // @GetMapping("/getRandom/location/{uncharted}/{type}")
    // public Location getRandomLocationByType(@PathVariable boolean uncharted, @PathVariable LocationType type) {
    //     if (uncharted) {
    //         return generateRandomLocationFromType(type);
    //     }
    //     return unrealityManager.getRandomChartedLocationFromType(type);
    // }

    // @PostMapping("/getRandom/sibling/{uncharted}/{name}/{type}")
    // public Location getRandomSiblingLocation(@PathVariable boolean uncharted, @PathVariable String name, @PathVariable LocationType type, @RequestBody CompressedLocation parentLoc) {
    //     CompressedLocation loc = new CompressedLocation();
    //     loc.name = name;
    //     loc.type = type;
    //     return unrealityManager.getRandomSiblingLocation(uncharted, loc, parentLoc);
    // }

    // @GetMapping("/getRandom/location/{uncharted}/{key}/sameUniverse") // josh todo BIG
    // public Location getRandomLocationSameUniverse(@PathVariable boolean uncharted, @PathVariable String key) {
    //     // generate universe if not exists! (up and down!!!!)
    //     return null;
    // }

    // josh map view get endpoints?




    // // // CHARACTER ENDPOINTS // // //

	@GetMapping("/generateRandom/npc")
	public NPC generateNpc() {
		return unrealityManager.generateRandomNpc(); 
	}
	
    @PostMapping("/add/npc")
    public String addNewNpc(@RequestBody NPC npc) { 
        return unrealityManager.saveNpcToDatabase(npc);
    }

    @GetMapping("/generateRandom/pc") // josh temporary
    public PlayableCharacter generatePc() {
        PlayableCharacter pc = new PlayableCharacter();

        pc.setupPlayableCharacter(null, null, null, null, null, null, 
            null, null, null, null, null, 
            null, null, null, null, 
            null, null, null, null, 
            null, null, null, 
            null, null, null, null,
            null, null, null, null,
            null, null, null, null, null, null, 
            null, null, null);

        return pc;
    }

    @PostMapping("/add/pc")
    public String addNewPc(@RequestBody PlayableCharacter pc) { 
        return unrealityManager.savePcToDatabase(pc);
    } 









    // CLEAR DATABASES //

    @GetMapping("/clearDatabase") // josh temporary for testing, will delete all data in the databases, BE CAREFUL WITH THIS
    public String clearDatabase() {
        unrealityManager.clearDatabase();
        return "Database cleared. Are you happy?";
    }
}
