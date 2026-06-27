import { baseApiUrl, DUPLICATE, ERROR, SUCCESS, VIEW, WARNING, type bannerAlertType, type editType } from "../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";
import saveLocationImageInAPI from "./saveLocationImageInAPI";

export default function editLocationInAPI(
    jsonBody: FullLocation,
    locationName: string,
    imageEntry: File | null,
    setEditMode: React.Dispatch<React.SetStateAction<editType>>,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerAlertBanner: (content:string, type:bannerAlertType) => void,
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
                    if (DUPLICATE === result._id) {
                        triggerAlertBanner(locationName + ' & ' + jsonBody?.type + ' is not a unique name & type.', WARNING)
                    } else {
                        setEditMode(VIEW) 
                        setExcludedListLocations(prev => [...prev, {name: result.name, type: result.type}])
                        setRefreshOnCloseModal(true)
                        if (imageEntry) { // save image 
                            // console.log('editing complete, adding new image for', result.name, result.type)
                            const imageForm = new FormData();
                            imageForm.append('image', imageEntry) 
                            saveLocationImageInAPI(result.name, result.type, imageForm, triggerAlertBanner)
                        }
                        triggerAlertBanner('Successfully edited ' + locationName + '.', SUCCESS)
                    }
                }
            } else {
                triggerAlertBanner('Error editing ' + locationName + '.', ERROR)
                return
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            triggerAlertBanner('Error editing ' + locationName + '.', ERROR)
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    editLocation()
}
