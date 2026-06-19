package com.jellingsen.games.echoes_of_unreality.Components.Location.LocationEnums;

public enum LocationType {
    DIMENSION, // dimensions overlap (0th, 3rd, 4th, etc)
    UNIVERSE, // one does not simply leave their universe

    GALAXY, // most events are contained within one main galaxy
    SPACE, // empty space

    STAR, // there are lots and lots of stars in galxies, but only a few are charted

    PLANET,
    MOON,
    FEATURE, // outer space features (rings, asteroid belts, black holes, quasars, etc)

    CONTINENT,
    COUNTRY,

    AREA, // large uninhabited areas (forest, mountain range, ocean, etc)
    CITY,

    PLACE, // battlemap of a specicfic place or landmark, like a collosseum
}