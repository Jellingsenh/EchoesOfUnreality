import OutlinedDiv from "../../../../components/OutlinedDiv";
import LockInputButton from "../../../../components/LockInputButton";
import { useEffect } from "react";
import ViewDiscoverRemoveButton from "../LocationButtons/ViewDiscoverRemoveButton";
import { setFirstLetterUpperCase } from "../../../../helpers/textHelpers";
import { discoverNewLocation } from "../LocationsHelpers/discoverNewLocation";
import GenerateLocationButton from "../LocationButtons/GenerateLocationButton";

export default function ChildrenSection({
    currentChildren,
    setCurrentChildren,
    currentInputLocked,
    setCurrentInputLocked,
    setChooseLocationModalHidden,
    resetLocationFilters,
    setChooseLocationModalParentMode,
    newChildName,
    setNewChildName,
    newChildType,
    setNewChildType,
    viewMode,
    // createMode,
    selectNewLocationForViewing,
    addToExcludedListLocations,
    removeFromExcludedListLocations,
    parentName,
    parentType,
    // endOfList,
    setRefreshOnCloseModal,
    triggerAlertBanner,
}:{
    currentChildren: { name: string, type: string; charted: boolean }[] | null,
    setCurrentChildren: React.Dispatch<React.SetStateAction<{ name: string, type: string; charted: boolean }[] | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    setChooseLocationModalHidden: (chooseLocationModalHidden: boolean) => void,
    resetLocationFilters: () => void,
    setChooseLocationModalParentMode: (parentMode: boolean | null) => void,
    newChildName: string | null,
    setNewChildName: React.Dispatch<React.SetStateAction<string | null>>,
    newChildType: string | null,
    setNewChildType: React.Dispatch<React.SetStateAction<string | null>>,
    viewMode: boolean,
    // createMode: boolean,
    selectNewLocationForViewing: (location: { name: string; type: string; }) => void,
    addToExcludedListLocations: (name: string, type: string) => void,
    removeFromExcludedListLocations: (name: string, type: string) => void,
    parentName: string | null,
    parentType: string | null,
    // endOfList: boolean,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
    triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
}) {
    function chooseNewChild() {
        setChooseLocationModalParentMode(false)
        resetLocationFilters()
        setChooseLocationModalHidden(false)
    }

    useEffect(() => { // called on ^ modal close
        // console.log('updating child to: ' + newChildName + ', ' + newChildType)
        if (newChildName && newChildType) {
            addToExcludedListLocations(newChildName, newChildType)

            setCurrentChildren(prevItems => [...(prevItems || []), {
                name: newChildName,
                type: newChildType,
                charted: true, // chosen children will always be charted
            }])
        }
    }, [newChildName, newChildType])

    const anyChildrenPresent = (currentChildren && currentChildren.length > 0)

    if (viewMode && !anyChildrenPresent) {
        return <></> // 
    }

    function viewChild(child: { name: string, type: string; charted: boolean }) {
        if (!child.charted) return // only view charted locations
        selectNewLocationForViewing({ name: child.name, type: child.type })
    }

    function discoverChild(child: { name: string, type: string; charted: boolean }) {
        if (!parentName || !parentType) return
        const currentLoc = {
            name: parentName,
            type: parentType,
        }
        discoverNewLocation(child, currentLoc, setRefreshOnCloseModal, triggerAlertBanner)
    }

    function removeChild(child: { name: string, type: string; charted: boolean }) { 
        // console.log('removing child location: ' + child.name + ', ' + child.type)
        removeFromExcludedListLocations(child.name, child.type)
        setCurrentChildren(prevItems => {
            if (!prevItems) return prevItems
            return prevItems.filter(item => item !== child)
        })
        setNewChildName(null)
        setNewChildType(null)
    }

    function setChildCharted(child: { name: string, type: string;} ) {
        // console.log('setting child charted:', child)
        setCurrentChildren(prev => prev?.map(ch => (ch.name === child.name && ch.type === child.type) ? 
            {...ch, charted: true} : 
            ch
        ) ?? null)
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {/* {newChildName} */}
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
                    {currentChildren?.map((child, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        justifyContent: 'center',
                        marginTop: '-5px',
                        width: '100%',
                        overflowY: 'hidden',
                    }}>
                        <div style={{
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
                        <OutlinedDiv locked={true} 
                            label="Type">
                            <div style={{
                                minWidth: 40, // keep label visible
                                textAlign: 'center',
                            }}>
                                {setFirstLetterUpperCase(child.type)}
                            </div>
                        </OutlinedDiv>
                        <div style={{
                            marginLeft: '5px',
                            marginBottom: '-5px',
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
                {/* NO CHILDREN SECTION & BUTTONS */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: anyChildrenPresent ? 'center' : 'left',
                    gap: '5px',
                    // overflowX: 'auto',
                    // marginTop: '5px',
                    marginLeft: '5px',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                        // overflowX: 'auto',
                        // marginLeft: '5px',
                        marginBottom: anyChildrenPresent ? '5px' : '0px',
                    }}>
                        {(anyChildrenPresent ? '' : 'No children found.  ')}
                    </div>
                    {!viewMode && !currentInputLocked && <div style={{
                        display: 'flex',
                        gap: '5px',
                        marginTop: anyChildrenPresent ? '8px' : '0px',
                        marginLeft: '5px',
                    }}>
                        <button style={{
                            minWidth: 'max-content',
                            cursor: 'pointer',
                            // overflowX: 'auto',
                            // alignSelf: 'center',
                        }}
                        onClick={() => {
                            chooseNewChild()
                        }}>
                            {'Choose'}
                        </button>
                        <GenerateLocationButton 
                            closeModal2={null} // only used when in modal 2
                            parentMode={false}
                            parentNameInput={null} // for parent
                            setParentNameInput={null} // for parent
                            parentTypeInput={null} // for parent
                            setParentTypeInput={null} // for parent
                            setParentChartedInput={null} // for parent
                            setPositionInputLocked={null} // for parent
                            childType={null} // for parent
                            childDisordered={null} // for parent
                            addToExcludedListLocations={addToExcludedListLocations}
                            removeFromExcludedListLocations={removeFromExcludedListLocations}
                            parentType={parentType}
                            setCurrentChildren={setCurrentChildren}
                        />
                    </div>}
                </div>
            </OutlinedDiv>
        </div>
    </div>
}