import { baseApiUrl, ERROR, SUCCESS, type bannerAlertType } from "../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";

export default function deleteLocationInAPI(
    jsonBody: FullLocation,
    locationName: string,
    modalOnClose: (forceRefreshOnClose:boolean) => void,
    triggerAlertBanner: (content:string, type:bannerAlertType) => void,
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
            if (res.status != 200) {
                triggerAlertBanner('Error deleting ' + locationName + '.', ERROR)
                return
            }
            if (result) {
                modalOnClose(true)
                triggerAlertBanner('Successfully deleted ' + locationName + '.', SUCCESS)
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            triggerAlertBanner('Error deleting ' + locationName + '.', ERROR)
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    
    deleteLocation()
}
