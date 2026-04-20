package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CompressedCharacter;

@JsonPropertyOrder({"name", "appearance", "effect", "charactersAffected", "duration"})
public class Effect {
    public String name;
    public String effect;
    public int duration = -1; // -1 for instantaneous, -2 for limitless
    public Vector<CompressedCharacter> charactersAffected; // null = all characters involved
    public String appearance; // flavor

    public Effect() {}
}
