package com.jellingsen.games.echoes_of_unreality.Components.Location;
// import org.bson.codecs.pojo.annotations.BsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

@JsonPropertyOrder({ "name", "type", "charted" })
public class CompressedLocation {
    // @BsonProperty("name")
    public String name;
    // @BsonProperty("type")
    public LocationType type;
    // @BsonProperty("charted")
    public boolean charted;

    public CompressedLocation() {}
}
