package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Rank;

@JsonPropertyOrder({"traitDetails", "talents"})
public class Trait {
    public Talent traitDetails; // the name & rank of this trait
    public Vector<Talent> talents;

    public Trait() {}

    public Rank calculateTraitRankFromChildren() {
        int traitRankNumber = 0;
        for (Talent talent : this.talents) {
            traitRankNumber += talent.determineRankNumber();
        }
        traitRankNumber = traitRankNumber / 4; // every 4 talent ranks is 1 trait rank

        return this.traitDetails.setRankFromNumber(traitRankNumber);
    }
}
