package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CompressedCharacter;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Reputation;

@JsonPropertyOrder({"name", "level", "reputation", "currentLoadout", "otherLoadouts", "crewMembers"})
public class Crew {
    public String name;
    public int level;
    public Reputation reputation;
    public Loadout currentLoadout;
    public Vector<Loadout> otherLoadouts;
    public Vector<CompressedCharacter> crewMembers;

    public Crew() {}
}
