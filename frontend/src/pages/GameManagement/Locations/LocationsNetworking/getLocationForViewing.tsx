import { useEffect } from "react";
import { baseApiUrl } from "../../../../resources/constants";

export default function getLocationForViewing(
    createMode: boolean,
    currentLocation: { name: string; type: string; } | null,
    setLoadingLocation: React.Dispatch<React.SetStateAction<boolean>>,
    setLoadingLocationImage: React.Dispatch<React.SetStateAction<boolean>>,
    setLocationId: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationName: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationType: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSize: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationModifier: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationAppearance: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationNatureBreathable: React.Dispatch<React.SetStateAction<boolean | null>>,
    setLocationNatureGravity: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationNatureEnvironments: React.Dispatch<React.SetStateAction<string[] | null>>,
    setLocationNatureMaterials: React.Dispatch<React.SetStateAction<string[] | null>>,
    setLocationSocietyHistory: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyReligion: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyTechnology: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyCulture: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyGovernment: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyEconomy: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietySecrets: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyAllies: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationSocietyEnemies: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationParentName: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationParentType: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationParentCharted: React.Dispatch<React.SetStateAction<boolean | null>>,
    setLocationPositionX: React.Dispatch<React.SetStateAction<number | null>>,
    setLocationPositionY: React.Dispatch<React.SetStateAction<number | null>>,
    setLocationChildren: React.Dispatch<React.SetStateAction<{name: string, type: string, charted: boolean}[] | null>>,
    setLocationAnomalies: React.Dispatch<React.SetStateAction<string[] | null>>,
    setLocationSummary: React.Dispatch<React.SetStateAction<string | null>>,
    addToExcludedListLocations: (name: string, type: string) => void,
    imageUrl: string | null,
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationImageWasPresent: React.Dispatch<React.SetStateAction<boolean>>,
   
) {
    useEffect(() => { 
        const controller3 = new AbortController(); // stop call from happenig 2x

        if (createMode) {
            setLocationId(null)
            setLocationName(null)
            setLocationType('PLACE')
            setLocationAppearance(null)
            setLocationModifier('NONE')
            setLocationSize('STANDARD')
            setLocationNatureBreathable(null)
            setLocationNatureGravity(null)
            setLocationNatureEnvironments(null)
            setLocationNatureMaterials(null)
            setLocationSocietyHistory(null)
            setLocationSocietyReligion(null)
            setLocationSocietyTechnology(null)
            setLocationSocietyCulture(null)
            setLocationSocietyGovernment(null)
            setLocationSocietyEconomy(null)
            setLocationSocietySecrets(null)
            setLocationSocietyAllies(null)
            setLocationSocietyEnemies(null)
            setLocationParentName(null)
            setLocationParentType(null)
            setLocationParentCharted(null)
            setLocationPositionX(0)
            setLocationPositionY(0)
            setLocationChildren([])
            setLocationAnomalies([])
            setLocationSummary(null)
        } else {
            const { signal } = controller3;

            async function getCurrentLocationImage()  {
                if (!currentLocation) return;
                setLoadingLocationImage(true); // Start loading state
                try {
                    const res = await fetch(baseApiUrl + '/getImage/' + currentLocation.name + '/' + currentLocation.type, {
                        method: 'GET',
                        signal,
                    });
                    // console.log('getting image...')
                    if (res.ok) {
                        const imageBlob = await res.blob()

                        const imageBlobText = await imageBlob.text()
                        // console.log('got image:', imageBlob.text())
                        if ('NOIMAGE' !== imageBlobText) {
                            setLocationImageWasPresent(true) // found image this load
                            setImageUrl(URL.createObjectURL(imageBlob))
                        }
                    } else {
                        console.error('Error getting location image')
                    }
                } catch (error: any) {
                    if (error.name === 'AbortError') {
                        // console.log('Request was canceled intentionally.');
                        return; // Gracefully exit
                    }
                    console.error('Error getting location image:', error);
                } finally {
                    setLoadingLocationImage(false); // End loading state regardless of success or failure
                }
            }

            async function getCurrentFullLocation()  {
            if (!currentLocation) return;
            setLoadingLocation(true); // Start loading state
            try {
                const res = await fetch(baseApiUrl + '/getLocation/' + currentLocation.name + '/' + currentLocation.type, {
                    method: 'GET',
                    signal,
                });
                // console.log('fetching full location with name: ' + currentLocation.name + ' & type: ' + currentLocation.type)
                const result = await res.json();
                // console.log(' got full location: ' + JSON.stringify(result))
                setLocationId(result._id)
                setLocationName(result.name)
                setLocationType(result.type)
                setLocationAppearance(result.appearance)
                setLocationModifier(result.modifier)
                setLocationSize(result.size)
                if (result.nature) {
                    setLocationNatureBreathable(result.nature.breathable)
                    setLocationNatureGravity(result.nature.gravity)
                    setLocationNatureEnvironments(result.nature.environments)
                    setLocationNatureMaterials(result.nature.materials)
                }
                if (result.society) {
                    setLocationSocietyHistory(result.society.history)
                    setLocationSocietyReligion(result.society.religion)
                    setLocationSocietyTechnology(result.society.technology)
                    setLocationSocietyCulture(result.society.culture)
                    setLocationSocietyGovernment(result.society.government)
                    setLocationSocietyEconomy(result.society.economy)
                    setLocationSocietySecrets(result.society.secrets)
                    setLocationSocietyAllies(result.society.allies)
                    setLocationSocietyEnemies(result.society.enemies)
                }
                if (result.parent) {
                    setLocationParentName(result.parent.name)
                    setLocationParentType(result.parent.type)
                    setLocationParentCharted(result.parent.charted)
                    addToExcludedListLocations(result.parent.name, result.parent.type) // exclude parent from child selection list
                }
                if (result.position) {
                    setLocationPositionX(result.position.x)
                    setLocationPositionY(result.position.y)
                }
                if (result.children) {
                    setLocationChildren(result.children)
                    for (const child of result.children) {
                        addToExcludedListLocations(child.name, child.type) // exclude children from parent selection list
                    }
                }
                setLocationAnomalies(result.anomalies)
                setLocationSummary(result.summary)

                getCurrentLocationImage() // get image as well
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    // console.log('Request was canceled intentionally.');
                    return; // Gracefully exit
                }
                console.error('Error getting location:', error);
            } finally {
                setLoadingLocation(false); // End loading state regardless of success or failure
            }
            }
            getCurrentFullLocation()
        }
        return () => {
            controller3.abort(); // stop call from happenig 2x
            if (imageUrl) URL.revokeObjectURL(imageUrl)
        };
    }, [currentLocation])
}
