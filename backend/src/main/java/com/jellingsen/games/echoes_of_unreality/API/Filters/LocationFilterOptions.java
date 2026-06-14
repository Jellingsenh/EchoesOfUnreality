package com.jellingsen.games.echoes_of_unreality.API.Filters;

import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.AtmosphereFilter;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationSort;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationType;

public class LocationFilterOptions {
    // Filter options //
    public String name;
    public LocationType type;
    public AtmosphereFilter breathable;
    public CompressedLocation parent; // sorts by position on parent

    // Sort options //
    public LocationSort sortBy; // name, type, size (also type), position (only if parent filtered),or time (default)
    // secondary sort parameter is alphabetical by name
    
    // Sort order //
    public Boolean descending; // defaults to false

    public LocationFilterOptions() {}
}
