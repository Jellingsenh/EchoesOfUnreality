package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.TraitsAndTalents;

@JsonPropertyOrder({"name", "talentName", "attackRoll", "damage", "effect"})
public class Attack {
    public String name;
    public TraitsAndTalents talentName;
    public String attackRoll;
    public String damage;
    public String effect; // include range and appearance
        
    public Attack() {}
}
