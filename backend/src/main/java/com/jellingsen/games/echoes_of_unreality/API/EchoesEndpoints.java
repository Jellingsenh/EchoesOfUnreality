package com.jellingsen.games.echoes_of_unreality.API;

// import java.util.Vector;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jellingsen.games.echoes_of_unreality.Components.Character.NPC;
import com.jellingsen.games.echoes_of_unreality.Components.Character.PlayableCharacter;
// import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.Location;
// import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;
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

    @GetMapping("/generate/location")
	public Location generateLocation() {
        return unrealityManager.generateRandomLocation();
    }

    @PostMapping("/randomize/location/{locked}")
    public Location randomizeLocation(@PathVariable String[] locked, @RequestBody Location location) {
        return unrealityManager.generatePartiallyRandomLocation(location, locked);
    }

    @PostMapping("/add/location")
    public Location addNewLocation(@RequestBody Location location) { 
        return unrealityManager.saveLocationToDatabase(location);
    }

    @GetMapping("/get/location/{key}")
    public Location getLocation(@PathVariable String key) {
        return unrealityManager.getLocationFromDatabase(key);
    }

    // _  //

    // @PostMapping("/linkParentAndChildren")
    // public String linkLocations(@RequestBody Vector<CompressedLocation> parentAndChildren) {
    //     return unrealityManager.linkLocations(parentAndChildren);
    // }

    

    // @GetMapping("/get/location/{key}/parent")
    // public Location getParent(@PathVariable String key) {
    //     return unrealityManager.getParent(key);
    // }

    // @GetMapping("/get/location/{key}/children")
    // public Vector<Location> getChildren(@PathVariable String key) {
    //     return unrealityManager.getChildren(key);
    // }

    // @GetMapping("/get/location/{key}/siblings")
    // public Vector<Location> getSiblings(@PathVariable String key) {
    //     return unrealityManager.getSiblings(key);
    // }

    // @GetMapping("/get/location/{key}/chartNewChildren")
    // public Location chartNewChildren(@PathVariable String key) {
    //     return unrealityManager.chartNewChildrenForParent(key);
    // }

    // ^ just get 1 uncharted child?
    // get uncharted location by type? by parent? completely random?


    
    

    // // // CHARACTER ENDPOINTS // // //

	@GetMapping("/generate/npc")
	public NPC generateNpc() {
		return unrealityManager.generateRandomNpc(); 
	}
	
    @PostMapping("/add/npc")
    public String addNewNpc(@RequestBody NPC npc) { 
        return unrealityManager.saveNpcToDatabase(npc);
    }

    @GetMapping("/generate/pc") // josh temporary
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



    // !!!!!!

    @GetMapping("/clearDatabase") // josh temporary for testing, will delete all data in the databases, BE CAREFUL WITH THIS
    public String clearDatabase() {
        unrealityManager.clearDatabase();
        return "Database cleared. Are you happy?";
    }
}
