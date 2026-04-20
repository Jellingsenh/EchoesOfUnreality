package com.jellingsen.games.echoes_of_unreality.Components.Character;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Ability;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Anomaly;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Attack;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.CharacterTraitsAndTalents;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Crew;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Effect;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Item;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Loadout;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterDetails.Stance;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.CharacterType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.MovementType;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Reputation;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Species;
import com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums.Style;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.Randomizer;
import com.jellingsen.games.echoes_of_unreality.Components.Helpers.StringCorrector;

@JsonPropertyOrder({ "name", "level", "title", "type", "species", "appearance", "might", "foresight", "mass", "movementType", "chaos", "limit",
    "health", "wounds", "bruises", "defenses", "weaknesses", "ruin", "currentEffects", "currentStance", "actionsPerTurn", "actionsLeft", "attacks", 
    "abilities", "aura", "potential", "anomalies", "wealth", "inventory", "crew", "otherStances", "traitsAndTalents", 
    "allies", "goals", "origin", "gimmick", "beliefs", "flaws", "cultures", "other", })
public class PlayableCharacter extends BaseCharacter{
    public Boolean might;
    public Boolean foresight;

    public int chaos;    
    public int limit;

    public Stance currentStance;
    public Vector<Stance> otherStances;

    public int wealth;

    public Vector<String> ruin;

    public Vector<String> allies; // Allies & safe havens
    public Vector<String> goals; // Goals & dreams
    public String origin; // Origin story
    public String gimmick; // Gimmick
    public String beliefs; // Beliefs & religion
    public String flaws; // Flaws & secrets
    public Vector<String> cultures; // Culture & languages

    public Crew crew; // Crew name, level, reputation, loadout, members

    public PlayableCharacter() {}

    public void setupPlayableCharacter(String name, String title, CharacterType type, String species, Integer level, Integer mass, 
    String appearance, Vector<MovementType> movementType, Integer health, Integer wounds, Integer bruises, Vector<String> weaknesses, 
    Vector<String> defenses, CharacterTraitsAndTalents traitsAndTalents, 
    Vector<Attack> attacks, Vector<Ability> abilities, Integer aura, Integer potential, Vector<Anomaly> anomalies, 
    Vector<Effect> currentEffects, String other, Vector<Item> inventory, Boolean might, 
    Boolean foresight, Integer chaos, Integer limit, Stance currentStance, Vector<Stance> otherStances, Integer wealth, 
    Vector<String> ruin, Vector<String> allies, Vector<String> goals, String origin, String gimmick, String beliefs, 
    String flaws, Vector<String> cultures, Crew crew) {

        setupBaseCharacter(type, level, mass, 
            movementType, health, wounds, bruises, 
            weaknesses, defenses, traitsAndTalents, 
            attacks, abilities, aura, potential, 
            anomalies, currentEffects, other, inventory);

        this.title = (title != null) ? title : generatePlayerStyleTitle();
        this.species = (species != null && !species.isEmpty()) ? species : generatePlayerSpecies();
        this.name = (name != null && !name.isEmpty()) ? name : generateCharacterName();
        this.might = (might != null) ? might : generateMight();
        this.foresight = (foresight != null) ? foresight : generateForesight();
        this.limit = (limit != null && limit > 0) ? limit : generateLimit();
        this.chaos = (chaos != null && chaos > 0) ? chaos : 0;
        this.currentStance = (currentStance != null) ? currentStance : generateCurrentStance();
        this.otherStances = (otherStances != null) ? otherStances : generateOtherStances();
        this.wealth = (wealth != null && wealth > 0) ? wealth : 0;
        this.ruin = (ruin != null) ? ruin : generateRuin();
        this.allies = (allies != null) ? allies : generateAllies();
        this.goals = (goals != null) ? goals : generateGoals();
        this.origin = (origin != null) ? origin : generateOrigin();
        this.gimmick = (gimmick != null) ? gimmick : generateGimmick();
        this.beliefs = (beliefs != null) ? beliefs : generateBeliefs();
        this.flaws = (flaws != null) ? flaws : generateFlaws();
        this.cultures = (cultures != null) ? cultures : generateCultures();
        this.crew = (crew != null) ? crew : generateCrew();
        this.appearance = (appearance != null && !appearance.isEmpty()) ? appearance : generatePlayerAppearance();
    }

    private String generatePlayerStyleTitle() {
        return StringCorrector.makeFirstLetterUpper(Style.values()[Randomizer.randomIntXtoY(0, Style.values().length - 1)].toString());
    }

    private String generatePlayerSpecies() {
        return StringCorrector.makeFirstLetterUpper(Species.values()[Randomizer.randomIntXtoY(0, 39)].toString()); // 40 player species
    }

    private Boolean generateMight() {
        return Math.random() < 0.5; // 50% chance josh todo - base might on style?
    }

    private Boolean generateForesight() {
        return Math.random() < 0.5; // 50% chance josh todo - base foresight on style?
    }

    private int generateLimit() {
        return 2; // josh todo - base limit on ranks
    }

    private Stance generateCurrentStance() {
        Stance newStance = new Stance();
        newStance.name = "A stance";
        newStance.prerequisites = "None";
        newStance.effect = "Boost your brawl roll once";
        return newStance; // josh todo
    }

    private Vector<Stance> generateOtherStances() {
        Vector<Stance> stances = new Vector<>();
        Stance newStance = new Stance();
        newStance.name = "Another stance";
        newStance.prerequisites = "None";
        newStance.effect = "Boost your shoot roll once";
        stances.add(newStance);
        return stances; // josh todo
    }

    private Vector<String> generateRuin() {
        Vector<String> newRuin = new Vector<>();
        newRuin.add("A deep wound on the arm");
        return newRuin; // josh todo
    }

    private Crew generateCrew() {
        Crew newCrew = new Crew();
        newCrew.name = "The crew";
        newCrew.level = 1;
        newCrew.reputation = Reputation.CUNNING;
        Loadout newLoadout = new Loadout();
        newLoadout.name = "A cunning loadout";
        newLoadout.crewEffect = "You can ask for info.";
        newCrew.currentLoadout = newLoadout;
        Vector<Loadout> newOtherLoadouts = new Vector<Loadout>();
        Loadout otherLoadout = new Loadout();
        otherLoadout.name = "Another cunning loadout";
        otherLoadout.crewEffect = "You can ask for even more info.";
        newOtherLoadouts.add(otherLoadout);
        newCrew.otherLoadouts = newOtherLoadouts;
        Vector<CompressedCharacter> newCompressedCrewMembers = new Vector<CompressedCharacter>();
        for (int i = 0; i < Randomizer.randomIntXtoY(1, 5); i++) {
            newCompressedCrewMembers.add(generateTemporaryCompressedCrewmate());
        }
        newCrew.crewMembers = newCompressedCrewMembers;
        return newCrew; // josh todo
    }

    private CompressedCharacter generateTemporaryCompressedCrewmate() {
        String name = "Crewmate_" + Randomizer.randomIntXtoY(1, 100);
        return new CompressedCharacter(name, "Warrior", CharacterType.ALLY, "Human"); // josh todo - generate real compressed crew members
    }

    private String generatePlayerAppearance() {
        return "A human with a silver hair."; 
        // josh todo randomize based on other stats (LLM?)
    }

    private Vector<String> generateAllies() {
        Vector<String> newAllies = new Vector<>();
        newAllies.add("An ally");
        return newAllies; // josh todo
    }

    private Vector<String> generateGoals() {
        Vector<String> newGoals = new Vector<>();
        newGoals.add("goal 1");
        return newGoals; // josh todo
    }

    private String generateOrigin() {
        return "origin"; // josh todo
    }

    private String generateGimmick() {
        return "gimmick"; // josh todo
    }

    private String generateBeliefs() {
        return "beliefs"; // josh todo
    }

    private String generateFlaws() {
        return "flaws"; // josh todo
    }

    private Vector<String> generateCultures() {
        Vector<String> newCultures = new Vector<>();
        newCultures.add("A culture");
        return newCultures; 
    }
}
