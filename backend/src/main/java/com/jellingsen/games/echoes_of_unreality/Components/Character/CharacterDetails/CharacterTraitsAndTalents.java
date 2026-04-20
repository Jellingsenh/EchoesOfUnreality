package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Rank;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.TraitsAndTalents;

@JsonPropertyOrder({"physicality", "agility", "rationality", "personality", "unreality"})
public class CharacterTraitsAndTalents {
    public Trait physicality;
    public Trait agility;
    public Trait rationality;
    public Trait personality;
    public Trait unreality;

     public CharacterTraitsAndTalents() {}

     public void setupCharacterTraitsAndTalents(Trait physicality, Trait agility, Trait rationality, Trait personality, Trait unreality) {
        this.physicality = (physicality != null) ? physicality : generateBlankTrait(TraitsAndTalents.PHYSICALITY);
        this.agility = (agility != null) ? agility : generateBlankTrait(TraitsAndTalents.AGILITY);
        this.rationality = (rationality != null) ? rationality : generateBlankTrait(TraitsAndTalents.RATIONALITY);
        this.personality = (personality != null) ? personality : generateBlankTrait(TraitsAndTalents.PERSONALITY);
        this.unreality = (unreality != null) ? unreality : generateBlankTrait(TraitsAndTalents.UNREALITY);
     }

     private Trait generateBlankTrait(TraitsAndTalents traitType) {
        return generateTrait(traitType, Rank.UNTRAINED, 0, false, 
            Rank.UNTRAINED, 0, false, 
            Rank.UNTRAINED, 0, false, 
            Rank.UNTRAINED, 0, false,
            Rank.UNTRAINED, 0, false);
    }

    private Trait generateTrait(TraitsAndTalents name, Rank rank, int boosts, boolean unlocked, Rank talent1Rank, int talent1Boosts, boolean talent1Unlocked, 
        Rank talent2Rank, int talent2Boosts, boolean talent2Unlocked, Rank talent3Rank, int talent3Boosts, boolean talent3Unlocked, 
        Rank talent4Rank, int talent4Boosts, boolean talent4Unlocked) {
        Trait trait = new Trait();
        trait.traitDetails = generateTalent(name, rank, boosts, unlocked);
        trait.talents = buildTalentsForTrait(name, talent1Rank, talent1Boosts, talent1Unlocked, talent2Rank, talent2Boosts, talent2Unlocked, talent3Rank, 
        talent3Boosts, talent3Unlocked, talent4Rank, talent4Boosts, talent4Unlocked);

        return trait;
    }

    private Talent generateTalent(TraitsAndTalents name, Rank rank, int boosts, boolean unlocked) {
        Talent talent = new Talent();
        talent.name = name;
        talent.rank = rank;
        talent.boosts = boosts;
        talent.unlocked = unlocked;

        return talent;
    }

    private Vector<Talent> buildTalentsForTrait(TraitsAndTalents traitName, Rank talent1Rank, int talent1Boosts, boolean talent1Unlocked, 
        Rank talent2Rank, int talent2Boosts, boolean talent2Unlocked, Rank talent3Rank, int talent3Boosts, boolean talent3Unlocked, 
        Rank talent4Rank, int talent4Boosts, boolean talent4Unlocked) {

        TraitsAndTalents talent1Name;
        TraitsAndTalents talent2Name;
        TraitsAndTalents talent3Name;
        TraitsAndTalents talent4Name;

        switch (traitName) {
            case PHYSICALITY:
                talent1Name = TraitsAndTalents.BRAWL;
                talent2Name = TraitsAndTalents.FORCE;
                talent3Name = TraitsAndTalents.ENDURE;
                talent4Name = TraitsAndTalents.TRAVERSE;
                break;
            case AGILITY:
                talent1Name = TraitsAndTalents.AIM;
                talent2Name = TraitsAndTalents.STEER;
                talent3Name = TraitsAndTalents.SNEAK;
                talent4Name = TraitsAndTalents.TWIST;
                break;
            case RATIONALITY:
                talent1Name = TraitsAndTalents.SENSE;
                talent2Name = TraitsAndTalents.INTUIT;
                talent3Name = TraitsAndTalents.UNDERSTAND;
                talent4Name = TraitsAndTalents.ENGINEER;
                break;
            case PERSONALITY:
                talent1Name = TraitsAndTalents.CHARM;
                talent2Name = TraitsAndTalents.MISLEAD;
                talent3Name = TraitsAndTalents.COMMAND;
                talent4Name = TraitsAndTalents.TAME;
                break;
            case UNREALITY:
                talent1Name = TraitsAndTalents.IMAGINE;
                talent2Name = TraitsAndTalents.ATTUNE;
                talent3Name = TraitsAndTalents.ALTER;
                talent4Name = TraitsAndTalents.REGENERATE;
                break;
            default:  
                return null;      
        }

        Vector<Talent> talents = new Vector<Talent>();
        talents.add(generateTalent(talent1Name, talent1Rank, talent1Boosts, talent1Unlocked));
        talents.add(generateTalent(talent2Name, talent2Rank, talent2Boosts, talent2Unlocked));
        talents.add(generateTalent(talent3Name, talent3Rank, talent3Boosts, talent3Unlocked));
        talents.add(generateTalent(talent4Name, talent4Rank, talent4Boosts, talent4Unlocked));

        return talents;
    }
}
