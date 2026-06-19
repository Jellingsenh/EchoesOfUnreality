import { baseApiUrl } from "../../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";

export default function deleteLocationInAPI(
    jsonBody: FullLocation,
    locationName: string,
    modalOnClose: () => void,
    refreshLocations: () => void,
) {
    if (!jsonBody._id) {
        console.error('No location id found for editing. Cannot delete.')
        return
    }

    if (!confirm('Are you sure you want to delete ' + jsonBody.name + '?')) {
        return
    }

    const controller9 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller9;

    async function deleteLocation() {
        try {
            const res = await fetch(baseApiUrl + '/deleteLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody),
            signal, // Attach the signal to the fetch request
            },);
            const result = await res.json();
            if (result) {
                console.log('Successfully deleted ' + locationName)
                // setEditMode('VIEW') 
                // setRefreshOnCloseModal(true)
                modalOnClose()
                refreshLocations()
            } else {
                // josh add banner for error?
                console.error('Res error deleting data:', res.statusText);
            } 
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            // setEditMode('EDIT') 
            console.error('Error posting data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    
    deleteLocation()
}
