package com.jellingsen.games.echoes_of_unreality.Components.Location.LocationDetails;

import java.util.Vector;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;
import com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums.LocationModifier;

@JsonPropertyOrder({ "culture", "history", "religion", "technology", "governemnt", "economy", "secrets", "allies", "enemies" })
public class LocationSociety {
    public String religion; // prominent religions and/or deities in the area
    public String technology; // what type of technology is available here
    public String history; // history of this location, what has changed
    public String culture; // who the people are
    public String governemnt; // how the people are goverend
    public String economy; // the way the economy is organized
    public String secrets; // secrets of nature, the government, or people
    public String allies; // allies of the government
    public String enemies; // enemies of the government (neutral are unlisted)

    public LocationSociety() {}

    public void setupLocationSociety(boolean extreme, Vector<String> anomalies, Vector<String> environments, Vector<CompressedLocation> siblings) { // COUNTRY, AREA, & CITY only
        
        if (anomalies == null) { anomalies = new Vector<String>();}

        this.religion = generateReligion(anomalies);
        this.technology = generateTechnology(anomalies, environments);
        this.history = generateHistory(); // based on religion & technology
        this.culture = generateCulture(environments); // based on environment, technology, history, and religion
        this.governemnt = generateGovernment(); // based on culture

        if (extreme) {
            // josh potential llm
            this.governemnt = "extreme " + this.governemnt;
            this.religion = "extreme " + this.religion;
            this.culture = "extreme " + this.culture;
            this.technology = "extreme " + this.technology;
        } 

        this.economy = generateEconomy(); // based on government and technology
        this.secrets = generateSecrets(); // based on history and government
        generateAlliesAndEnemies(siblings, extreme); // based on government and economy and siblings, extreme societies have more enemies
    }

    private String generateReligion(Vector<String> anomalies) {
        return "Religion: " + String.join(", ", anomalies); // josh TODO: make this more complex and less placeholder
    }

    private String generateTechnology(Vector<String> anomalies, Vector<String> environments) {
        if (environments == null) { return null;}
        return "Technology: " + String.join(", ", anomalies) + " : " + String.join(", ", environments); // josh TODO: make this more complex and less placeholder
    }

    private String generateHistory() {
        return "History: "; // josh TODO: make this more complex and less placeholder
    }

    private String generateCulture(Vector<String> environments) {
        if (environments == null) { return null;}
        return "Culture: "; // josh TODO: make this more complex and less placeholder
    }

    private String generateGovernment() {
        return "Government based on culture: "; // josh TODO: make this more complex and less placeholder
    }

    private String generateEconomy() {
        return "Economy based on government and technology: "; // josh TODO: make this more complex and less placeholder
    }

    private String generateSecrets() {
        return "Secrets based on history and government: "; // josh TODO: make this more complex and less placeholder
    }

    public String generateAlliesAndEnemies(Vector<CompressedLocation> siblings, boolean extreme) {
        if (siblings == null) { return null; }
        // any siblings with the same governemnt are allies
        return "Allies and enemies based on government and economy and siblings: "; // josh TODO: make this more complex and less placeholder
    }
}
