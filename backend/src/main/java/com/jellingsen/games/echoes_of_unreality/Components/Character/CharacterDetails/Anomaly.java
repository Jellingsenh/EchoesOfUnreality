package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Form;

@JsonPropertyOrder({"name", "appearance", "form", "effect", 
"auraCost", "actionCost", "armsNeeded", 
"range", "target", "charactersAffected", 
"duration", "overimagining"})
public class Anomaly extends Effect {
    public Form form;
    public int auraCost; // anomaly level = aura spent when imagining
    public String actionCost;
    public int armsNeeded = 2; // 2 arms is standard fro most anomalies
    public String target; // self, touch, sight, etc
    public String range;
    public String overimagining; // anomaly level = aura spent when imagining

    public Anomaly() {}
}
