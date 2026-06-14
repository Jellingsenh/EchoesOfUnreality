package com.jellingsen.games.echoes_of_unreality.API.Filters;

import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterSort;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;

public class CharacterFilterOptions {
    // Filter options //
    public String nameOrTitle; // searches both
    public CharacterType type;
    public Integer level;
    
    // Sort options //
    public CharacterSort sortBy; // name, title, level, health, type, species, aura, or time (default)
    // secondary sort parameter is alphabetical by name
    
    // Sort order //
    public Boolean descending; // defaults to false

    public CharacterFilterOptions() {}
}
