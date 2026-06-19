import { baseApiUrl } from "../../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";

export default function saveLocationToAPI(
    jsonBody: FullLocation,
    locationName: string,
    setLocationId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditMode: React.Dispatch<React.SetStateAction<'VIEW' | 'EDIT' | 'CREATE'>>,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
    const controller7 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller7;

    async function saveLocation() {
        try {
            const res = await fetch(baseApiUrl + '/addLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody),
            signal, // Attach the signal to the fetch request
            },);
            const result = await res.json();
            if (result._id) {
                console.log('Successfully saved ' + locationName)
                setLocationId(result._id) 
                setEditMode('VIEW') 
                setExcludedListLocations(prev => [...prev, {name: result.name, type: result.type}])
                setRefreshOnCloseModal(true)
            } else {
                // josh add banner for error?
                console.error('Res error posting data:', res.statusText);
            } 
        } catch (error: any) {
            if (error.name === 'AbortError') {
                // console.log('Request was canceled intentionally.');
                return; // Gracefully exit
            }
            // setEditMode('CREATE') 
            console.error('Error posting data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }

    saveLocation()
}
