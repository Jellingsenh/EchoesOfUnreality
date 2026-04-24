package com.jellingsen.games.echoes_of_unreality.API;

import java.util.Vector;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
import com.jellingsen.games.echoes_of_unreality.Manager.UnrealityManager;

@SpringBootApplication
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

    @GetMapping("/generateRandom/location")
	public Location generateRandomLocation() {
        return unrealityManager.generateRandomLocation();
    }

    @GetMapping("/generateRandom/location/{type}")
    public Location generateRandomLocationFromType(@PathVariable LocationType type) {
        String[] lockedType = {"type"};
        Location location = new Location();
        location.type = type;
        return unrealityManager.generatePartiallyRandomLocation(location, lockedType, true);
    }

    @PostMapping("/randomize/location/{locked}") // name,type,appearance,summary,size,modifier,nature,society,anomalies,parent,positionOnParent,children
    public Location randomizeLocation(@PathVariable String[] locked, @RequestBody Location location) {
        return unrealityManager.generatePartiallyRandomLocation(location, locked, false);
    }

    @PostMapping("/add/location")
    public Location addNewLocation(@RequestBody Location location) { 
        return unrealityManager.saveLocationToDatabase(location);
    }

    @GetMapping("/get/location/{key}")
    public Location getLocation(@PathVariable String key) {
        return unrealityManager.getLocationFromDatabase(key);
    }

    @PostMapping("/linkParentAndChildren")
    public String linkLocations(@RequestBody Vector<CompressedLocation> parentAndChildren) {
        return unrealityManager.linkLocations(parentAndChildren); 
    }

    @GetMapping("/getRandom/location/{uncharted}")
    public Location getRandomLocation(@PathVariable boolean uncharted) {
        if (uncharted) {
            return generateRandomLocation();
        }
        return unrealityManager.getRandomChartedLocation();
    }

    @GetMapping("/getRandom/location/{uncharted}/{type}")
    public Location getRandomLocationByType(@PathVariable boolean uncharted, @PathVariable LocationType type) {
        if (uncharted) {
            return generateRandomLocationFromType(type);
        }
        return unrealityManager.getRandomChartedLocationFromType(type);
    }

    @PostMapping("/getRandom/sibling/{uncharted}/{key}")
    public Location getRandomSiblingLocation(@PathVariable boolean uncharted, @PathVariable String key, @RequestBody CompressedLocation parentLoc) {
        return unrealityManager.getRandomSiblingLocation(uncharted, key, parentLoc);
    }

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
            null, null);

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
