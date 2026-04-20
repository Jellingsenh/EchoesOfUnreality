package com.jellingsen.games.echoes_of_unreality.Components.Character.CharacterEnums;

public enum Rank {
    UNTRAINED,  // 0 ranks: 2d6, take lowest
    NOVICE, // 1 rank: 1d6
    AMATEUR, // 2 ranks: 1d8
    APPRENTICE, // 2 ranks: 1d10
    ADEPT, // 2 ranks: 1d12
    SKILLED, // 2 ranks: 1d12 & 1d6, take highest
    SEASONED, // 2 ranks: 1d12 & 1d8, take highest
    EXPERT, // 2 ranks: 1d12 & 1d10, take highest
    MASTER // 8 ranks: 2d12, take highest
}
