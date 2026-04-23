package com.jellingsen.games.echoes_of_unreality.Components.Location;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationNature;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationSociety;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "name", "type", "appearance", "summary", "size", "modifier", "nature", "society", "anomalies", "parent", "positionOnParent", "children" })
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
    public String appearance; // shape & color // josh combine with summary?
    public String summary;

    public Location() {}

    // public void setupLocation(String name, LocationType type, String summary, LocationSize size, 
    //     LocationModifier modifier, LocationNature nature, LocationSociety society,Vector<String> anomalies, 
    //     CompressedLocation parent, Vector<Integer> positionOnParent, Vector<CompressedLocation> andChildren) {

    //     this.type = (type != null) ? type : generateType();
    //     this.name = (name != null) ? name : generateNameFromType();
    //     this.modifier = (modifier != null) ? modifier : generateModifier();
    //     this.size = (size != null) ? size : generateSize();
    //     this.anomalies = (anomalies != null) ? anomalies : generateNewAnomalies();
    //     this.parent = (parent != null) ? parent : generateCompressedParent();
    //     this.positionOnParent = (positionOnParent != null) ? positionOnParent : generatePositionOnParent();
    //     this.children = generateCompressedChildren(andChildren);
    //     // this.nature = (nature != null) ? nature : generateNature(); // nature is made at the manager level (to access DB)
    //     // this.society = (society != null) ? society : generateSociety(); // society is made at the manager level (to access DB)
    //     this.summary = (summary != null) ? summary : generateSummary();
    // }

    

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
   
    // public Vector<CompressedLocation> chartNewChildren() {
    //     Vector<CompressedLocation> unchartedChildren = new Vector<CompressedLocation>();

    //     LocationType tempType;
    //     int numKids = 1;
    //     switch (this.type) {
    //         case DIMENSION -> {
    //             if (Randomizer.randomIntXtoY(1, 10) <= 9) { return null; } // 90% chance of none
    //             tempType = LocationType.UNIVERSE;
    //         }
    //         case UNIVERSE -> {
    //             if (Randomizer.randomIntXtoY(1, 2) <= 1) { return null; } // 50% chance of none
    //             tempType = LocationType.GALAXY;
    //         }
    //         case GALAXY -> {
    //             tempType = LocationType.STAR;
    //             numKids = Randomizer.randomIntXtoY(1, 4);
    //         }
    //         case SPACE -> tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.STAR : LocationType.FEATURE; // 90% star
    //         case STAR -> {
    //             tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.PLANET : LocationType.FEATURE; // 90% planet
    //             numKids = Randomizer.randomIntXtoY(1, 6);
    //         }
    //         case PLANET -> {
    //             tempType = (Randomizer.randomIntXtoY(1, 10) <= 9) ? LocationType.MOON : LocationType.FEATURE; // 90% moon
    //             numKids = Randomizer.randomIntXtoY(1, 8);
    //         }
    //         case MOON -> {
    //             if (Randomizer.randomIntXtoY(1, 2) <= 1) { return null; } // 50% chance of none
    //             tempType = LocationType.FEATURE;
    //         }
    //         default -> { return null; } // no uncharted children for smaller types
    //     }

    //     for (int i = 0; i < numKids; i++) {
    //         unchartedChildren.add(generateCompressedChild(tempType));
    //     }

    //     linkNewChildren(unchartedChildren);
    //     return this.children;
    // }

    public int getNumberForSize() {
        return switch (this.size) {
            case SMALL -> 1;
            case STANDARD -> 2;
            case HUGE -> 3;
            case MASSIVE -> 4;
        };
    }
}
