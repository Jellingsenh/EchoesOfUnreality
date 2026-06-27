import { baseApiUrl } from "../../../../resources/constants";

export default function saveLocationImageInAPI(
    locationName: string,
    locationType: string,
    apiBody: FormData,
    triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
) {
    const controller10 = new AbortController(); // stops api calls from happening 2x
    const { signal } = controller10;

    async function saveImage() {
        try {
            const res = await fetch(baseApiUrl + '/addNewImage/' + locationName + '/' + locationType, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json', // multipart?
            // },
            body: apiBody,
            signal, // Attach the signal to the fetch request
            },);
            // const result = await res;
            if (res.status != 200) {
                triggerAlertBanner('Error saving ' + locationName + ' image.', 'error')
                return
            }
            // if (result.ok) {
            //     triggerAlertBanner('Successfully saved ' + locationName + ' image.', 'success')
            // }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                // console.log('Request was canceled intentionally.');
                return; // Gracefully exit
            }
            triggerAlertBanner('Error saving ' + locationName + ' image.', 'error')
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    saveImage()
}