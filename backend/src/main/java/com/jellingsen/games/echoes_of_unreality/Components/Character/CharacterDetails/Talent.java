package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Rank;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.TraitsAndTalents;

@JsonPropertyOrder({"name", "rank", "boosts", "unlocked"})
public class Talent {
    public TraitsAndTalents name;
    public Rank rank;
    public int boosts = 0; // reductions are negative boosts
    public Boolean unlocked = false; // overboosting unlocked

    public Talent() {}

    public Rank rankUp() {
        switch (this.rank) {
            case Rank.UNTRAINED:
                this.rank = Rank.NOVICE;
                break; 
            case Rank.NOVICE:
                this.rank = Rank.AMATEUR;
                break;
            case Rank.AMATEUR:
                this.rank = Rank.APPRENTICE;
                break;
            case Rank.APPRENTICE:
                this.rank = Rank.ADEPT;
                break;
            case Rank.ADEPT:
                this.rank = Rank.SKILLED;
                break;
            case Rank.SKILLED:
                this.rank = Rank.SEASONED;
                break;
            case Rank.SEASONED:
                this.rank = Rank.EXPERT;
                break;
            case Rank.EXPERT:
                this.rank = Rank.MASTER;
                break;
            case Rank.MASTER:
                this.boosts += 1; // add a boost
                break;
            default:
                break;
        }
        return this.rank;
    }

    public Rank rankDown() {
        switch (this.rank) {
            case Rank.UNTRAINED:
                this.boosts -= 1; // add a reduction
                break; 
            case Rank.NOVICE:
                this.rank = Rank.UNTRAINED;
                break;
            case Rank.AMATEUR:
                this.rank = Rank.NOVICE;
                break;
            case Rank.APPRENTICE:
                this.rank = Rank.AMATEUR;
                break;
            case Rank.ADEPT:
                this.rank = Rank.APPRENTICE;
                break;
            case Rank.SKILLED:
                this.rank = Rank.ADEPT;
                break;
            case Rank.SEASONED:
                this.rank = Rank.SKILLED;
                break;
            case Rank.EXPERT:
                this.rank = Rank.SEASONED;
                break;
            case Rank.MASTER:
                this.rank = Rank.EXPERT;
                break;
            default:
                break;
        }
        return this.rank;
    }

    public int determineRankNumber() {
        switch (this.rank) {
            case Rank.UNTRAINED:
                return 0; // 2d6, take lowest
            case Rank.NOVICE:
                return 1; // "1d6";
            case Rank.AMATEUR:
                return 2; // "1d8";
            case Rank.APPRENTICE:
                return 3; // "1d10";
            case Rank.ADEPT:
                return 4; // "1d12";
            case Rank.SKILLED:
                return 5; // "1d12 & 1d6";
            case Rank.SEASONED:
                return 6; // "1d12 & 1d8";
            case Rank.EXPERT:
                return 7; // "1d12 & 1d10";
            case Rank.MASTER:
                return 8; // "2d12";
            default:
                return 0;
        }
    }

    public Rank setRankFromNumber(int traitRankNumber) {
        switch (traitRankNumber) {
            case 0:
                this.rank = Rank.UNTRAINED;
                break; 
            case 1:
                this.rank = Rank.NOVICE;
                break;
            case 2:
                this.rank = Rank.AMATEUR;
                break;
            case 3:
                this.rank = Rank.APPRENTICE;
                break;
            case 4:
                this.rank = Rank.ADEPT;
                break;
            case 5:
                this.rank = Rank.SKILLED;
                break;
            case 6:
                this.rank = Rank.SEASONED;
                break;
            case 7:
                this.rank = Rank.EXPERT;
                break;
            case 8:
                this.rank = Rank.MASTER;
                break;
            default:
                this.rank = Rank.UNTRAINED;
        }
        return this.rank;
    }

    public String determineDice() {
        int totalDice = determineRankNumber() + this.boosts; // boosts can be negative for reductions
       
        if (!unlocked && totalDice > 8) {
            totalDice = 8; // maximum of 8 dice (Master rank)
        }

        if (totalDice <= 0) {
            return "2d6 (low)";
        } else if (totalDice == 1) {
            return "1d6";
        } else if (totalDice == 2) {
            return "1d8";
        } else if (totalDice == 3) {
            return "1d10";
        } else {
            final String d6 = "1d6";
            final String d8 = "1d8";
            final String d10 = "1d10";
            final String d12 = "d12";
            int numD12 = totalDice / 4; // each d12 counts as 4 dice
            int remainder = totalDice % 4; // remaining dice after accounting for d12s
            String diceStr = Integer.toString(numD12) + d12;
            if (remainder == 1) {
                diceStr += " & " + d6;
            } else if (remainder == 2) {
                diceStr += " & " + d8;
            } else if (remainder == 3) {
                diceStr += " & " + d10;
            }

            return diceStr;
        }
    }
}
