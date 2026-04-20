package com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.GravityLevel;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "appearance", "atmosphere", "gravity", "environments", "materials" })
public class LocationNature {
    public GravityLevel gravity;
    public Vector<String> materials; // liquids, solids, gasses...
    public Boolean atmosphere; // breathable or not
    public Vector<String> environments; // hot, cold, shifting, etc
    public String appearance; // shape & color

    public LocationNature() {}

    public void setupNature(LocationType type, LocationModifier modifier, LocationSize size, boolean containsContinent) { 
        this.gravity = determineGravity(type, size);
        this.materials = generateMaterials(type, containsContinent);
        this. atmosphere = determineAtmosphere(containsContinent);
        this.environments = generateEnvironments(modifier, containsContinent);
        this.appearance = generateAppearance(type);
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

        // modifer can be deserted, volatile, extreme

        Vector<String> newEnvironments = new Vector<String>();

        if (this.atmosphere) {
            // if materials.contains(water, etc) then environments.add("humid", etc)
            newEnvironments.add("breathable");
        } else {
            // if materials.contains(rock, etc) then environments.add("barren", etc)
            if (containsContinent) {
                newEnvironments.add("barren");
            } else {
                newEnvironments = null; // STAR without continent
            }
        }

        return newEnvironments;
    }

    private String generateAppearance(LocationType type) {
        // josh materials also affect appearance

        switch (type) {
            case STAR -> { return "A bright, glowing mass of plasma."; }
            case PLANET -> { return "A spherical body with a varied surface."; }
            case MOON -> { return "A smaller spherical body orbiting a planet."; }
            default -> { return "An indescribable location."; } // should never happen
        }
        
    }
}
