package com.jellingsen.games.echoes_of_unreality.Components.Character;

import java.util.Arrays;
import java.util.Vector;

import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Ability;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Anomaly;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Attack;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.CharacterTraitsAndTalents;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Effect;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Item;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Damage;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Form;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.MovementType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.TraitsAndTalents;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;

public class BaseCharacter extends CompressedCharacter{ 
    public int level;
    public int mass;
    public String appearance;
    public Vector<MovementType> movement;
    public int chaos; // limit = 6
    public int health;
    public int wounds = 0;
    public int bruises = 0;
    public Vector<String> defenses;
    public Vector<String> weaknesses;
    public CharacterTraitsAndTalents traitsAndTalents;
    public Vector<Attack> attacks;
    public Vector<Ability> abilities;
    public Vector<Integer> aura; // aura & auraLeft
    public Vector<Anomaly> anomalies; 
    public Vector<Effect> currentEffects;
    public String other;
    public Vector<Item> inventory;
    public Vector<Integer> actions; // 3 actions per turn. actions & actionsLeft
    public Vector<Integer> reactions; // 1 reaction per turn. reactions & reactionsLeft

    public BaseCharacter() {}

    public void setupBaseCharacter(CharacterType type, Integer level, 
        Integer mass, Vector<MovementType> movementType, 
        Integer health, Integer wounds, Integer bruises, Vector<String> weaknesses, 
        Vector<String> defenses, CharacterTraitsAndTalents traitsAndTalents, 
        Vector<Attack> attacks, Vector<Ability> abilities, Vector<Integer> aura, 
        Vector<Anomaly> anomalies, Vector<Effect> currentEffects, String other, 
        Vector<Item> inventory, Vector<Integer> actions, Vector<Integer> reactions) {

        setupCompressedCharacter(type);

        this.level = (level != null && level > 0) ? level : generateLevel();
        this.mass = (mass != null) ? mass : generateMass();
        this.movement = (movementType != null) ? movementType : generateMovementType();
        this.traitsAndTalents = (traitsAndTalents != null) ? traitsAndTalents : generateCharacterTraitsAndTalents();
        this.health = (health != null && health > 0) ? health : generateHealth();
        this.wounds = (wounds != null && wounds >= 0) ? wounds : 0;
        this.bruises = (bruises != null && bruises >= 0) ? bruises : 0;
        this.weaknesses = (weaknesses != null) ? weaknesses : generateWeaknesses();
        this.defenses = (defenses != null) ? defenses : generateDefenses();
        this.attacks = (attacks != null) ? attacks : generateAttacks();
        this.abilities = (abilities != null) ? abilities : generateAbilities();
        this.aura = (aura != null && !aura.isEmpty()) ? aura : generateAura();
        this.anomalies = (anomalies != null) ? anomalies : generateAnomalies();
        this.currentEffects = (currentEffects != null) ? currentEffects : generateCurrentEffects();
        this.other = other;
        this.inventory = (inventory != null) ? inventory : generateInventory();
        this.actions = (actions != null) ? actions : new Vector<Integer>(Arrays.asList(3,3)); // 3 actions per turn
        this.reactions = (reactions != null) ? reactions : new Vector<Integer>(Arrays.asList(1,1)); // 1 reaction per turn
        // title, species, name, and appearance will be generated at the NPC or PC level
    }

    protected int generateLevel() {
        int levelChance = Randomizer.randomIntXtoY(1, (CharacterType.PLAYER == this.type) ? 174 : 210);
        int newLevel;
        if (1 <= levelChance && levelChance <= 20) { // 20/210 = 9.524% chance
            newLevel = 1;
        } else if (21 <=levelChance && levelChance <= 39) { // 19/210 = 9.048% chance
            newLevel = 2;
        } else if (40 <= levelChance && levelChance <= 57) { // 18/210 = 8.571% chance
            newLevel = 3;
        } else if (58 <= levelChance && levelChance <= 74) { // 17/210 = 8.095% chance
            newLevel = 4;
        } else if (75 <= levelChance && levelChance <= 90) { // 16/210 = 7.619% chance
            newLevel = 5;
        } else if (91 <= levelChance && levelChance <= 105) { // 15/210 = 7.143% chance
            newLevel = 6;
        } else if (106 <= levelChance && levelChance <= 119) { // 14/210 = 6.667% chance
            newLevel = 7;
        } else if (120 <= levelChance && levelChance <= 132) { // 13/210 = 6.19% chance
            newLevel = 8;
        } else if (133 <= levelChance && levelChance <= 144) { // 12/210 = 5.714% chance
            newLevel = 9;
        } else if (145 <= levelChance && levelChance <= 155) { // 11/210 = 5.238% chance
            newLevel = 10;
        } else if (156 <= levelChance && levelChance <= 165) { // 10/210 = 4.762% chance
            newLevel = 11;
        } else if (166 <= levelChance && levelChance <= 174) { // 9/210 = 4.286% chance
            newLevel = 12;
        } else if (175 <= levelChance && levelChance <= 182) { // 8/210 = 3.81% chance
            newLevel = 13;
        } else if (183 <= levelChance && levelChance <= 189) { // 7/210 = 3.333% chance
            newLevel = 14;
        } else if (190 <= levelChance && levelChance <= 195) { // 6/210 = 2.857% chance
            newLevel = 15;
        } else if (196 <= levelChance && levelChance <= 200) { // 5/210 = 2.381% chance
            newLevel = 16;
        } else if (201 <= levelChance && levelChance <= 204) { // 4/210 = 1.905% chance
            newLevel = 17;
        } else if (205 <= levelChance && levelChance <= 207) { // 3/210 = 1.429% chance
            newLevel = 18;
        } else if (208 <= levelChance && levelChance <= 209) { // 2/210 = 0.952% chance
            newLevel = 19;
        } else if (210 == levelChance) { // 1/210 = 0.476% chance
            newLevel = 20;
        } else {
            newLevel = 1; // default to level 1 if something goes wrong with randomization
        }
        return newLevel;
    }

    protected int generateMass() {
        return 2;
        // josh todo
    }

    protected Vector<MovementType> generateMovementType() {
        return new Vector<MovementType>(Arrays.asList(MovementType.WALKING));
        // josh todo
    }

    private CharacterTraitsAndTalents generateCharacterTraitsAndTalents() {
        CharacterTraitsAndTalents newTraitsAndTalents = new CharacterTraitsAndTalents();

        newTraitsAndTalents.setupCharacterTraitsAndTalents(null, null, null, null, null);
        populateRanks();
        return newTraitsAndTalents;
    }

    private void populateRanks() { // returns numRanks so I dont't have to re-calculate numRanks for health
        int numRanks = this.level*4 + Randomizer.randomIntXtoY(2, 10); // 4 ranks per level, plus bonus ranks
        int ranksCountdown = numRanks;

        while (ranksCountdown > 0) {
            int ranksToAdd = Math.min(Randomizer.randomIntXtoY(1, 3), ranksCountdown); // up to 3 ranks at a time

            int trait = Randomizer.randomIntXtoY(1, 13);
            int talent = Randomizer.randomIntXtoY(0, 3);

            switch (trait) {
                case 1,2,3,4:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.physicality.talents.get(talent).rankUp(); } // 4/13 = 30.769% chance
                break;
                case 5,6,7,8:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.agility.talents.get(talent).rankUp(); } // 4/13 = 30.769% chance
                break;
                case 9,10:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.rationality.talents.get(talent).rankUp(); } // 2/13 = 15.385% chance
                break;
                case 11,12:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.personality.talents.get(talent).rankUp(); } // 2/13 = 15.385% chance
                break;
                case 13:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.unreality.talents.get(talent).rankUp(); } // 1/13 = 7.692% chance
                default:
                    for (int i = 0; i < ranksToAdd; i++) { this.traitsAndTalents.physicality.talents.get(talent).rankUp(); }
                break;
            }

            ranksCountdown -= ranksToAdd;
        }

        this.traitsAndTalents.physicality.calculateTraitRankFromChildren();
        this.traitsAndTalents.agility.calculateTraitRankFromChildren();
        this.traitsAndTalents.rationality.calculateTraitRankFromChildren();
        this.traitsAndTalents.personality.calculateTraitRankFromChildren();
        this.traitsAndTalents.unreality.calculateTraitRankFromChildren();
        return;
    }
    
    private int generateHealth() {
        return this.level + this.traitsAndTalents.physicality.traitDetails.determineRankNumber() + this.traitsAndTalents.agility.traitDetails.determineRankNumber() + this.traitsAndTalents.rationality.traitDetails.determineRankNumber() + this.traitsAndTalents.personality.traitDetails.determineRankNumber() + this.traitsAndTalents.unreality.traitDetails.determineRankNumber();
    }

    private Vector<String> generateWeaknesses() {
        Vector<String> newWeaknesses = new Vector<String>();
        // choose a random damage type & maybe also a material
        Damage damageType = Damage.values()[Randomizer.randomIntXtoY(0, Damage.values().length - 1)]; 
            // josh todo: multiple weaknesses & materials!
        newWeaknesses.add(damageType.toString());
        return newWeaknesses;
    }

    private Vector<String> generateDefenses() {
        Vector<String> newDefenses = new Vector<String>();
        // choose a damage type & protection level
        int damageTypeIndex;
        if (Math.random() < 0.8) { // 80% physiacl protection
            damageTypeIndex = Randomizer.randomIntXtoY(0,2);
        } else {
            damageTypeIndex = Randomizer.randomIntXtoY(0, Damage.values().length - 1);
        }
        Damage damageType = Damage.values()[damageTypeIndex]; 

        int protectionLevel = Randomizer.randomIntXtoY(1, 36); 
        switch (protectionLevel) {
            case 29,30,31,32,33,34,35,36: // 8/36 = 22.222% chance
                protectionLevel = 1;
                break;
            case 22,23,24,25,26,27,28: // 7/36 = 19.444% chance
                protectionLevel = 2;
                break;
            case 16,17,18,19,20,21:
                protectionLevel = 3; // 6/36 = 16.667% chance
                break;
            case 11,12,13,14,15:
                protectionLevel = 4; // 5/36 = 13.889% chance
                break;
            case 7,8,9,10:
                protectionLevel = 5; // 4/36 = 11.111% chance
                break;
            case 4,5,6:
                protectionLevel = 6; // 3/36 = 8.333% chance
                break;
            case 2,3:
                protectionLevel = 7; // 2/36 = 5.556% chance
                break;
            case 1:
                protectionLevel = 8; // 1/36 = 2.778% chance
                break; 
            default:
                protectionLevel = 1; 
                break;
        }
        newDefenses.add(damageType.toString() + " protection " + protectionLevel);
        // josh todo add multiuple
        return newDefenses;
    }

    private Vector<Attack> generateAttacks() {
        return new Vector<Attack>(Arrays.asList(generateAttack("Hammer", TraitsAndTalents.BRAWL, "1d4 crushing damage", "A powerful melee attack.")));

        // josh todo make multiple
    }

    private Attack generateAttack(String name, TraitsAndTalents talentName, String damage, String effect) {
        Attack attack = new Attack();
        attack.name = name;
        attack.talentName = talentName;
        attack.attackRoll = "Roll " + getDiceForTalent(talentName) + " to " + talentName.toString();
        attack.damage = damage;
        attack.effect = effect; // josh todo randomize

        return attack;
    }

    private String getDiceForTalent(TraitsAndTalents talentName) {
        switch (talentName) {
            case BRAWL:
                return this.traitsAndTalents.physicality.talents.get(0).determineDice(); 
            case FORCE:
                return this.traitsAndTalents.physicality.talents.get(1).determineDice();
            case ENDURE:
                return this.traitsAndTalents.physicality.talents.get(2).determineDice();
            case TRAVERSE:
                return this.traitsAndTalents.physicality.talents.get(3).determineDice();
            case AIM:
                return this.traitsAndTalents.agility.talents.get(0).determineDice();
            case STEER:
                return this.traitsAndTalents.agility.talents.get(1).determineDice();
            case SNEAK:
                return this.traitsAndTalents.agility.talents.get(2).determineDice();
            case TWIST:
                return this.traitsAndTalents.agility.talents.get(3).determineDice();
            case SENSE:
                return this.traitsAndTalents.rationality.talents.get(0).determineDice();
            case INTUIT:
                return this.traitsAndTalents.rationality.talents.get(1).determineDice();
            case UNDERSTAND:
                return this.traitsAndTalents.rationality.talents.get(2).determineDice();
            case ENGINEER:
                return this.traitsAndTalents.rationality.talents.get(3).determineDice();
            case CHARM:
                return this.traitsAndTalents.personality.talents.get(0).determineDice();
            case MISLEAD:
                return this.traitsAndTalents.personality.talents.get(1).determineDice();
            case COMMAND:
                return this.traitsAndTalents.personality.talents.get(2).determineDice();
            case TAME:
                return this.traitsAndTalents.personality.talents.get(3).determineDice();
            case IMAGINE:
                return this.traitsAndTalents.unreality.talents.get(0).determineDice();
            case ATTUNE:
                return this.traitsAndTalents.unreality.talents.get(1).determineDice();
            case ALTER:
                return this.traitsAndTalents.unreality.talents.get(2).determineDice();
            case REGENERATE:
                return this.traitsAndTalents.unreality.talents.get(3).determineDice();
            case PHYSICALITY:
                return this.traitsAndTalents.physicality.traitDetails.determineDice();
            case AGILITY:
                return this.traitsAndTalents.agility.traitDetails.determineDice();
            case RATIONALITY:
                return this.traitsAndTalents.rationality.traitDetails.determineDice();
            case PERSONALITY:
                return this.traitsAndTalents.personality.traitDetails.determineDice();
            case UNREALITY:
                return this.traitsAndTalents.unreality.traitDetails.determineDice();
            default:
                return "Unknown Talent";
        }
    }

    private Vector<Ability> generateAbilities() {
        return new Vector<Ability>(Arrays.asList(generateAbility("Guard Stance", "While active, reduces incoming damage by 2.", 3, 1, "")));
         // josh todo make multiple
    }

    private Ability generateAbility(String name, String effect, int duration, int usesLeft, String other) {
        Ability ability = new Ability();
        ability.name = name;
        ability.effect = effect;
        ability.duration = duration;
        ability.usesLeft = usesLeft;
        ability.appearance = other; // josh todo randomize

        return ability;
    }

    private Vector<Integer> generateAura() {
        int tempAura = this.traitsAndTalents.unreality.traitDetails.determineRankNumber() +1;
        return new Vector<Integer>(Arrays.asList(tempAura,tempAura)); 
    }

    private Vector<Anomaly> generateAnomalies() {
        return new Vector<Anomaly>(Arrays.asList(generateAnomaly("Temporal Distortion", Form.MANIPULATION, 1, "1 action", 2, 
                "1 zone", "1 target", 2, "Slows time for the target, reducing their actions by 1.", 
                "", "The air around the target shimmers and distorts.")));

            // josh todo make multiple
    }

    private Anomaly generateAnomaly(String name, Form form, int auraCost, String actionCost, int armsNeeded, 
        String range, String target, int duration, String effect, String overimagining, String appearance) {
        Anomaly anomaly = new Anomaly();
        anomaly.name = name;
        anomaly.form = form;
        anomaly.auraCost = auraCost;
        anomaly.actionCost = actionCost;
        anomaly.armsNeeded = armsNeeded;
        anomaly.range = range;
        anomaly.target = target;
        anomaly.duration = duration;
        anomaly.effect = effect;
        anomaly.overimagining = overimagining;
        anomaly.appearance = appearance;

        return anomaly; // josh todo randomize
    }

     private Vector<Effect> generateCurrentEffects() {
        Vector<Effect> newCurrentEffects = new Vector<Effect>();
        Effect newCurrentEffect = new Effect();
        newCurrentEffect.name = "Strongth";
        newCurrentEffect.effect = "Boosts all your attacks' damage by 1.";
        newCurrentEffect.duration = 3;
        newCurrentEffect.appearance = "The character looks visibly weaker, withered, or paler than usual.";
        
        Vector<CompressedCharacter> newCompressedEnemies = new Vector<CompressedCharacter>();
        for (int i = 0; i < Randomizer.randomIntXtoY(1, 5); i++) {
            newCompressedEnemies.add(generateTemporaryCompressedEnemy());
        }
        newCurrentEffect.charactersAffected = newCompressedEnemies; // josh this is for testing, normally would be null

        newCurrentEffects.add(newCurrentEffect);

        return newCurrentEffects; // josh todo
    }

    private CompressedCharacter generateTemporaryCompressedEnemy() {
        String name = "Enemy_" + Randomizer.randomIntXtoY(1, 100);
        return new CompressedCharacter(name, "COMPRESSED", CharacterType.ENEMY, "Human");
    }

    private Vector<Item> generateInventory() {
        Vector<Item> newInventory = new Vector<Item>();
        Item newItem = new Item();
        newItem.name = "A rusty sword";
        newItem.details = "A basic melee weapon. Deals 1d4 slashing damage.";
        newItem.unknown = false;
        newItem.weight = 1;
        newInventory.add(newItem);
        return newInventory; // josh todo make multiple and randomize 
    }
}
