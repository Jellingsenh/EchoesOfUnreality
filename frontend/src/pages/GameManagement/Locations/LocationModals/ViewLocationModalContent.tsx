import { useState } from 'react'
import SpinningLoader from '../../../../components/SpinningLoader'
import NameInput from '../LocationInputs/NameInput';
import LocationTypeDropdown from '../LocationDropdowns/LocationTypeDropdown';
import LocationModifierDropdown from '../LocationDropdowns/LocationModifierDropdown';
import AppearanceInput from '../LocationInputs/AppearanceInput';
import NatureSection from '../LocationSections/NatureSection';
import SocietySection from '../LocationSections/SocietySection';
import ParentSection from '../LocationSections/ParentSection';
import ChildrenSection from '../LocationSections/ChildrenSection';
import LocationAnomalyInput from '../LocationInputs/LocationAnomalyInput';
import SummaryInput from '../LocationInputs/SummaryInput';
import LocationSizeDropdown from '../LocationDropdowns/LocationSizeDropdown';
import LocationImageSection from '../LocationSections/LocationImageSection';
import PositionOnParentSection from '../LocationSections/PositionOnParentSection';
import getLocationForViewing from '../LocationsNetworking/getLocationForViewing';

export default function ViewLocationModalContent({
   isMobile,
   currentLocation, 
   viewMode,
   createMode,
   selectNewLocationForViewing,
   // chooseLocationModalHidden,
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
   addToExcludedListLocations,
   removeFromExcludedListLocations,
   setLocationId,
   locationName,
   setLocationName,
   nameLocked,
   setNameLocked,
   locationType,
   setLocationType,
   typeLocked,
   setTypeLocked,
   locationSize,
   setLocationSize,
   sizeLocked,
   setSizeLocked,
   locationModifier,
   setLocationModifier,
   modifierLocked,
   setModifierLocked,
   locationAppearance,
   setLocationAppearance,
   appearanceLocked,
   setAppearanceLocked,
   locationNatureBreathable,
   setLocationNatureBreathable,
   locationNatureGravity,
   setLocationNatureGravity,
   locationNatureEnvironments,
   setLocationNatureEnvironments,
   locationNatureMaterials,
   setLocationNatureMaterials,
   natureLocked,
   setNatureLocked,
   locationSocietyHistory,
   setLocationSocietyHistory,
   locationSocietyReligion,
   setLocationSocietyReligion,
   locationSocietyTechnology,
   setLocationSocietyTechnology,
   locationSocietyCulture,
   setLocationSocietyCulture,
   locationSocietyGovernment,
   setLocationSocietyGovernment,
   locationSocietyEconomy,
   setLocationSocietyEconomy,
   locationSocietySecrets,
   setLocationSocietySecrets,
   locationSocietyAllies,
   setLocationSocietyAllies,
   locationSocietyEnemies,
   setLocationSocietyEnemies,
   societyLocked,
   setSocietyLocked,
   locationParentName,
   setLocationParentName,
   locationParentType,
   setLocationParentType,
   locationParentCharted,
   setLocationParentCharted,
   parentLocked,
   setParentLocked,
   locationPositionX,
   setLocationPositionX,
   locationPositionY,
   setLocationPositionY,
   positionLocked,
   setPositionLocked,
   locationChildren,
   setLocationChildren,
   childrenLocked,
   setChildrenLocked,
   locationAnomalies,
   setLocationAnomalies,
   anomaliesLocked,
   setAnomaliesLocked,
   locationSummary,
   setLocationSummary,
   summaryLocked,
   setSummaryLocked,
   resetLocationFilters,
   // endOfList,
   setRefreshOnCloseModal,
   triggerAlertBanner,
   imageUrl,
   setImageUrl,
   locationImageEntry,
   setLocationImageEntry,
   setLocationImageWasPresent,
}:{
   isMobile: boolean,
   currentLocation: {name: string, type: string} | null, 
   viewMode: boolean,
   createMode: boolean,
   selectNewLocationForViewing: (location: { name: string; type: string; }) => void
   // chooseLocationModalHidden: boolean,
   // editMode: string, 
   // setEditMode: (editMode: string) => void,
   // chooseLocationModalHidden: boolean,
   setChooseLocationModalHidden: (chooseLocationModalHidden: boolean) => void,
   setSecondaryModalParentMode: (parentMode: boolean | null) => void,
   newParentName: string | null,
   setNewParentName: React.Dispatch<React.SetStateAction<string | null>>,
   newParentType: string | null,
   setNewParentType: React.Dispatch<React.SetStateAction<string | null>>,
   newChildName: string | null,
   setNewChildName: React.Dispatch<React.SetStateAction<string | null>>,
   newChildType: string | null,
   setNewChildType: React.Dispatch<React.SetStateAction<string | null>>,
   addToExcludedListLocations: (name: string, type: string) => void,
   removeFromExcludedListLocations: (name: string, type: string) => void,
   setLocationId: React.Dispatch<React.SetStateAction<string | null>>,
   locationName: string | null,
   setLocationName: React.Dispatch<React.SetStateAction<string | null>>,
   nameLocked: boolean,
   setNameLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationType: string | null,
   setLocationType: React.Dispatch<React.SetStateAction<string | null>>,
   typeLocked: boolean,
   setTypeLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationSize: string | null,
   setLocationSize: React.Dispatch<React.SetStateAction<string | null>>,
   sizeLocked: boolean,
   setSizeLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationModifier: string | null,
   setLocationModifier: React.Dispatch<React.SetStateAction<string | null>>,
   modifierLocked: boolean,
   setModifierLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationAppearance: string | null,
   setLocationAppearance: React.Dispatch<React.SetStateAction<string | null>>,
   appearanceLocked: boolean,
   setAppearanceLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationNatureBreathable: boolean | null,
   setLocationNatureBreathable: React.Dispatch<React.SetStateAction<boolean | null>>,
   locationNatureGravity: string | null,
   setLocationNatureGravity: React.Dispatch<React.SetStateAction<string | null>>,
   locationNatureEnvironments: string[] | null,
   setLocationNatureEnvironments: React.Dispatch<React.SetStateAction<string[] | null>>,
   locationNatureMaterials: string[] | null,
   setLocationNatureMaterials: React.Dispatch<React.SetStateAction<string[] | null>>,
   natureLocked: boolean,
   setNatureLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationSocietyHistory: string | null,
   setLocationSocietyHistory: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyReligion: string | null,
   setLocationSocietyReligion: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyTechnology: string | null,
   setLocationSocietyTechnology: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyCulture: string | null,
   setLocationSocietyCulture: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyGovernment: string | null,
   setLocationSocietyGovernment: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyEconomy: string | null,
   setLocationSocietyEconomy: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietySecrets: string | null,
   setLocationSocietySecrets: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyAllies: string | null,
   setLocationSocietyAllies: React.Dispatch<React.SetStateAction<string | null>>,
   locationSocietyEnemies: string | null,
   setLocationSocietyEnemies: React.Dispatch<React.SetStateAction<string | null>>,
   societyLocked: boolean,
   setSocietyLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationParentName: string | null,
   setLocationParentName: React.Dispatch<React.SetStateAction<string | null>>,
   locationParentType: string | null,
   setLocationParentType: React.Dispatch<React.SetStateAction<string | null>>,
   locationParentCharted: boolean | null,
   setLocationParentCharted: React.Dispatch<React.SetStateAction<boolean | null>>,
   parentLocked: boolean,
   setParentLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationPositionX: number | null,
   setLocationPositionX: React.Dispatch<React.SetStateAction<number | null>>,
   locationPositionY: number | null,
   setLocationPositionY: React.Dispatch<React.SetStateAction<number | null>>,
   positionLocked: boolean,
   setPositionLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationChildren: {name: string, type: string, charted: boolean}[] | null,
   setLocationChildren: React.Dispatch<React.SetStateAction<{name: string, type: string, charted: boolean}[] | null>>,
   childrenLocked: boolean,
   setChildrenLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationAnomalies: string[] | null,
   setLocationAnomalies: React.Dispatch<React.SetStateAction<string[] | null>>,
   anomaliesLocked: boolean,
   setAnomaliesLocked: React.Dispatch<React.SetStateAction<boolean>>,
   locationSummary: string | null,
   setLocationSummary: React.Dispatch<React.SetStateAction<string | null>>,
   summaryLocked: boolean,
   setSummaryLocked: React.Dispatch<React.SetStateAction<boolean>>, 
   resetLocationFilters: () => void,
   // endOfList: boolean,
   setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
   triggerAlertBanner: (content:string, type:'success'|'warning'|'error') => void,
   imageUrl: string | null,
   setImageUrl: React.Dispatch<React.SetStateAction<string | null>>,
   locationImageEntry: File | null,
   setLocationImageEntry: React.Dispatch<React.SetStateAction< File | null>>,
   setLocationImageWasPresent: React.Dispatch<React.SetStateAction<boolean>>,
}) {
   const [loadingLocation, setLoadingLocation] = useState(false) // loading location state
   const [loadingLocationImage, setLoadingLocationImage] = useState(false) 

   // GET LOCATION FUNCTION
   getLocationForViewing(
      createMode,
      currentLocation,
      setLoadingLocation,
      setLoadingLocationImage,
      setLocationId,
      setLocationName,
      setLocationType,
      setLocationSize,
      setLocationModifier,
      setLocationAppearance,
      setLocationNatureBreathable,
      setLocationNatureGravity,
      setLocationNatureEnvironments,
      setLocationNatureMaterials,
      setLocationSocietyHistory,
      setLocationSocietyReligion,
      setLocationSocietyTechnology,
      setLocationSocietyCulture,
      setLocationSocietyGovernment,
      setLocationSocietyEconomy,
      setLocationSocietySecrets,
      setLocationSocietyAllies,
      setLocationSocietyEnemies,
      setLocationParentName,
      setLocationParentType,
      setLocationParentCharted,
      setLocationPositionX,
      setLocationPositionY,
      setLocationChildren,
      setLocationAnomalies,
      setLocationSummary,
      addToExcludedListLocations,
      imageUrl,
      setImageUrl,
      setLocationImageWasPresent,
   )

   if (isMobile) return <div style={{
      border: '1px solid blue', // JOSH TODO MOBILE MODE
      minWidth: '100px',
   }}>
      mobile mode (tbd)
   </div>
    return (<div style={{
      // border & color are set in WebPage.tsx
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: '40vh',
    }}>
      {/* VIEWING/EDITING/CREATING */}
      {(loadingLocation || (viewMode && !locationName)) ? 
         <div style={{
            padding: '10px auto'
         }}>
            <SpinningLoader/>
         </div> : 
         <>
            {/* INPUTS */}
            <div className='no-scrollbar' style={{
               display: 'flex',
               flexDirection: 'column',
               // padding: '5px',
               // border: '1px solid red',
               minWidth: 'max-content',
               // marginLeft: '0px',
               // marginRight: '0px',
               // width: '100%',
               // overflowX: 'hidden',
               // marginLeft: '-10px',
               // marginRight: '-20px',
               // paddingRight: '20px',

            }}>
               {/* NAME|TYPE|SIZE|MODIFIER */}
               <div style={{
                  display: 'flex',
                  // flexDirection: 'row',
                  // justifyContent: 'left',
                  gap: '10px',
                  // width: '100%',
                  // overflowX: 'auto',
               }}>
                  <NameInput currentInput={locationName}
                     setCurrentInput={setLocationName}
                     currentInputLocked={nameLocked}
                     setCurrentInputLocked={setNameLocked}
                     viewMode={viewMode}
                     // createMode={createMode}
                  />
                  <LocationTypeDropdown currentInput={locationType}
                     setCurrentInput={setLocationType}
                     currentInputLocked={typeLocked}
                     setCurrentInputLocked={setTypeLocked}
                     viewMode={viewMode}
                     // createMode={createMode}
                  />
                  <LocationSizeDropdown currentInput={locationSize}
                     setCurrentInput={setLocationSize}
                     currentInputLocked={sizeLocked}
                     setCurrentInputLocked={setSizeLocked}
                     viewMode={viewMode}
                     // createMode={createMode}
                  />
                  <LocationModifierDropdown currentInput={locationModifier}
                     setCurrentInput={setLocationModifier}
                     currentInputLocked={modifierLocked}
                     setCurrentInputLocked={setModifierLocked} 
                     viewMode={viewMode}
                     // createMode={createMode}
                  />
               </div>
               {/* APPEARANCE */}
               <AppearanceInput currentInput={locationAppearance}
                  setCurrentInput={setLocationAppearance}
                  currentInputLocked={appearanceLocked}
                  setCurrentInputLocked={setAppearanceLocked}
                  viewMode={viewMode}
                  // createMode={createMode}
               />
               {/* NATURE & SOCIETY & ANOMALIES | IMAGE & PARENT & CHILDREN */}
               <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '10px',
                  minWidth: 'max-content',
                  // border: '2px solid orange',
               }}>
                  {/* NATURE & SOCIETY & ANOMALIES*/}
                  <div style={{
                     width: '60%',
                     minWidth: 'max-content',
                     display: 'flex',
                     flexDirection: 'column',
                  }}>
                     <NatureSection 
                        currentBreathableInput={locationNatureBreathable}
                        setCurrentBreathableInput={setLocationNatureBreathable}
                        currentGravityInput={locationNatureGravity}
                        setCurrentGravityInput={setLocationNatureGravity}
                        currentEnvironmentInput={locationNatureEnvironments}
                        setCurrentEnvironmentInput={setLocationNatureEnvironments}
                        currentMaterialInput={locationNatureMaterials}
                        setCurrentMaterialInput={setLocationNatureMaterials}
                        currentInputLocked={natureLocked}
                        setCurrentInputLocked={setNatureLocked}
                        viewMode={viewMode}
                     />
                     <SocietySection 
                        currentHistoryInput={locationSocietyHistory}
                        setCurrentHistoryInput={setLocationSocietyHistory}
                        currentReligionInput={locationSocietyReligion}
                        setCurrentReligionInput={setLocationSocietyReligion}
                        currentTechnologyInput={locationSocietyTechnology}
                        setCurrentTechnologyInput={setLocationSocietyTechnology}
                        currentCultureInput={locationSocietyCulture}
                        setCurrentCultureInput={setLocationSocietyCulture}
                        currentGovernmentInput={locationSocietyGovernment}
                        setCurrentGovernmentInput={setLocationSocietyGovernment}
                        currentEconomyInput={locationSocietyEconomy}
                        setCurrentEconomyInput={setLocationSocietyEconomy}
                        currentSecretsInput={locationSocietySecrets}
                        setCurrentSecretsInput={setLocationSocietySecrets}
                        currentAlliesInput={locationSocietyAllies}
                        setCurrentAlliesInput={setLocationSocietyAllies}
                        currentEnemiesInput={locationSocietyEnemies}
                        setCurrentEnemiesInput={setLocationSocietyEnemies}
                        currentInputLocked={societyLocked}
                        setCurrentInputLocked={setSocietyLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                     />
                     {/* ANOMALIES */}
                     <LocationAnomalyInput 
                        currentInput={locationAnomalies}
                        setCurrentInput={setLocationAnomalies}
                        currentInputLocked={anomaliesLocked}
                        setCurrentInputLocked={setAnomaliesLocked}
                        viewMode={viewMode}
                     />
                  </div>
                  {/* IMAGE & PARENT & CHILDREN */}
                  <div style={{
                     width: '40%',
                     display: 'flex',
                     flexDirection: 'column',
                     minWidth: 'max-content',
                     // paddingRight: '10px',
                  }}>
                     <LocationImageSection 
                        viewMode={viewMode}
                        loadingLocationImage={loadingLocationImage}
                        setLoadingLocationImage={setLoadingLocationImage}
                        imageUrlInput={imageUrl}
                        setImageUrlInput={setImageUrl}
                        appearanceText={locationAppearance ?? 'No image text found.'}
                        locationImageEntry={locationImageEntry}
                        setLocationImageEntry={setLocationImageEntry}
                        // setWasImageRemoved={setWasImageRemoved}
                     />
                     <ParentSection currentParentNameInput={locationParentName}
                        setCurrentParentNameInput={setLocationParentName}
                        currentParentTypeInput={locationParentType}
                        setCurrentParentTypeInput={setLocationParentType}
                        currentChartedInput={locationParentCharted}
                        setCurrentChartedInput={setLocationParentCharted}
                        currentInputLocked={parentLocked}
                        setCurrentInputLocked={setParentLocked}
                        setPositionInputLocked={setPositionLocked}
                        // chooseLocationModalHidden={chooseLocationModalHidden}
                        setChooseLocationModalHidden={setChooseLocationModalHidden}
                        resetLocationFilters={resetLocationFilters}
                        setChooseLocationModalParentMode={setSecondaryModalParentMode}
                        newParentName={newParentName}
                        setNewParentName={setNewParentName}
                        newParentType={newParentType}
                        setNewParentType={setNewParentType}
                        viewMode={viewMode}
                        // createMode={createMode}
                        selectNewLocationForViewing={selectNewLocationForViewing}
                        addToExcludedListLocations={addToExcludedListLocations}
                        removeFromExcludedListLocations={removeFromExcludedListLocations}
                        childName={locationName}
                        childType={locationType}
                        childDisordered={'DISORDERED' ===  locationModifier}
                        // endOfList={endOfList}
                        setRefreshOnCloseModal={setRefreshOnCloseModal}
                        triggerAlertBanner={triggerAlertBanner}
                     />
                     {locationParentName && <PositionOnParentSection 
                        currentXInput={locationPositionX}
                        setCurrentXInput={setLocationPositionX}
                        currentYInput={locationPositionY}
                        setCurrentYInput={setLocationPositionY}
                        currentLocationType={locationType}
                        currentInputLocked={positionLocked}
                        setCurrentInputLocked={setPositionLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                     />}
                     <ChildrenSection 
                        currentChildren={locationChildren}
                        setCurrentChildren={setLocationChildren}
                        currentInputLocked={childrenLocked}
                        setCurrentInputLocked={setChildrenLocked}
                        setChooseLocationModalHidden={setChooseLocationModalHidden}
                        resetLocationFilters={resetLocationFilters}
                        setChooseLocationModalParentMode={setSecondaryModalParentMode}
                        newChildName={newChildName}
                        setNewChildName={setNewChildName}
                        newChildType={newChildType}
                        setNewChildType={setNewChildType}
                        viewMode={viewMode}
                        // createMode={createMode}
                        selectNewLocationForViewing={selectNewLocationForViewing}
                        addToExcludedListLocations={addToExcludedListLocations}
                        removeFromExcludedListLocations={removeFromExcludedListLocations}
                        parentName={locationName}
                        parentType={locationType}
                        // endOfList={endOfList}
                        setRefreshOnCloseModal={setRefreshOnCloseModal}
                        triggerAlertBanner={triggerAlertBanner}
                     />
                  </div>
               </div>
               {/* SUMMARY */}
               <SummaryInput 
                  currentInput={locationSummary}
                  setCurrentInput={setLocationSummary}
                  currentInputLocked={summaryLocked}
                  setCurrentInputLocked={setSummaryLocked}
                  viewMode={viewMode}
                  // createMode={createMode}
               />
            </div>
         </>}
    </div>)
}
