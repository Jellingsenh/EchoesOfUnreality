package com.jellingsen.games.echoes_of_unreality.Components.Helpers;

public class StringCorrector {
    public static String makeFirstLetterUpper(String input) {
        if (input == null || input.isEmpty()) {
            return input; // Return the original string if it's null or empty
        }
        input = input.toLowerCase(); // Convert the entire string to lowercase
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }
}
