import OutlinedDiv from "../../../../components/helpers/OutlinedDiv";
import LockInputButton from "../../../../components/helpers/LockInputButton";
import { useEffect } from "react";
import ViewDiscoverRemoveButton from "./ViewDiscoverRemoveButton";
import { setFirstLetterUpperCase } from "../../../../components/helpers/TextHelpers";
import { baseApiUrl } from "../../../../../resources/constants";
import { discoverLocation } from "./DiscoverNewLocation";

export default function ChildrenSection({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    setCurrentInputLocked,
    setChooseLocationModalHidden,
    resetLocationFilters,
    setChooseLocationModalParentMode,
    newChildName,
    newChildType,
    viewMode,
    // createMode,
    selectNewLocationForViewing,
    addToExcludedListLocations,
    removeFromExcludedListLocations,
    parentName,
    parentType,
    endOfList,
    refreshLocations,
}:{
    currentInput: { name: string, type: string; charted: boolean }[] | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<{ name: string, type: string; charted: boolean }[] | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    setChooseLocationModalHidden: (chooseLocationModalHidden: boolean) => void,
    resetLocationFilters: () => void,
    setChooseLocationModalParentMode: (parentMode: boolean | null) => void,
    newChildName: string | null,
    newChildType: string | null,
    viewMode: boolean,
    // createMode: boolean,
    selectNewLocationForViewing: (location: { name: string; type: string; }) => void,
    addToExcludedListLocations: (name: string, type: string) => void,
    removeFromExcludedListLocations: (name: string, type: string) => void,
    parentName: string | null,
    parentType: string | null,
    endOfList: boolean,
    refreshLocations: () => void,
}) {
    function chooseNewChild() {
        setChooseLocationModalParentMode(false)
        resetLocationFilters()
        setChooseLocationModalHidden(false)
    }

    useEffect(() => { // called on ^ modal close
        if (newChildName && newChildType) {
            addToExcludedListLocations(newChildName, newChildType)

            setCurrentInput(prevItems => [...(prevItems || []), {
                name: newChildName,
                type: newChildType,
                charted: false,
            }])
        }
    }, [newChildName, newChildType])

    function viewChild(child: { name: string, type: string; charted: boolean }) {
        if (!child.charted) return // only view charted locations
        selectNewLocationForViewing({ name: child.name, type: child.type })
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
                // console.log(' got new child: ' + JSON.stringify(result))
                addToExcludedListLocations(result.name, result.type)

                setCurrentInput(prevItems => [...(prevItems || []), {
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
            // finally {
                // setNewParentLoading(false); // End loading state regardless of success or failure
            // }
        }

        getNewlyGeneratedChild()
    }

    function discoverChild(child: { name: string, type: string; charted: boolean }) {
        if (!parentName || !parentType) return
        const currentLoc = {
            name: parentName,
            type: parentType,
        }
        discoverLocation(child, currentLoc, endOfList, refreshLocations)
    }

    function removeChild(child: { name: string, type: string; charted: boolean }) {
        removeFromExcludedListLocations(child.name, child.type)
        setCurrentInput(prevItems => {
            if (!prevItems) return prevItems
            return prevItems.filter(item => item !== child)
        })
    }

    function setChildCharted(child: { name: string, type: string;} ) {
        setCurrentInput(prev => prev?.map(ch => (ch.name === child.name && ch.type === child.type) ? 
            {...ch, charted: true} : 
            ch) ?? null)
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
                // lockedVariable="children"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
            minWidth: 'max-content',
            // overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Children'}
                locked={currentInputLocked || viewMode}
            >
                <div style={{
                    // border:'1px solid grey',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    // placeItems: 'center',
                    // marginLeft: '10%',
                    // gridTemplateColumns: 'repeat(2, 50%)',
                    // gap: '5px',
                    marginLeft: '5px',
                    // marginBottom: '5px',
                    // overflowX: 'auto',
                }}>
                    {/* map children */}
                    {currentInput?.map((child, index) => (
                    <div key={index} style={{
                        // border:'1px solid grey',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        marginTop: '-5px',
                        // marginBottom: '5px',
                        width: '100%',
                        // overflowX: 'auto',
                        overflowY: 'hidden',
                    }}>
                        <div style={{
                            // marginTop: '-5px',
                            // marginLeft: '5px',
                            minWidth: 'max-content',
                        }}>
                            <OutlinedDiv locked={true} 
                                label="Name">
                                <div style={{
                                    minWidth: 40, // keep label visible
                                    textAlign: 'center',
                                }}>
                                    {child.name}
                                </div>
                            </OutlinedDiv>
                        </div>
                        <div style={{
                            // marginTop: '-5px',
                            // marginRight: '5px',
                            // paddingRight: '5px',
                        }}>
                            <OutlinedDiv locked={true} 
                                label="Type">
                                <div style={{
                                    minWidth: 40, // keep label visible
                                    textAlign: 'center',
                                }}>
                                    {setFirstLetterUpperCase(child.type)}
                                </div>
                            </OutlinedDiv>
                        </div>
                        <div style={{
                            marginLeft: '5px',
                            alignSelf: 'center',
                        }}>
                            <ViewDiscoverRemoveButton 
                                currentInputCharted={child.charted}
                                setCurrentInputCharted={() => setChildCharted(child)}
                                viewThisOne={() => viewChild(child)}
                                discoverThisOne={() => discoverChild(child)}
                                removeThisOne={() => removeChild(child)}
                                currentInputLocked={currentInputLocked}
                                viewMode={viewMode}
                            />
                        </div>
                    </div>))}
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: (currentInput && currentInput.length > 0) ? 'center' : 'left',
                    gap: '5px',
                    // overflowX: 'auto',
                    // marginTop: '5px',
                    marginLeft: '5px',
                    // marginLeft: (currentInput && currentInput.length > 0) ? '10%' : '0px',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                        // overflowX: 'auto',
                        // marginLeft: '5px',
                        marginBottom: (currentInput && currentInput.length > 0) ? '5px' : '0px',
                    }}>
                        {((currentInput && currentInput.length > 0) ? '' : 'No children found.  ')}
                    </div>
                    {!viewMode && !currentInputLocked && <div style={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: (currentInput && currentInput.length > 0) ? '10px' : '0px',
                    }}>
                        <button style={{
                            minWidth: 'max-content',
                            // overflowX: 'auto',
                            // alignSelf: 'center',
                        }}
                        onClick={() => {
                            chooseNewChild()
                        }}>
                            {'Choose'}
                        </button>
                        <button style={{
                            minWidth: 'max-content',
                            // overflowX: 'auto',
                            // alignSelf: 'center',
                        }}
                        onClick={() => {
                            generateNewChild()
                        }}>
                            {'Generate'}
                        </button>
                    </div>}
                </div>
            </OutlinedDiv>
        </div>
    </div>
}