import { baseApiUrl } from "../../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";

export default function editLocationInAPI(
    jsonBody: FullLocation,
    locationName: string,
    setEditMode: React.Dispatch<React.SetStateAction<'CREATE' | 'VIEW' | 'EDIT'>>,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
) {
    if (!jsonBody._id) {
        console.error('No location id found for editing. Cannot edit location.')
        return
    }

    const controller8 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller8;

    async function editLocation() {
        try {
            const res = await fetch(baseApiUrl + '/editLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody),
            signal, // Attach the signal to the fetch request
            },);
            const result = await res.json();
            if (result._id) {
                console.log('Successfully edited ' + locationName)
                setEditMode('VIEW') 
                setExcludedListLocations(prev => [...prev, {name: result.name, type: result.type}])
                setRefreshOnCloseModal(true)
            } else {
                // josh add banner for error?
                console.error('Res error editing data:', res.statusText);
            } 
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            // setEditMode('EDIT') 
            console.error('Error editing data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }

    editLocation()
}
