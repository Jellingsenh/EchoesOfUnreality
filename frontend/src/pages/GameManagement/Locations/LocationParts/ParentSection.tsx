import OutlinedDiv from "../../../../components/helpers/OutlinedDiv";
import LockInputButton from "../../../../components/helpers/LockInputButton";
import { useEffect } from "react";
import ViewDiscoverRemoveButton from "./ViewDiscoverRemoveButton";
import { setFirstLetterUpperCase } from "../../../../components/helpers/TextHelpers";
import { baseApiUrl } from "../../../../../resources/constants";
import { discoverLocation } from "./DiscoverNewLocation";

export default function ParentSection({
    currentNameInput,
    setCurrentNameInput,
    currentTypeInput,
    setCurrentTypeInput,
    currentChartedInput,
    setCurrentChartedInput,
    currentInputLocked,
    setCurrentInputLocked,
    setPositionInputLocked,
    // chooseLocationModalHidden,
    setChooseLocationModalHidden,
    resetLocationFilters,
    setChooseLocationModalParentMode,
    newParentName,
    newParentType,
    viewMode,
    // createMode,
    selectNewLocationForViewing,
    addToExcludedListLocations,
    removeFromExcludedListLocations,
    childName,
    childType,
    childDisordered,
    endOfList,
    refreshLocations,
}:{
    currentNameInput: string | null,
    setCurrentNameInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentTypeInput: string | null,
    setCurrentTypeInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentChartedInput: boolean | null,
    setCurrentChartedInput: React.Dispatch<React.SetStateAction<boolean | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    setPositionInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    // chooseLocationModalHidden: boolean,
    setChooseLocationModalHidden: (chooseLocationModalHidden: boolean) => void,
    resetLocationFilters: () => void,
    setChooseLocationModalParentMode: (parentMode: boolean | null) => void,
    newParentName: string | null,
    newParentType: string | null,
    viewMode: boolean,
    // createMode: boolean,
    selectNewLocationForViewing: (location: { name: string; type: string; }) => void,
    addToExcludedListLocations: (name: string, type: string) => void,
    removeFromExcludedListLocations: (name: string, type: string) => void,
    childName: string | null,
    childType: string | null,
    childDisordered: boolean,
    endOfList: boolean,
    refreshLocations: () => void,
}) {
    // console.log(' current type input; ' + currentTypeInput )

    function chooseNewParent() {
        setChooseLocationModalParentMode(true)
        resetLocationFilters()
        setChooseLocationModalHidden(false)
    }

    useEffect(() => { // called on ^ modal close
        if (newParentName && newParentType) {
            removeFromExcludedListLocations(currentNameInput ?? '', currentTypeInput ?? '')

            setCurrentNameInput(newParentName)
            setCurrentTypeInput(newParentType)
            setCurrentChartedInput(true)

            addToExcludedListLocations(newParentName, newParentType)

            setPositionInputLocked(false)
        }
    }, [newParentName, newParentType])

    function viewParent(parent: { name: string, type: string; charted: boolean }) {
        if (!parent.charted) return // only view charted locations
        selectNewLocationForViewing({ name: parent.name, type: parent.type })
    }

    function generateNewParent() {
        const controller4 = new AbortController(); // stop call from happenig 2x
        const { signal } = controller4;

        async function getNewlyGeneratedParent() {
            // console.log(' getting new parent...')
            // setNewParentLoading(true); // Start loading state
            try {
                const res = await fetch(baseApiUrl + '/generateNewCompressedParent/' + (childType ?? 'CONTINENT') + '/' + (childDisordered), { 
                    method: 'GET',
                    signal,
                });
                const result = await res.json();
                // console.log(' got new parent: ' + JSON.stringify(result))

                removeFromExcludedListLocations(currentNameInput ?? '', currentTypeInput ?? '')
                addToExcludedListLocations(result.name, result.type)

                setCurrentNameInput(result.name)
                setCurrentTypeInput(result.type)
                setCurrentChartedInput(false) 

                setPositionInputLocked(false)
                
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    // console.log('Request was canceled intentionally.');
                    return; // Gracefully exit
                }
                console.error('Error getting location:', error);
            } 
            // finally {
            //     // setNewParentLoading(false); // End loading state regardless of success or failure
            // }
        }

        getNewlyGeneratedParent()
    }

    function discoverParent(parent: { name: string, type: string; charted: boolean }) {
        if (!childName || !childType) return
        const currentLoc = {
            name: childName,
            type: childType,
        }
        discoverLocation(parent,currentLoc, endOfList, refreshLocations)
    }

    function removeParent() {
        removeFromExcludedListLocations(currentNameInput ?? '', currentTypeInput ?? '')
        setCurrentNameInput(null)
        setCurrentTypeInput(null)
        setCurrentChartedInput(null)
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {!viewMode && <div style={{
            marginTop: '20px',
        }}>
            <LockInputButton 
                // lockedVariable="parent"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
            overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Parent'}
                locked={currentInputLocked || viewMode}
            >
                {(currentNameInput && currentTypeInput) ? <div style={{
                    // border:'1px solid grey',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    gap: '5px',
                    // width: '100%',
                    // overflowX: 'auto',
                    marginBottom: '5px',
                }}>
                    <div className='no-scrollbar' style={{
                        // border:'1px solid grey',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'left',
                        // marginLeft: '20%',
                        gap: '5px',
                        width: '100%',
                        overflowX: 'auto',
                    }}>
                        <div style={{
                            marginTop: '-5px',
                            marginLeft:'5px',
                            minWidth: 'max-content',
                        }}>
                            <OutlinedDiv locked={true} 
                                label="Name">
                                <div style={{
                                    paddingRight: '5px',
                                }}>
                                    {currentNameInput}
                                </div>
                            </OutlinedDiv>
                        </div>
                        <div style={{
                            marginTop: '-5px',
                            marginRight: '5px',
                        }}>
                            <OutlinedDiv locked={true} 
                                label="Type">
                                <div style={{
                                    paddingRight: '5px',
                                }}>
                                    {setFirstLetterUpperCase(currentTypeInput)}
                                </div>
                            </OutlinedDiv>
                        </div>
                        <ViewDiscoverRemoveButton 
                            currentInputLocked={currentInputLocked}
                            currentInputCharted={currentChartedInput}
                            setCurrentInputCharted={setCurrentChartedInput}
                            viewThisOne={() => {viewParent({name: currentNameInput, type: currentTypeInput, charted: currentChartedInput ?? false})}}
                            discoverThisOne={() => discoverParent({name: currentNameInput, type: currentTypeInput, charted: currentChartedInput ?? false})}
                            removeThisOne={removeParent}
                            viewMode={viewMode}
                        />
                        {/* {!currentInputLocked && 
                        <button style={{
                            alignSelf: 'center',
                        }}>
                            {currentChartedInput ? 'View' : 'Discover'}
                        </button>
                        } */}
                    </div>
                    {!viewMode && !currentInputLocked && <div className='no-scrollbar' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        justifyContent: 'left',
                        // border:'1px solid red',
                        marginLeft: '10px',
                        marginTop: '5px',
                        marginBottom: '-5px',
                        // transform: 'translateX(-25%)',
                        overflowX: 'auto',
                        width: '100%',
                    }}>
                        <button style={{
                            // alignSelf: 'center',
                            minWidth: 'max-content',
                        }} 
                        onClick={() => {
                            chooseNewParent()
                        }}>
                            {'Choose'}
                        </button>
                        <button style={{
                            // alignSelf: 'center',
                            minWidth: 'max-content',
                        }} 
                        onClick={() => {
                            generateNewParent()
                        }}>
                            {'Regenerate'}
                        </button>
                    </div>}
                </div> : 
                <div className='no-scrollbar' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    overflowX: 'auto',
                    // marginTop: '5px',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                        marginLeft: '5px',
                    }}>
                        {'No parent found.  '}
                    </div>
                    {!viewMode && !currentInputLocked && <button style={{
                        // display: 'flex',
                        // alignSelf: 'center',
                        // border:'1px solid red', 
                        // marginLeft: '10px',
                        // marginBottom: '5px',
                        minWidth: 'max-content',
                    }}
                    onClick={() => {
                        chooseNewParent()
                    }}>
                        {'Choose'}
                    </button>}
                    {!viewMode && !currentInputLocked && <button style={{
                        // display: 'flex',
                        // alignSelf: 'center',
                        // border:'1px solid red', 
                        // marginLeft: '10px',
                        // marginBottom: '5px',
                        minWidth: 'max-content',
                    }}
                    onClick={() => {
                        generateNewParent()
                    }}>
                        {'Generate'}
                    </button>}
                </div>}
            </OutlinedDiv>
        </div>
    </div>
}