import { baseApiUrl } from "../../../../resources/constants"
import type { FullLocation } from "../LocationTypes/FullLocation"

export default function randomizeUnlockedFields(
    jsonBody: FullLocation,
    lockedListStr: string,
    lockedListLength: number,
    locationName: string,
    updateFieldsWithRandomizedResult: (result: any) => void,
) {
    if (lockedListLength == 12) {
        // console.log('All fields are locked. Cannot randomize.')
        return
    }

    var randomizeUrl:string = '/randomizeLocation' + lockedListStr
    var apiMethod:string = 'POST'
    var postBody:string|undefined = JSON.stringify(jsonBody)
    
    if (lockedListLength == 0) {
        // console.log('All fields are unlocked. Randomizing all fields.')
        randomizeUrl = '/generateRandomLocation'
        apiMethod = 'GET'
        postBody = undefined
    }

    const controller8 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller8;

    async function partiallyRandomizeLocation() {
        try {
            const res = await fetch(baseApiUrl + randomizeUrl, {
            method: apiMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: postBody,
            signal, // Attach the signal to the fetch request
            },);
            // console.log('Randomizing location ' + locationName + '...')
            const result = await res.json();
            if (res.ok) console.log('Successfully randomized ' + locationName)
            // update fields with result
            updateFieldsWithRandomizedResult(result)
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            console.error('Error posting data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    
    partiallyRandomizeLocation()
}
