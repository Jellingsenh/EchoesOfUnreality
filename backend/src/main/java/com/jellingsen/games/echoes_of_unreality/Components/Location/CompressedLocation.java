package com.jellingsen.games.echoes_of_unreality.Components.Location;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "name", "type"})
public class CompressedLocation {
    public LocationType type;
    public String name;

    public CompressedLocation() {}

    public String makeNameTypeKey() {
        if (this.name == null || this.type == null) { return null; }
        return this.name + "_" + this.type;
    }
}
