import { useEffect, useState } from 'react'
import { baseApiUrl } from '../../../../../resources/constants'
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
import ImageSection from '../LocationSections/ImageSection';
import PositionOnParentSection from '../LocationSections/PositionOnParentSection';

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
   locationImage,
   setLocationImage,
   resetLocationFilters,
   // endOfList,
   setRefreshOnCloseModal,
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
   locationImage: string | null,
   setLocationImage: React.Dispatch<React.SetStateAction<string | null>>, // josh todo
   resetLocationFilters: () => void,
   // endOfList: boolean,
   setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
}) {
   // josh isMobile
   useEffect(() => {
      if (isMobile) {
         console.log ('mobile mode')
      }
   }, [isMobile])

   const [loadingLocation, setLoadingLocation] = useState(false) // loading location state

   // GET LOCATION FUNCTION
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
      };
   }, [currentLocation])

   // console.log('rendering View/Edit Modal for ' + currentLocation?.name + ' with locationName: ' + locationName)
   // console.log('loading: ', loadingLocation)

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
                     <ImageSection 
                        viewMode={viewMode}
                        imageInput={locationImage}
                        setImageInput={setLocationImage}
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
