import { baseApiUrl } from "../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";
import saveLocationImageInAPI from "./saveLocationImageInAPI";

export default function editLocationInAPI(
    jsonBody: FullLocation,
    locationName: string,
    imageEntry: File | null,
    setEditMode: React.Dispatch<React.SetStateAction<'CREATE' | 'VIEW' | 'EDIT'>>,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
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
            if (res.ok) {
                if (result._id) {
                    if (result._id === 'DUPLICATE') {
                        triggerAlertBanner(locationName + ' & ' + jsonBody?.type + ' is not a unique name & type.', 'warning')
                    } else {
                        setEditMode('VIEW') 
                        setExcludedListLocations(prev => [...prev, {name: result.name, type: result.type}])
                        setRefreshOnCloseModal(true)
                        if (imageEntry) { // save image 
                            // console.log('editing complete, adding new image for', result.name, result.type)
                            const imageForm = new FormData();
                            imageForm.append('image', imageEntry) 
                            saveLocationImageInAPI(result.name, result.type, imageForm, triggerAlertBanner)
                        }
                        triggerAlertBanner('Successfully edited ' + locationName + '.', 'success')
                    }
                }
            } else {
                triggerAlertBanner('Error editing ' + locationName + '.', 'error')
                return
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            triggerAlertBanner('Error editing ' + locationName + '.', 'error')
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    editLocation()
}
