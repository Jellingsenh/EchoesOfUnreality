import { baseApiUrl, DUPLICATE, ERROR, SUCCESS, VIEW, WARNING, type bannerAlertType, type editType } from "../../../../resources/constants";
import type { FullLocation } from "../LocationTypes/FullLocation";
import saveLocationImageInAPI from "./saveLocationImageInAPI";

export default function saveLocationToAPI(
    jsonBody: FullLocation,
    locationName: string,
    imageEntry: File | null,
    setLocationId: React.Dispatch<React.SetStateAction<string | null>>,
    setEditMode: React.Dispatch<React.SetStateAction<editType>>,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerAlertBanner: (content:string, type:bannerAlertType) => void,
) {
    const controller7 = new AbortController(); // stops api calls from happening 2x
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
            if (res.status != 200) {
                triggerAlertBanner('Error saving ' + locationName + '.', ERROR)
                return
            }
            if (result._id) {
                if (DUPLICATE === result._id) { 
                    triggerAlertBanner(locationName + ' & ' + jsonBody?.type + ' is not a unique name & type.', WARNING)
                } else {
                    setLocationId(result._id) 
                    setEditMode(VIEW) 
                    setExcludedListLocations(prev => [...prev, {name: result.name, type: result.type}])
                    setRefreshOnCloseModal(true)
                    if (imageEntry) { // save image
                        const imageForm = new FormData();
                        imageForm.append('image', imageEntry) 
                        saveLocationImageInAPI(result.name, result.type, imageForm, triggerAlertBanner)
                    }
                    triggerAlertBanner('Successfully saved ' + locationName + '.', SUCCESS)
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                // console.log('Request was canceled intentionally.');
                return; // Gracefully exit
            }
            triggerAlertBanner('Error saving ' + locationName + '.', ERROR)
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    saveLocation()
}
