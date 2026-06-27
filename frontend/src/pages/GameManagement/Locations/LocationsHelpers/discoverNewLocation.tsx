import { baseApiUrl } from "../../../../resources/constants";

export function discoverNewLocation(
    unchartedLocation: { name: string, type: string; charted: boolean },
    currentLocation: { name: string, type: string; },
    // endOfList: boolean,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
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
            if (res.status != 200) {
                triggerAlertBanner('Error discovering ' + unchartedLocation.name + '.', 'error')
                return
            }
            if (result) {
                triggerAlertBanner('Successfully discovered ' + unchartedLocation.name + '.', 'success')
                setRefreshOnCloseModal(true);
            } 
        } catch (error: any) {
            if (error.name === 'AbortError') return
            triggerAlertBanner('Error discovering ' + unchartedLocation.name + '.', 'error')
            console.error(error);
        } 
    }
    getNewlyGeneratedParent()
}
