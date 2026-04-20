package com.jellingsen.games.echoes_of_unreality.Components.Helpers;

public class Randomizer {
    public static int randomIntXtoY(int x, int y) {
        return (int) (Math.random() * (y - x + 1)) + x;
    } 
}
