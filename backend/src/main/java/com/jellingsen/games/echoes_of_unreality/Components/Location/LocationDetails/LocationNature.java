package com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.GravityLevel;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "atmosphere", "gravity", "environments", "materials" })
public class LocationNature {
    public GravityLevel gravity;
    public Vector<String> materials; // liquids, solids, gasses...
    public Boolean atmosphere; // breathable or not
    public Vector<String> environments; // hot, cold, shifting, etc

    public LocationNature() {}

    public void setupNature(LocationType type, LocationModifier modifier, LocationSize size, boolean containsContinent) { 
        this.gravity = determineGravity(type, size);
        this.materials = generateMaterials(type, containsContinent);
        this. atmosphere = determineAtmosphere(containsContinent);
        this.environments = generateEnvironments(modifier, containsContinent);
    }

    private GravityLevel determineGravity(LocationType type, LocationSize size) {
        switch (type) { // will only be for STAR, PLANET, or MOON
            case STAR -> {
                switch (size) {
                    case SMALL -> { return GravityLevel.STANDARD; }
                    case STANDARD -> { return GravityLevel.HIGH; }
                    case HUGE -> { return GravityLevel.SEVERE; }
                    case MASSIVE -> { return GravityLevel.SINGULARITY; }    
                }
            }
            case PLANET -> {
                switch (size) {
                    case SMALL -> { return GravityLevel.LOW; }
                    case STANDARD -> { return GravityLevel.STANDARD; }
                    case HUGE -> { return GravityLevel.HIGH; }
                    case MASSIVE -> { return GravityLevel.SEVERE; }
                }
            }
            case MOON -> {
                switch (size) {
                    case SMALL -> { return GravityLevel.LOW; }
                    case STANDARD, HUGE -> { return GravityLevel.STANDARD; }
                    case MASSIVE -> { return GravityLevel.HIGH; }
                }
            }
            default -> { return GravityLevel.NONE; } // should never happen
        }
        return GravityLevel.NONE; // should never happen
    }

    private Vector<String> generateMaterials(LocationType type, boolean containsContinent) {
        Vector<String> newMaterials =  new Vector<String>();
        switch (type) {
            case STAR -> {
                newMaterials.add("plasma");
                if (containsContinent) {
                    for (int i = 0; i < Randomizer.randomIntXtoY(1, 3); i++) {
                        newMaterials.add(generateRandomMaterial(newMaterials)); 
                    }
                }
            }
            case PLANET,MOON -> {
                for (int i = 0; i < Randomizer.randomIntXtoY(2, 12); i++) { 
                    newMaterials.add(generateRandomMaterial(newMaterials)); 
                }
            }
            default -> newMaterials = null; // should never happen
        }
        return newMaterials;
    }

    private String generateRandomMaterial(Vector<String> currentMaterials) { // josh expand to list using DB (add indexed number for random getting)
        String newMaterial = "rock";
        int safeCount = 0;
        while (currentMaterials.contains(newMaterial)) { // ensure no duplicates
            newMaterial = switch (Randomizer.randomIntXtoY(0, 20)) {
                case 0 -> "gravel";
                case 1 -> "sand";
                case 2 -> "ice";
                case 3 -> "water";
                case 4 -> "ammonia";
                case 5 -> "methane";
                case 6 -> "carbon dioxide";
                case 7 -> "sulfuric acid";
                case 8 -> "liquid metal";
                case 9 -> "crystal";
                case 10 -> "cloud";
                case 11 -> "plasma";
                case 12 -> "clay";
                case 13 -> "honey";
                case 14 -> "organic goo";
                case 15 -> "lava";
                case 16 -> "dirt";
                case 17 -> "dust";
                case 18 -> "milk";
                case 19 -> "metal";
                case 20 -> "wood";
                default -> "none"; // should never happen
            };
            if (safeCount++ > 1000) { break; } // safety break
        }
        return newMaterial;
    }

    private boolean determineAtmosphere(boolean containsContinent) { // josh todo fix

         // if materials.contains(dirt, etc)
         if (this.materials == null || containsContinent == false) { return false; }

         if (this.materials.contains("dirt") && this.materials.contains("water")) { return true; }

         if (this.materials.contains("organic goo") || this.materials.contains("wood") || this.materials.contains("cloud")) {
            if (!this.materials.contains("water")) { this.materials.add("water"); }
            return true;
         }
         
         return false;
    }

    private Vector<String> generateEnvironments(LocationModifier modifier, boolean containsContinent) { // josh todo
        // if on a star, the environemts will be only on the bits on non-plasma material

        String extremeString = "";
        if (LocationModifier.EXTREME.equals(modifier)) {
            extremeString = "extremely ";
        }

        // modifer can be deserted, volatile, extreme

        Vector<String> newEnvironments = new Vector<String>();

        if (this.atmosphere) {
            // if materials.contains(water, etc) then environments.add("humid", etc)
            newEnvironments.add(extremeString + "breathable");
        } else {
            // if materials.contains(rock, etc) then environments.add("barren", etc)
            if (containsContinent) {
                newEnvironments.add(extremeString + "barren");
            } else {
                newEnvironments = null; // STAR without continent
            }
        }

        return newEnvironments;
    }
}
