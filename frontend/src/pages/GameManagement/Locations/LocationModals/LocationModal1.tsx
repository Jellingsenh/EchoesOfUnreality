import { useState } from "react";
import LocationModal from "./LocationModal";
import ViewLocationModalContent from "./ViewLocationModalContent";
import DeleteLocationButton from "../LocationButtons/DeleteLocationButton";
import ViewInMapButton from "../LocationButtons/ViewInMapButton";
import LockUnlockAllButton from "../LocationButtons/LockUnlockAllButton";
import EditSaveButton from "../LocationButtons/EditSaveButton";
import RandomizeUnlockedButton from "../LocationButtons/RandomizeUnlockedButton";
import SetCurrentButton from "../LocationButtons/SetCurrentButton";
import type { FullLocation } from "../LocationTypes/FullLocation";
import saveLocationToAPI from "../LocationsNetworking/saveLocationToAPI";
import randomizeLocationInAPI from "../LocationsNetworking/randomizeLocationInAPI";
import deleteLocationInAPI from "../LocationsNetworking/deleteLocationInAPI";
import editLocationInAPI from "../LocationsNetworking/editLocationInAPI";


export default function LocationModal1 ({
    isMobile,
    isModalHidden,
    setModalHidden,
    editMode,
    setEditMode,
    currentCompressedLocation,
    setCurrentCompressedLocation,
    setChooseLocationModalHidden,
    setSecondaryModalParentMode,
    newParentName,
    setNewParentName,
    newParentType,
    setNewParentType,
    newChildName,
    setNewChildName,
    newChildType,
    setNewChildType,
    addToExcludedList,
    removeFromExcludedList,
    setExcludedListLocations,
    nameLocked,
    setNameLocked,
    locationType,
    setLocationType,
    typeLocked,
    setTypeLocked,
    locationParentName,
    setLocationParentName,
    locationParentType,
    setLocationParentType,
    locationParentCharted,
    setLocationParentCharted,
    positionLocked,
    setPositionLocked,
    locationChildren,
    setLocationChildren,
    refreshLocations,
    resetLocationFilters,
    refreshOnCloseModal,
    setRefreshOnCloseModal,    
}:{
    isMobile: boolean,
    isModalHidden: boolean,
    setModalHidden: React.Dispatch<React.SetStateAction<boolean>>,
    editMode: 'VIEW' | 'EDIT' | 'CREATE',
    setEditMode: React.Dispatch<React.SetStateAction<'VIEW' | 'EDIT' | 'CREATE'>>,
    currentCompressedLocation: {name: string, type: string} | null,
    setCurrentCompressedLocation: React.Dispatch<React.SetStateAction<{name: string, type: string} | null>>,
    setChooseLocationModalHidden: React.Dispatch<React.SetStateAction<boolean>>,
    setSecondaryModalParentMode: (parentMode: boolean | null) => void,
    newParentName: string | null,
    setNewParentName: React.Dispatch<React.SetStateAction<string | null>>,
    newParentType: string | null,
    setNewParentType: React.Dispatch<React.SetStateAction<string | null>>,
    newChildName: string | null,
    setNewChildName: React.Dispatch<React.SetStateAction<string | null>>,
    newChildType: string | null,
    setNewChildType: React.Dispatch<React.SetStateAction<string | null>>,
    addToExcludedList: (name: string, type: string) => void,
    removeFromExcludedList: (name: string, type: string) => void,
    setExcludedListLocations: React.Dispatch<React.SetStateAction<{name: string, type: string}[]>>,
    nameLocked: boolean,
    setNameLocked: React.Dispatch<React.SetStateAction<boolean>>,
    locationType: string | null,
    setLocationType: React.Dispatch<React.SetStateAction<string | null>>,
    typeLocked: boolean,
    setTypeLocked: React.Dispatch<React.SetStateAction<boolean>>,
    locationParentName: string | null,
    setLocationParentName: React.Dispatch<React.SetStateAction<string | null>>,
    locationParentType: string | null,
    setLocationParentType: React.Dispatch<React.SetStateAction<string | null>>,
    locationParentCharted: boolean | null,
    setLocationParentCharted: React.Dispatch<React.SetStateAction<boolean | null>>,
    positionLocked: boolean,
    setPositionLocked: React.Dispatch<React.SetStateAction<boolean>>,
    locationChildren: { name: string; type: string; charted: boolean; }[] | null,
    setLocationChildren: React.Dispatch<React.SetStateAction<{ name: string; type: string; charted: boolean; }[] | null>>,
    refreshLocations: () => void,
    resetLocationFilters: () => void,
    refreshOnCloseModal: boolean,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,

}) {
    const[locationId, setLocationId] = useState<string | null>(null)
    const [locationName, setLocationName] = useState<string | null>(null)
    const [locationAppearance, setLocationAppearance] = useState<string | null>(null)
    const [locationModifier, setLocationModifier] = useState<string | null>(null)
    const [locationSize, setLocationSize] = useState<string | null>(null)
    const [locationNatureBreathable, setLocationNatureBreathable] = useState<boolean | null>(null)
    const [locationNatureGravity, setLocationNatureGravity] = useState<string | null>(null)
    const [locationNatureEnvironments, setLocationNatureEnvironments] = useState<string[] | null>(null)
    const [locationNatureMaterials, setLocationNatureMaterials] = useState<string[] | null>(null)
    const [locationSocietyHistory, setLocationSocietyHistory] = useState<string | null>(null)
    const [locationSocietyReligion, setLocationSocietyReligion] = useState<string | null>(null)
    const [locationSocietyTechnology, setLocationSocietyTechnology] = useState<string | null>(null)
    const [locationSocietyCulture, setLocationSocietyCulture] = useState<string | null>(null)
    const [locationSocietyGovernment, setLocationSocietyGovernment] = useState<string | null>(null)
    const [locationSocietyEconomy, setLocationSocietyEconomy] = useState<string | null>(null)
    const [locationSocietySecrets, setLocationSocietySecrets] = useState<string | null>(null)
    const [locationSocietyAllies, setLocationSocietyAllies] = useState<string | null>(null)
    const [locationSocietyEnemies, setLocationSocietyEnemies] = useState<string | null>(null)
    const [locationPositionX, setLocationPositionX] = useState<number | null>(null)
    const [locationPositionY, setLocationPositionY] = useState<number | null>(null)
    const [locationAnomalies, setLocationAnomalies] = useState<string[] | null>([])
    const [locationSummary, setLocationSummary] = useState<string | null>(null)
    const [locationImage, setLocationImage] = useState<string | null>(null)
    // locked variables
    const [sizeLocked, setSizeLocked] = useState(false)
    const [modifierLocked, setModifierLocked] = useState(false)
    const [appearanceLocked, setAppearanceLocked] = useState(false)
    const [natureLocked, setNatureLocked] = useState(false)
    const [societyLocked, setSocietyLocked] = useState(false)
    const [parentLocked, setParentLocked] = useState(false)
    const [childrenLocked, setChildrenLocked] = useState(false)
    const [anomaliesLocked, setAnomaliesLocked] = useState(false)
    const [summaryLocked, setSummaryLocked] = useState(false)
    
    // HELPERS

    const jsonBody:FullLocation = {
    "_id": locationId,
    "name": locationName,
    "type": locationType,
    "size": locationSize,
    "modifier": 'NONE' === locationModifier ? null : locationModifier,
    "appearance": locationAppearance,
    "nature": {
        "breathable": locationNatureBreathable,
        "gravity": locationNatureGravity,
        "environments": locationNatureEnvironments,
        "materials": locationNatureMaterials,
    },
    "society": {
        "history": locationSocietyHistory,
        "religion": locationSocietyReligion,
        "technology": locationSocietyTechnology,
        "culture": locationSocietyCulture,
        "government": locationSocietyGovernment,
        "economy": locationSocietyEconomy,
        "secrets": locationSocietySecrets,
        "allies": locationSocietyAllies,
        "enemies": locationSocietyEnemies,
    },
    "parent": locationParentName && locationParentType ? {
        "name": locationParentName,
        "type": locationParentType
    } : null,
    "position": (locationPositionX != null && locationPositionY != null) ? [ 
        locationPositionX,locationPositionY
    ] : null,
    "children": locationChildren,
    "anomalies": locationAnomalies,
    "summary": locationSummary,
    "image": locationImage,
    }

    const modalOnClose = () => {
        // console.log('Closing modal...')
        setModalHidden(true)
        setNewParentName(null)
        setNewParentType(null)
        setNewChildName(null)
        setNewChildType(null)
        unlockAllInputs()
        resetAllModalFields()
        setExcludedListLocations([])
        if (refreshOnCloseModal) refreshLocations()
    }

    const lockedListStr:string = ('/' 
        + (nameLocked ? 'name,' : '')
        + (typeLocked ? 'type,' : '')
        + (sizeLocked ? 'size,' : '')
        + (modifierLocked ? 'modifier,' : '')
        + (appearanceLocked ? 'appearance,' : '')
        + (natureLocked ? 'nature,' : '')
        + (societyLocked ? 'society,' : '')
        + (parentLocked ? 'parent,' : '')
        + (positionLocked ? 'position,' : '')
        + (childrenLocked ? 'children,' : '')
        + (anomaliesLocked ? 'anomalies,' : '')
        + (summaryLocked ? 'summary,' : '')
    ).slice(0, -1) // remove last comma;

    const lockedListLength = ((nameLocked ? 1 : 0)
        + (typeLocked ? 1 : 0)
        + (sizeLocked ? 1 : 0)
        + (modifierLocked ? 1 : 0)
        + (appearanceLocked ? 1 : 0)
        + (natureLocked ? 1 : 0)
        + (societyLocked ? 1 : 0)
        + (parentLocked ? 1 : 0)
        + (positionLocked ? 1 : 0)
        + (childrenLocked ? 1 : 0)
        + (anomaliesLocked ? 1 : 0)
        + (summaryLocked ? 1 : 0))

    const updateFieldsWithRandomizedResult = (result: any) => {
        setLocationName(result.name ?? null)
        setLocationType(result.type ?? null)
        setLocationSize(result.size ?? null)
        setLocationModifier(result.modifier ?? 'NONE')
        setLocationAppearance(result.appearance ?? null)
        setLocationNatureBreathable(result.nature?.breathable ?? null)
        setLocationNatureGravity(result.nature?.gravity ?? null)
        setLocationNatureEnvironments(result.nature?.environments ?? null)
        setLocationNatureMaterials(result.nature?.materials ?? null)
        setLocationSocietyHistory(result.society?.history ?? null)
        setLocationSocietyReligion(result.society?.religion ?? null)
        setLocationSocietyTechnology(result.society?.technology ?? null)
        setLocationSocietyCulture(result.society?.culture ?? null)
        setLocationSocietyGovernment(result.society?.government ?? null)
        setLocationSocietyEconomy(result.society?.economy ?? null)
        setLocationSocietySecrets(result.society?.secrets ?? null)
        setLocationSocietyAllies(result.society?.allies ?? null)
        setLocationSocietyEnemies(result.society?.enemies ?? null)
        setLocationParentName(result.parent?.name ?? null)
        setLocationParentType(result.parent?.type ?? null)
        setLocationParentCharted(result.parent?.charted ?? null)
        setLocationPositionX(result.position ? result.position[0] : null)
        setLocationPositionY(result.position ? result.position[1] : null)
        setLocationChildren(result.children ?? null)
        setLocationAnomalies(result.anomalies ?? null)
        setLocationSummary(result.summary ?? null)
        setLocationImage(result.image ?? null)
    }

    function unlockAllInputs() {
        setNameLocked(false)
        setTypeLocked(false)
        setSizeLocked(false)
        setModifierLocked(false)
        setAppearanceLocked(false)
        setNatureLocked(false)
        setSocietyLocked(false)
        setParentLocked(false)
        setPositionLocked(false)
        setChildrenLocked(false)
        setAnomaliesLocked(false)
        setSummaryLocked(false)
    }

    function selectNewLocationForViewing(location: {name: string, type: string}) {
        // console.log('selected new location for viewing: ' + location.name + ', ' + location.type)
    
        setNewParentName(null)
        setNewParentType(null)
        setNewChildName(null)
        setNewChildType(null)
    
        setExcludedListLocations([location])
    
        unlockAllInputs()
        setNameLocked(true)
        setTypeLocked(true)
        // resetLocationFilters() // only reset on 2nd modal open and close
        
        // setLocationName(null)
        // setLocationId(null)
    
        setEditMode('VIEW')
    
        setCurrentCompressedLocation(location)
    }

    function allInputsUnlocked() {
        return !nameLocked 
            && !typeLocked 
            && !sizeLocked 
            && !modifierLocked 
            && !appearanceLocked 
            && !natureLocked 
            && !societyLocked 
            && !parentLocked 
            && !positionLocked 
            && !childrenLocked 
            && !anomaliesLocked 
            && !summaryLocked
    }

    function lockAllInputs() {
        setNameLocked(true)
        setTypeLocked(true)
        setSizeLocked(true)
        setModifierLocked(true)
        setAppearanceLocked(true)
        setNatureLocked(true)
        setSocietyLocked(true)
        setParentLocked(true)
        setPositionLocked(true)
        setChildrenLocked(true)
        setAnomaliesLocked(true)
        setSummaryLocked(true)
    }

    function resetAllModalFields() {
        setLocationName(null)
        setLocationType(null)
        setLocationSize(null)
        setLocationModifier('NONE')
        setLocationAppearance(null)
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
        setLocationPositionX(null)
        setLocationPositionY(null)
        setLocationChildren(null)
        setLocationAnomalies(null)
        setLocationSummary(null)
        setLocationImage(null)
    }
    
    // MODAL CONTENT

    // MODAL 1 TITLE
    const LocationModalTitle = (<div style={{
    minWidth: '200px',
    }}>
        {editMode === 'CREATE' || currentCompressedLocation === null ? 
        'Creating a new location' :  
        (editMode === 'VIEW' ? 
        'Viewing ' : 
        'Editing ') + 
        (locationName ?? 'location')}
    </div>);
    
    // MODAL 1 CONTENT
    const LocationModalContent = (<ViewLocationModalContent
        isMobile={isMobile}
        currentLocation={currentCompressedLocation} 
        viewMode={editMode === 'VIEW'}
        createMode={editMode === 'CREATE'}
        selectNewLocationForViewing={selectNewLocationForViewing}
        // editMode={editMode} 
        // setEditMode={setEditMode} 
        setChooseLocationModalHidden={setChooseLocationModalHidden}
        setSecondaryModalParentMode={setSecondaryModalParentMode}
        newParentName={newParentName}
        newParentType={newParentType}
        newChildName={newChildName}
        newChildType={newChildType}
        addToExcludedListLocations={addToExcludedList}
        removeFromExcludedListLocations={removeFromExcludedList}
        setLocationId={setLocationId}
        locationName={locationName}
        setLocationName={setLocationName}
        nameLocked={nameLocked}
        setNameLocked={setNameLocked}
        locationType={locationType}
        setLocationType={setLocationType}
        typeLocked={typeLocked}
        setTypeLocked={setTypeLocked}
        locationSize={locationSize}
        setLocationSize={setLocationSize}
        sizeLocked={sizeLocked}
        setSizeLocked={setSizeLocked}
        locationModifier={locationModifier}
        setLocationModifier={setLocationModifier}
        modifierLocked={modifierLocked}
        setModifierLocked={setModifierLocked}
        locationAppearance={locationAppearance}
        setLocationAppearance={setLocationAppearance}
        appearanceLocked={appearanceLocked}
        setAppearanceLocked={setAppearanceLocked}
        locationNatureBreathable={locationNatureBreathable}
        setLocationNatureBreathable={setLocationNatureBreathable}
        locationNatureGravity={locationNatureGravity}
        setLocationNatureGravity={setLocationNatureGravity}
        locationNatureEnvironments={locationNatureEnvironments}
        setLocationNatureEnvironments={setLocationNatureEnvironments}
        locationNatureMaterials={locationNatureMaterials}
        setLocationNatureMaterials={setLocationNatureMaterials}
        natureLocked={natureLocked}
        setNatureLocked={setNatureLocked}
        locationSocietyHistory={locationSocietyHistory}
        setLocationSocietyHistory={setLocationSocietyHistory}
        locationSocietyReligion={locationSocietyReligion}
        setLocationSocietyReligion={setLocationSocietyReligion}
        locationSocietyTechnology={locationSocietyTechnology}
        setLocationSocietyTechnology={setLocationSocietyTechnology}
        locationSocietyCulture={locationSocietyCulture}
        setLocationSocietyCulture={setLocationSocietyCulture}
        locationSocietyGovernment={locationSocietyGovernment}
        setLocationSocietyGovernment={setLocationSocietyGovernment}
        locationSocietyEconomy={locationSocietyEconomy}
        setLocationSocietyEconomy={setLocationSocietyEconomy}
        locationSocietySecrets={locationSocietySecrets}
        setLocationSocietySecrets={setLocationSocietySecrets}
        locationSocietyAllies={locationSocietyAllies}
        setLocationSocietyAllies={setLocationSocietyAllies}
        locationSocietyEnemies={locationSocietyEnemies}
        setLocationSocietyEnemies={setLocationSocietyEnemies}
        societyLocked={societyLocked}
        setSocietyLocked={setSocietyLocked}
        locationParentName={locationParentName}
        setLocationParentName={setLocationParentName}
        locationParentType={locationParentType}
        setLocationParentType={setLocationParentType}
        locationParentCharted={locationParentCharted}
        setLocationParentCharted={setLocationParentCharted}
        parentLocked={parentLocked}
        setParentLocked={setParentLocked}
        locationPositionX={locationPositionX}
        setLocationPositionX={setLocationPositionX}
        locationPositionY={locationPositionY}
        setLocationPositionY={setLocationPositionY}
        positionLocked={positionLocked}
        setPositionLocked={setPositionLocked}
        locationChildren={locationChildren}
        setLocationChildren={setLocationChildren}
        childrenLocked={childrenLocked}
        setChildrenLocked={setChildrenLocked}
        locationAnomalies={locationAnomalies}
        setLocationAnomalies={setLocationAnomalies}
        anomaliesLocked={anomaliesLocked}
        setAnomaliesLocked={setAnomaliesLocked}
        locationSummary={locationSummary}
        setLocationSummary={setLocationSummary}
        summaryLocked={summaryLocked}
        setSummaryLocked={setSummaryLocked}
        locationImage={locationImage}
        setLocationImage={setLocationImage}
        resetLocationFilters={resetLocationFilters}
        // endOfList={endOflist}
        setRefreshOnCloseModal={setRefreshOnCloseModal}
        />
    );
    
    // MODAL 1 FOOTER
    const LocationModalFooter = (<div className='no-scrollbar' style={{
        // marginTop: 'auto',
        // border:'1px solid grey',
        // position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // marginRight: 'auto',
        // justifyContent: 'center',
        width: '100%',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '3px',
        marginTop: '3px',
        // maxHeight: '20px',
        // alignItems: 'center',
        // transform: `scale(${1 / window.devicePixelRatio})`,
        // minWidth: '100%',
        overflowX: 'auto',
    }}>
        {/* VIEW IN MAP */}
        {editMode === 'EDIT' ? 
        <DeleteLocationButton 
            currentLocationName={locationName ?? 'location'} 
            deleteLocationFromDB={() => deleteLocationInAPI(
                jsonBody,
                locationName ?? 'location',
                modalOnClose,
                refreshLocations
            )}
        /> :
        <ViewInMapButton 
            currentLocationName={locationName ?? 'location'} 
            viewMode={editMode === 'VIEW'}
        />}
        <div style={{
            // border:'1px solid green', // spacer div
            display: 'flex',
            width: '100%',
            marginLeft: '-5px',
            marginRight: '-5px',
        }}/>
        {/* LOCK/UNLOCK ALL */}
        <LockUnlockAllButton 
            allInputsUnlocked={allInputsUnlocked}
            unlockAllInputs={unlockAllInputs}
            lockAllInputs={lockAllInputs}
            viewMode={editMode === 'VIEW'}
        />
        {/* RANDOMIZE UNLOCKED */}
        <RandomizeUnlockedButton 
            viewMode={editMode === 'VIEW'}
            randomizeUnlockedFields={() => randomizeLocationInAPI(
                jsonBody,
                lockedListStr,
                lockedListLength,
                locationName ?? 'location',
                updateFieldsWithRandomizedResult
            )}
        />
        {/* SET CURRENT */}
        <SetCurrentButton 
            currentLocationName={locationName ?? 'location'}
            viewMode={editMode === 'VIEW'}
        />
        {/* EDIT/SAVE */}
        <EditSaveButton 
            viewMode={editMode === 'VIEW'}
            createMode={editMode === 'CREATE'}
            locationName={locationName}
            // currentLocationName={locationName ?? 'location'}
            setEditMode={setEditMode}
            saveLocationToDB={() => saveLocationToAPI(
                jsonBody,
                locationName ?? 'location',
                setLocationId,
                setEditMode,
                setExcludedListLocations,
                setRefreshOnCloseModal
            )}
            editLocationInDB={() => editLocationInAPI(
                jsonBody,
                locationName ?? 'location',
                setEditMode,
                setExcludedListLocations,
                setRefreshOnCloseModal
            )}
        />
    </div>);
    
    return <LocationModal 
    modalHidden={isModalHidden}
    modalOnClose={modalOnClose}
    modalTitle={LocationModalTitle}
    modalContent={LocationModalContent}
    modalFooter={LocationModalFooter}
    />

}