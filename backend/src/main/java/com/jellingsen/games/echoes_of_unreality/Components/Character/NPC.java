package com.jellingsen.games.echoes_of_unreality.Components.Character;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Ability;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Anomaly;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Attack;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.CharacterTraitsAndTalents;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Effect;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Item;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.MovementType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.NPCAttitude;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.NPCModifier;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Species;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.StringCorrector;

@JsonPropertyOrder({ 
    "name", 
    "level", 
    "title",  
    "type", 
    "species", 
    "appearance",

    "modifier", 
    "attitude", 
    "consciousness", 

    "health", 
    "wounds", 
    "bruises", 
    "defenses", 
    "weaknesses", 
    "currentEffects", 
    "actions", 
    "reactions",
    "attacks", 
    "abilities", 
    "aura", 
    "anomalies", 
    "chaos", 
    "limit",
    "mass", 
    "movement", 
    "inventory", 
    "traitsAndTalents", 
    "other" })
public class NPC  extends BaseCharacter {
    public NPCAttitude attitude;
    public boolean consciousness = true; // an NPC might be unintelligent, like a beast
    public NPCModifier modifier; 

    public NPC() {}

    public void setupNPC(String title, String name, CharacterType type, String appearance, Integer level, 
        Integer mass, String species, Vector<MovementType> movementType, Integer health, Integer wounds, 
        Integer bruises, Vector<String> weaknesses, Vector<String> defenses, CharacterTraitsAndTalents traitsAndTalents, 
        Vector<Attack> attacks, Vector<Ability> abilities, Vector<Integer> aura, Vector<Anomaly> anomalies, 
        Vector<Effect> currentEffects, String other, Vector<Item> inventory, NPCAttitude attitude, 
        Boolean consciousness, NPCModifier modifier, Vector<Integer> actions, Vector<Integer> reactions) {
        
        setupBaseCharacter(type, level, mass, 
            movementType, health, wounds, bruises, 
            weaknesses, defenses, traitsAndTalents, 
            attacks, abilities, aura, anomalies, 
            currentEffects, other, inventory, 
            actions, reactions);

        this.modifier = (modifier != null) ? modifier : generateModifier();
        this.attitude = (attitude != null) ? attitude : generateAttitude();
        this.consciousness = (consciousness != null) ? consciousness : generateConsciousness();
        this.species = (species != null && !species.isEmpty()) ? species : generateNPCSpecies();
        this.name = (name != null && !name.isEmpty()) ? name : generateCharacterName();
        this.title = (title != null) ? title : generateNPCTitle();
        this.appearance = (appearance != null && !appearance.isEmpty()) ? appearance : generateNPCAppearance();
    }

    private NPCModifier generateModifier() {
        int modiferIndex = Randomizer.randomIntXtoY(1, 12);
        if (modiferIndex > 6) { // 50% chance to be NONE, otherwise random modifier
            modiferIndex = 0;
        }
        return NPCModifier.values()[modiferIndex];
    }

    private NPCAttitude generateAttitude() {
        switch (this.type) {
            case ALLY -> { return NPCAttitude.FRIENDLY; }
            case ENEMY, LAIR -> { return NPCAttitude.HOSTILE; }
            default -> {
                switch (Randomizer.randomIntXtoY(1, 4)) {
                    case 1 -> { return NPCAttitude.INTERESTED; } // 25%
                    case 2,3 -> { return NPCAttitude.INDIFFERENT; } // 50%
                    default -> { return NPCAttitude.ANNOYED; } // 25%
                }
            }       
        }
    }

    private boolean generateConsciousness() { // josh todo base consciousness on species type?
        return Math.random() < 0.8; // 80% chance
    }

    protected String generateNPCSpecies() { // josh todo generTAE SPECIES based on modifier???? (hybrid)
        return StringCorrector.makeFirstLetterUpper(Species.values()[Randomizer.randomIntXtoY(0, Species.values().length - 1)].toString()); // josh todo
        // josh todo randomize species"
    }

    private String generateNPCTitle() {
        return "A Basic Guard"; // josh todo 
        // make title based on type, species, level, and modifier, anomalies, and consciousness
    }

    protected String generateNPCAppearance() { // josh pass in values
        // this.modifier == NPCModifier.NONE
        // josh modify appearance
        return "A human guard with a silver helmet & black hair. He smells like hay & grass."; 
        // josh todo randomize based on other stats (LLM?)
    }
}
