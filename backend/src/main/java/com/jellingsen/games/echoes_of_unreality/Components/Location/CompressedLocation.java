package com.jellingsen.games.echoes_of_unreality.Components.Location;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "name", "type"})
public class CompressedLocation {
    public LocationType type;
    public String name;

    public CompressedLocation() {}


    public LocationType generateType() {
        int randInt = Randomizer.randomIntXtoY(1, 1000);
        if (randInt == 1) { return LocationType.DIMENSION; } // .1%
        if (randInt <= 10) { return LocationType.UNIVERSE; } // .9%
        if (randInt <= 20) { return LocationType.GALAXY; } // 1%
        if (randInt <= 50) { return LocationType.SPACE; } // 3%
        if (randInt <= 150) { return LocationType.STAR; } // 10%
        if (randInt <= 350) { return LocationType.PLANET; }// 20%
        if (randInt <= 400) { return LocationType.MOON; }// 5%
        if (randInt <= 450) { return LocationType.FEATURE; }// 5%
        if (randInt <= 500) { return LocationType.CONTINENT; } // 5%
        if (randInt <= 600) { return LocationType.COUNTRY; } // 10%
        if (randInt <= 650) { return LocationType.AREA; } // 5%
        if (randInt <= 950) { return LocationType.CITY; } // 30%
        return LocationType.PLACE; // 5%
    }

    public String generateNameFromType() {
        if (this.type == null) { return null; }
        String nameNumber = Integer.toString(Randomizer.randomIntXtoY(1, 1000) * Randomizer.randomIntXtoY(1, 1000)).substring(0, 2);

        switch (this.type) {
            case DIMENSION -> { return "Random_Dimension " + nameNumber; } // josh todo make random lists and use numbers only if conflicts
            case UNIVERSE -> { return "Random_Universe " + nameNumber; }
            case GALAXY -> { return "Random_Galaxy " + nameNumber; }
            case SPACE -> { return "Random_Space " + nameNumber; }
            case STAR -> { return "Random_Star " + nameNumber; }
            case PLANET -> { return "Random_Planet " + nameNumber; }
            case MOON -> { return "Random_Moon " + nameNumber; }
            case FEATURE -> { return "Random_Feature " + nameNumber; }
            case CONTINENT -> { return "Random_Continent " + nameNumber; }
            case COUNTRY -> { return "Random_Country " + nameNumber; }
            case AREA -> { return "Random_Area " + nameNumber; }
            case CITY -> { return "Random_City " + nameNumber; }
            case PLACE -> { return "Random_Place " + nameNumber; }
        }
        return "Unknown location"; // should never happen
    }

    public String makeNameTypeKey() {
        if (this.name == null || this.type == null) { return null; }
        return this.name + "_" + this.type;
    }
}
