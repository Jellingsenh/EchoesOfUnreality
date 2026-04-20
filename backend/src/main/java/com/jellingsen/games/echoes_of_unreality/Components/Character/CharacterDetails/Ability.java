package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "effect", "charactersAffected", "duration", "usesLeft", "appearance"})
public class Ability  extends Effect{
    public int usesLeft = -1; // -1 for unlimited

    public Ability() {}
}
