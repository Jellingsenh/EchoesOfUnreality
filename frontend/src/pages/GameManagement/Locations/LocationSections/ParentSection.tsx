import OutlinedDiv from "../../../../components/OutlinedDiv";
import LockInputButton from "../../../../components/LockInputButton";
import { useEffect } from "react";
import ViewDiscoverRemoveButton from "../LocationButtons/ViewDiscoverRemoveButton";
import { setFirstLetterUpperCase } from "../../../../components/helpers/TextHelpers";
import { discoverNewLocation } from "../LocationsHelpers/discoverNewLocation";
import GenerateLocationButton from "../LocationButtons/GenerateLocationButton";

export default function ParentSection({
    currentParentNameInput,
    setCurrentParentNameInput,
    currentParentTypeInput,
    setCurrentParentTypeInput,
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
    setNewParentName,
    newParentType,
    setNewParentType,
    viewMode,
    // createMode,
    selectNewLocationForViewing,
    addToExcludedListLocations,
    removeFromExcludedListLocations,
    childName,
    childType,
    childDisordered,
    // endOfList,
    setRefreshOnCloseModal,
}:{
    currentParentNameInput: string | null,
    setCurrentParentNameInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentParentTypeInput: string | null,
    setCurrentParentTypeInput: React.Dispatch<React.SetStateAction<string | null>>,
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
    setNewParentName: React.Dispatch<React.SetStateAction<string | null>>,
    newParentType: string | null,
    setNewParentType: React.Dispatch<React.SetStateAction<string | null>>,
    viewMode: boolean,
    // createMode: boolean,
    selectNewLocationForViewing: (location: { name: string; type: string; }) => void,
    addToExcludedListLocations: (name: string, type: string) => void,
    removeFromExcludedListLocations: (name: string, type: string) => void,
    childName: string | null,
    childType: string | null,
    childDisordered: boolean,
    // endOfList: boolean,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    function chooseNewParent() {
        setChooseLocationModalParentMode(true)
        resetLocationFilters()
        setChooseLocationModalHidden(false)
    }

    useEffect(() => { // called on ^ modal close
        // console.log('updating parent to: ' + newParentName + ', ' + newParentType)
        if (newParentName && newParentType) {
            removeFromExcludedListLocations(currentParentNameInput ?? '', currentParentTypeInput ?? '')

            setCurrentParentNameInput(newParentName)
            setCurrentParentTypeInput(newParentType)
            setCurrentChartedInput(true)

            addToExcludedListLocations(newParentName, newParentType)

            setPositionInputLocked(false)
        }
    }, [newParentName, newParentType])

    const anyParentPresent = ((currentParentNameInput && currentParentTypeInput) 
        || (newParentName && newParentType))

    if (viewMode && !anyParentPresent) {
        return <></> // josh need to fix spacing still
    }

    function viewParent(parent: { name: string, type: string; charted: boolean }) {
        if (!parent.charted) return // only view charted locations
        selectNewLocationForViewing({ name: parent.name, type: parent.type })
    }

    function discoverParent(parent: { name: string, type: string; charted: boolean }) {
        if (!childName || !childType) return
        const currentLoc = {
            name: childName,
            type: childType,
        }
        discoverNewLocation(parent,currentLoc, setRefreshOnCloseModal)
    }

    function removeParent() {
        // console.log('removing parent location: ' + currentParentNameInput + ', ' + currentParentTypeInput)
        removeFromExcludedListLocations(currentParentNameInput ?? '', currentParentTypeInput ?? '')
        setCurrentParentNameInput(null)
        setCurrentParentTypeInput(null)
        setNewParentName(null)
        setNewParentType(null)
        setCurrentChartedInput(null)
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {/* {newParentName} */}
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
            minWidth: 'max-content',
            // overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Parent'}
                locked={currentInputLocked || viewMode}
            >
                {anyParentPresent ? 
                    <div style={{
                        // border:'1px solid grey',
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        gap: '5px',
                        // minWidth: 'max-content',
                        // overflowX: 'auto',
                        marginBottom: '5px',
                    }}>
                        <div style={{
                            // border:'1px solid grey',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // marginLeft: '20%',
                            gap: '5px',
                            // width: '100%',
                            // overflowX: 'auto',
                        }}>
                            <div style={{
                                marginTop: '-5px',
                                marginLeft:'5px',
                                // minWidth: 'max-content',
                            }}>
                                <OutlinedDiv locked={true} 
                                    label="Name">
                                    <div style={{
                                        minWidth: 40, // keep label visible
                                        textAlign: 'center',
                                    }}>
                                        {currentParentNameInput ?? newParentName}
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
                                        minWidth: 40, // keep label visible
                                        textAlign: 'center',
                                    }}>
                                        {setFirstLetterUpperCase(currentParentTypeInput ?? newParentType ?? 'PLACE')}
                                    </div>
                                </OutlinedDiv>
                            </div>
                            <ViewDiscoverRemoveButton 
                                currentInputLocked={currentInputLocked}
                                currentInputCharted={currentChartedInput}
                                setCurrentInputCharted={setCurrentChartedInput}
                                viewThisOne={() => {viewParent({name: currentParentNameInput ?? newParentName ?? 'location', type: currentParentTypeInput ?? newParentType ?? 'PLACE', charted: currentChartedInput ?? false})}}
                                discoverThisOne={() => discoverParent({name: currentParentNameInput ?? newParentName ?? 'location', type: currentParentTypeInput ?? newParentType ?? 'PLACE', charted: currentChartedInput ?? false})}
                                removeThisOne={removeParent}
                                viewMode={viewMode}
                            />
                        </div>
                        {!viewMode && !currentInputLocked && <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '5px',
                            justifyContent: 'center',
                            // border:'1px solid red',
                            marginLeft: '10px',
                            marginTop: '5px',
                            marginBottom: '-5px',
                            // transform: 'translateX(-25%)',
                            // overflowX: 'auto',
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
                            <GenerateLocationButton 
                                closeModal2={null} // only used when in modal 2
                                parentMode={true}
                                parentNameInput={currentParentNameInput}
                                setParentNameInput={setCurrentParentNameInput}
                                parentTypeInput={currentParentTypeInput}
                                setParentTypeInput={setCurrentParentTypeInput}
                                setParentChartedInput={setCurrentChartedInput}
                                setPositionInputLocked={setPositionInputLocked}
                                childType={childType}
                                childDisordered={childDisordered}
                                addToExcludedListLocations={addToExcludedListLocations}
                                removeFromExcludedListLocations={removeFromExcludedListLocations}
                                parentType={null} // for child
                                setCurrentChildren={null} // for child
                            />
                        </div>}
                    </div> 
                : 
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        // width: '100%',
                        // overflowX: 'auto',
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
                            marginLeft: '5px',
                            minWidth: 'max-content',
                        }}
                        onClick={() => {
                            chooseNewParent()
                        }}>
                            {'Choose'}
                        </button>}
                        {!viewMode && !currentInputLocked && <GenerateLocationButton 
                            closeModal2={null} // only used when in modal 2
                            parentMode={true}
                            parentNameInput={currentParentNameInput}
                            setParentNameInput={setCurrentParentNameInput}
                            parentTypeInput={currentParentTypeInput}
                            setParentTypeInput={setCurrentParentTypeInput}
                            addToExcludedListLocations={addToExcludedListLocations}
                            removeFromExcludedListLocations={removeFromExcludedListLocations}
                            setParentChartedInput={setCurrentChartedInput}
                            setPositionInputLocked={setPositionInputLocked}
                            childType={childType}
                            childDisordered={childDisordered}
                            parentType={null} // for child
                            setCurrentChildren={null} // for child
                        />}
                    </div>
                }
            </OutlinedDiv>
        </div>
    </div>
}