import { baseApiUrl } from "../../../../resources/constants";

export default function deleteLocationImageInDB(
    locationName: string,
    locationType: string,
    // apiBody: FormData,
    triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
) {
    const controller10 = new AbortController(); // stops api calls from happening 2x
    const { signal } = controller10;

    async function deleteImage() {
        try {
            const res = await fetch(baseApiUrl + '/deleteImage/' + locationName + '/' + locationType, {
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json', // multipart?
            // },
            // body: apiBody,
            signal, // Attach the signal to the fetch request
            },);
            // const result = await res;
            if (res.status != 200) {
                triggerAlertBanner('Error deleting ' + locationName + ' image.', 'error')
                return
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                // console.log('Request was canceled intentionally.');
                return; // Gracefully exit
            }
            triggerAlertBanner('Error deleting ' + locationName + ' image.', 'error')
            console.error(error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    deleteImage()
}
