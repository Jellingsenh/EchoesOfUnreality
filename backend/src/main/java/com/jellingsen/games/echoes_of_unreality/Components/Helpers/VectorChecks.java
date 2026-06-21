package com.jellingsen.games.echoes_of_unreality.Components.Helpers;

import java.util.Vector;

import com.jellingsen.games.echoes_of_unreality.Components.Location.CompressedLocation;

public class VectorChecks {
    public static boolean childrenVectorContainsNameAndType(Vector<CompressedLocation> children, CompressedLocation foundChLoc) {
        if (foundChLoc == null || children == null || children.isEmpty()) return false;
        for (CompressedLocation ch: children) {
            if (ch.name.equals(foundChLoc.name) && ch.type.equals(foundChLoc.type)) {
                return true;
            }
        }
        return false;
    }
}
