import { baseApiUrl } from "../../../../../resources/constants";

export function discoverLocation(
    unchartedLocation: { name: string, type: string; charted: boolean },
    currentLocation: { name: string, type: string; },
    endOfList: boolean,
    refreshLocations: () => void,
) {
    if (!location || !currentLocation || unchartedLocation.charted) return // only discover uncharted locations

    const controller6 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller6;

    async function getNewlyGeneratedParent() {
        try {
            const res = await fetch(baseApiUrl + '/discoverUnchartedLocation/' + 
                    unchartedLocation.name + '/' + unchartedLocation.type
                    + '/' + currentLocation.name + '/' + currentLocation.type, { 
                method: 'GET',
                signal,
            });
            const result:boolean = await res.json();
            if (result && endOfList) refreshLocations()
        } catch (error: any) {
            if (error.name === 'AbortError') { return }
            console.error('Error getting location:', error);
        } 
    }
    getNewlyGeneratedParent()
}
