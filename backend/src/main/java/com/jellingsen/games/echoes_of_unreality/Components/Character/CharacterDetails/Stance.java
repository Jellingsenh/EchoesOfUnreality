package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "prerequisites", "effect"})
public class Stance {
    public String name;
    public String effect;
    public String prerequisites;

    public Stance() {}
}
