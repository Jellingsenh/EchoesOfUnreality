package com.jellingsen.games.echoes_of_unreality.Components.Character;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;

@JsonPropertyOrder({"name", "title", "type", "species"})
public class CompressedCharacter {
    public String name;
    public String title;
    public String species;
    public CharacterType type;

    public CompressedCharacter() {}

    public CompressedCharacter(String name, String title, CharacterType type, String species) { // josh temporary
        this.name = name;
        this.title = title;
        this.type = type;
        this.species = species;
    }

    protected CharacterType generateCharacterType() {
        switch (Randomizer.randomIntXtoY(1, 10)) {
            case 1,2,3,4 -> { return CharacterType.ENEMY; } // 40%
            case 5,6 -> { return CharacterType.ALLY; } // 20%
            case 7,8,9 -> { return CharacterType.NEUTRAL; } // 30%
            default -> { return CharacterType.LAIR; } // 10% 
        }
    }

    protected String generateCharacterName() { // only called from PC & NPC, name is based on species
        return "Frederick";
        // josh todo randomize name (& make m/f) based on species
    }

    public void setupCompressedCharacter(CharacterType type) { // setup only does type, then the rest are set at the PC or NPC level
        this.type = (type != null) ? type : generateCharacterType();
    }

    // public String makeNameTitleTypeSpeciesKey() {
    //     if (this.name == null || this.title == null || this.type == null || this.species == null) { return null; }
    //     return this.name + "_" + this.title + "_" + this.type + "_" + this.species.toString();
    // }
}
