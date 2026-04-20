package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"name", "details", "weight", "unknown"})
public class Item {
    public String name;
    public String details;
    public Boolean unknown;
    public int weight; // in arms

    public Item() {}
}
