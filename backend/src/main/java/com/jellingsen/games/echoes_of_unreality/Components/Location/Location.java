package com.jellingsen.games.echoes_of_unreality.Components.Location;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationNature;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails.LocationSociety;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSize;

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
}
