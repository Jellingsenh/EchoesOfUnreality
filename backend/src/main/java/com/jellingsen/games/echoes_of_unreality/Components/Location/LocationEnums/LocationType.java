package com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums;

public enum LocationType {
    DIMENSION, // dimensions overlap
    UNIVERSE, // one does not simply leave their universe

    GALAXY,
    SPACE, // same size as a galaxy in size, but empty and/or uncharted

    STAR,

    PLANET,
    MOON, // same as planet, but orbits a planet instead of a star
    FEATURE, // orbiting feature of a location, like rings, asteroid belts, black holes, etc

    CONTINENT,
    COUNTRY,
    AREA, // same size as country, but uninhabited, like a forest, mountain range, ocean, etc

    CITY,
    PLACE, // battlemap of a specicfic place, like a collosseum
}