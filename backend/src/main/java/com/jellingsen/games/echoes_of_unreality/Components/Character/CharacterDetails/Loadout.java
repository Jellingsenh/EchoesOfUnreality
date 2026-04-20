package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "crewEffect"})
public class Loadout {
    public String name;
    public String crewEffect;

    public Loadout() {}
}
