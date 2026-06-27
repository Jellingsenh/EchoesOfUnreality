import { baseApiUrl } from "../../../../resources/constants";

export default function GenerateLocationButton({
    closeModal2, // will be null unless modal 2 open
    parentMode, // for both
    parentNameInput, 
    setParentNameInput,
    parentTypeInput, 
    setParentTypeInput,
    setParentChartedInput,
    setPositionInputLocked,
    childType,
    childDisordered,
    addToExcludedListLocations, // for both
    removeFromExcludedListLocations, // for both
    parentType, // for child
    setCurrentChildren, // for child
}:{
    closeModal2: (() => void) | null,
    parentMode: boolean,
    parentNameInput: string | null,
    setParentNameInput: React.Dispatch<React.SetStateAction<string | null>> | null,
    parentTypeInput: string | null,
    setParentTypeInput: React.Dispatch<React.SetStateAction<string | null>> | null,
    setParentChartedInput: React.Dispatch<React.SetStateAction<boolean | null>> | null,
    setPositionInputLocked: React.Dispatch<React.SetStateAction<boolean>> | null,
    childType: string | null,
    childDisordered: boolean | null,
    addToExcludedListLocations: (name: string, type: string) => void,
    removeFromExcludedListLocations: (name: string, type: string) => void,
    parentType: string | null,
    setCurrentChildren: React.Dispatch<React.SetStateAction<{ name: string; type: string; charted: boolean; }[] | null>>  | null,
}) {
    function generateNewParent() {
        const controller4 = new AbortController(); // stop call from happenig 2x
        const { signal } = controller4;

        async function getNewlyGeneratedParent() {
            // console.log(' getting new parent...')
            // setNewParentLoading(true); // Start loading state
            try {
                const res = await fetch(baseApiUrl + '/generateNewCompressedParent/' + (childType ?? 'CONTINENT') + '/' + (childDisordered ?? false), { 
                    method: 'GET',
                    signal,
                });
                const result = await res.json();
                // console.log(' got new parent: ' + JSON.stringify(result))
                removeFromExcludedListLocations(parentNameInput ?? '', parentTypeInput ?? '')
                addToExcludedListLocations(result.name, result.type)
                setParentNameInput && setParentNameInput(result.name)
                setParentTypeInput && setParentTypeInput(result.type)
                setParentChartedInput && setParentChartedInput(false)
                setPositionInputLocked && setPositionInputLocked(false)
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    // console.log('Request was canceled intentionally.');
                    return; // Gracefully exit
                }
                console.error('Error getting location:', error);
            }
        }
        getNewlyGeneratedParent()
    }

    function generateNewChild() {
        const controller5 = new AbortController(); // stop call from happenig 2x
        const { signal } = controller5;

        async function getNewlyGeneratedChild() {
            // console.log(' getting new child...')
            // setNewParentLoading(true); // Start loading state
            try {
                const res = await fetch(baseApiUrl + '/generateNewCompressedChild/' + (parentType ?? 'CITY'), {
                    method: 'GET',
                    signal,
                });
                const result = await res.json();
                addToExcludedListLocations(result.name, result.type)

                setCurrentChildren && setCurrentChildren(prevItems => [...(prevItems || []), {
                    name: result.name,
                    type: result.type,
                    charted: false,
                }])
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    // console.log('Request was canceled intentionally.');
                    return; // Gracefully exit
                }
                console.error('Error getting location:', error);
            } 
        }
        getNewlyGeneratedChild()
    }

    return <button style={{
        minWidth: 'max-content',
        cursor: 'pointer',
    }}
    onClick={() => {
        if (parentMode) {
            generateNewParent()
        } else {
            generateNewChild()
        }
        closeModal2 && closeModal2() // if in modal 2, close modal on press
    }}>
        {'Generate'}
    </button>
}