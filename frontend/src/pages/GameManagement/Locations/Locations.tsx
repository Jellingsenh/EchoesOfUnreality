import { StrictMode, useEffect, useState } from "react"
import { baseApiUrl, baseWebUrl } from "../../../../resources/constants"
import ViewEditLocationsModal from "./ViewEditLocationsModal"
import { Root } from "../../../Echoes"
import WebPage from "../../../components/WebPage"
import SpinningLoader from "../../../components/SpinningLoader"
import { useInView } from "react-intersection-observer"
import ChooseParentOrChildModal from "./LocationParts/ChooseParentOrChildModal"
import { getTextWidth } from "../../../components/helpers/TextHelpers"
import LocationFilters from "./LocationParts/LocationFilters"
import InfiniteLocationList from "./LocationParts/InfiniteLocationList"
import ViewInMapButton from "./LocationParts/ViewInMapButton"
import LockUnlockAllButton from "./LocationParts/LockUnlockAllButton"
import RandomizeUnlockedButton from "./LocationParts/RandomizeUnlockedButton"
import SetCurrentButton from "./LocationParts/SetCurrentButton"
import EditSaveButton from "./LocationParts/EditSaveButton"

Root.render(
  <StrictMode>
    <Locations />
  </StrictMode>,
)

function Locations() {
  const [allCompressedLocations, setAllCompressedLocations] = useState<{name:string,type:string}[]>([])
  const [currentCompressedLocation, setCurrentCompressedLocation] = useState<{name:string, type:string} | null>(null)

  // location list
  const [infiniteItemWidth, setInfiniteItemWidth] = useState(0)
  const [doRefresh, setDoRefresh] = useState(false)

  // modal
  const [editMode, setEditMode] = useState('VIEW') // or 'EDIT' or 'CREATE'
  const [isModalHidden, setModalHidden] = useState(true)

  // secondary modal
   const [chooseLocationModalHidden, setChooseLocationModalHidden] = useState(true)
   const [secondaryModalParentMode, setSecondaryModalParentMode] = useState<boolean | null>(null) // parentMode

  const [newParentName, setNewParentName] = useState<string | null>(null) // can be for a chosen parent or child
  const [newParentType, setNewParentType] = useState<string | null>(null) // can be for a chosen parent or child
  const [newChildName, setNewChildName] = useState<string | null>(null) // can be for a chosen parent or child
  const [newChildType, setNewChildType] = useState<string | null>(null) // can be for a chosen parent or child

  const [excludedListLocations, setExcludedListLocations] = useState<{name:string, type:string}[]>([]) // for when choosing a parent or child, to exclude the current location and its children/parents
  
  // filter variables
  const [searchStr, setSearchStr] = useState<string | null>('')

  const [typeFilter, setTypeFilter] = useState<string | null>(null) // PLACE, CITY, AREA, COUNTRY, CONTINENT, FEATURE, MOON, PLANET, STAR, SPACE, GALAXY, UNIVERSE, or DIMENSION
  const [breathableFilter, setBreathableFilter] = useState<string | null>(null) // BREATHABLE or UNBREATHABLE
  // const [parentFilter, setParentFilter] = useState<{name:string, type:string} | null>(null) // {name: '', type: ''}
  // const [parentSelectMode, setParentSelectMode] = useState(false)

  const [sortBy, setSortBy] = useState('TIME') // NAME, TYPE, or TIME
  const [descending, setDescending] = useState(false)

  // data variables
  const [loading, setLoading] = useState(false) // loading state

  const [offset, setOffset] = useState(0) // pagination offset
  const [loadingMore, setLoadingMore] = useState(false) // loading state
  const [endOflist, setEndOfList] = useState(false)

  // MODAL ARGUMENTS // moved here for the sake of the modal footer

  // locked variables
  const [nameLocked, setNameLocked] = useState(false)
  const [typeLocked, setTypeLocked] = useState(false)
  const [sizeLocked, setSizeLocked] = useState(false)
  const [modifierLocked, setModifierLocked] = useState(false)
  const [appearanceLocked, setAppearanceLocked] = useState(false)
  const [natureLocked, setNatureLocked] = useState(false)
  const [societyLocked, setSocietyLocked] = useState(false)
  const [parentLocked, setParentLocked] = useState(false)
  const [positionLocked, setPositionLocked] = useState(false)
  const [childrenLocked, setChildrenLocked] = useState(false)
  const [anomaliesLocked, setAnomaliesLocked] = useState(false)
  const [summaryLocked, setSummaryLocked] = useState(false)

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

  // main location variables
  const [locationName, setLocationName] = useState<string | null>(null)
  const [locationType, setLocationType] = useState<string | null>(null)
  const [locationAppearance, setLocationAppearance] = useState<string | null>(null)
  const [locationModifier, setLocationModifier] = useState<string | null>(null)
  const [locationSize, setLocationSize] = useState<string | null>(null)
  //nature
  const [locationNatureBreathable, setLocationNatureBreathable] = useState<boolean | null>(null)
  const [locationNatureGravity, setLocationNatureGravity] = useState<string | null>(null)
  const [locationNatureEnvironments, setLocationNatureEnvironments] = useState<string[] | null>(null)
  const [locationNatureMaterials, setLocationNatureMaterials] = useState<string[] | null>(null)
  //society
  const [locationSocietyHistory, setLocationSocietyHistory] = useState<string | null>(null)
  const [locationSocietyReligion, setLocationSocietyReligion] = useState<string | null>(null)
  const [locationSocietyTechnology, setLocationSocietyTechnology] = useState<string | null>(null)
  const [locationSocietyCulture, setLocationSocietyCulture] = useState<string | null>(null)
  const [locationSocietyGovernment, setLocationSocietyGovernment] = useState<string | null>(null)
  const [locationSocietyEconomy, setLocationSocietyEconomy] = useState<string | null>(null)
  const [locationSocietySecrets, setLocationSocietySecrets] = useState<string | null>(null)
  const [locationSocietyAllies, setLocationSocietyAllies] = useState<string | null>(null)
  const [locationSocietyEnemies, setLocationSocietyEnemies] = useState<string | null>(null)
  // parent
  const [locationParentName, setLocationParentName] = useState<string | null>(null)
  const [locationParentType, setLocationParentType] = useState<string | null>(null)
  const [locationParentCharted, setLocationParentCharted] = useState<boolean | null>(null)
  // position
  const [locationPositionX, setLocationPositionX] = useState<number | null>(null)
  const [locationPositionY, setLocationPositionY] = useState<number | null>(null)
  // children
  const [locationChildren, setLocationChildren] = useState<{name: string, type: string, charted: boolean}[] | null>(null)
  const [locationAnomalies, setLocationAnomalies] = useState<string[] | null>([])
  const [locationSummary, setLocationSummary] = useState<string | null>(null)

  // Debouncer timer (unused)
  // Create a ref to track the timeout
  // const debounceTimer = useRef(null);

  // // Cleanup the timer when the component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (debounceTimer.current) {
  //       clearTimeout(debounceTimer.current);
  //     }
  //   };
  // }, []);

  // API CALLS

  // GET INITIAL LOCATIONS
  useEffect(() => {
    if (searchStr && searchStr.length == 1) return
    // console.log('filters:\n  ' 
    //   + searchStr + '\n  '
    //   + typeFilter + '\n  '
    //   + breathableFilter + '\n  '
    //   + sortBy + '\n  '
    //   + descending + '\n  '
    //   + doRefresh + '.')

    const controller = new AbortController(); // stop call from happenig 2x
    const { signal } = controller;

    async function getCompressedLocations()  {
      setLoading(true); // Start loading state
      try {
        const res = await fetch(baseApiUrl + '/getCompressedLocations/0/20', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": searchStr,
            "type": typeFilter, 
            "breathable": breathableFilter,
            // "parent": parentFilter,
            "sortBy": sortBy,
            "descending": descending.toString()
          }),
          signal, // Attach the signal to the fetch request
        },);
        console.log('Getting locations...')
        const result = await res.json();
        // console.log(' got compressed locations: ' + JSON.stringify(result))
        setMaxInfiniteItemWidth(result ?? [])
        setAllCompressedLocations(result ?? []);
        if (result.length < 20) {
          setEndOfList(true)
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
          // console.log('Request was canceled intentionally.');
          return; // Gracefully exit
        }
        console.error('Error posting data:', error);
      } finally {
        setLoading(false); // End loading state regardless of success or failure
        // clearTimeout(timeoutId);
      }
    }

    // // Clear the previous timer if the button is clicked again
    // if (debounceTimer.current) {
    //   clearTimeout(debounceTimer.current);
    // }

    // // Set a 500ms delay before actually fetching/refreshing
    // debounceTimer.current = setTimeout(() => {
    //   // Perform your actual refresh or fetch logic here
    // }, 500); 

    getCompressedLocations()
    setOffset(0)
    setEndOfList(false)
    
    return () => {
      // clearTimeout(timeoutId);
      controller.abort(); // stop call from happenig 2x
    };
  }, [searchStr, typeFilter, breathableFilter, sortBy, descending, doRefresh])

  // LOAD MORE LOCATIONS
  const {ref: loadMoreRef, inView: loadMoreInView} = useInView({});

  useEffect(() => {
    const controller2 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller2;

    async function getMoreCompressedLocations()  {
      setLoadingMore(true)
      // console.log('getting more locations...')
      try {
        const res = await fetch(baseApiUrl + '/getCompressedLocations/' + (offset+20) + '/20', { // '/' + limit
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": searchStr,
            "type": typeFilter, 
            "breathable": breathableFilter,
            // "parent": parentFilter,
            "sortBy": sortBy,
            "descending": descending.toString()
          }),
          signal, // Attach the signal to the fetch request
        });
        console.log('Getting more locations...')
        const result = await res.json();
        setAllCompressedLocations(prevItems => {
          const newItems = [...prevItems, ...result]
          // console.log('items added: ',newItems.length-prevItems.length)
          if (newItems.length-prevItems.length < 20) { // getting 20 at a time. If < 20, list is over
            // console.log('end of list')
            setEndOfList(true)
          }
          setMaxInfiniteItemWidth(newItems ?? [])
          return newItems;
        });
        setOffset(offset+20)
      } catch (error: any) {
        if (error.name === 'AbortError') {
          // console.log('Request was canceled intentionally.');
          return; // Gracefully exit
        }
        console.error('Error posting data:', error);
      } finally {
        setLoadingMore(false)
      }
    }

    // console.log('loadMoreInView:', loadMoreInView)
    if (loadMoreInView && !loading && !loadingMore) {
      getMoreCompressedLocations();
    }

    return () => {
      controller2.abort(); // stop call from happenig 2x
    };
  }, [loadMoreInView])
  
  // SAVE LOCATION
  const jsonBody = {
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
  }

  function saveCurrentLocationToDB() {
    const controller7 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller7;

    async function saveLocation() {
        try {
            const res = await fetch(baseApiUrl + '/addLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody),
            signal, // Attach the signal to the fetch request
            },);
            if (!res.ok) console.error(res.statusText)
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            console.error('Error posting data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    saveLocation()
  }

  // RANDOMIZE UNLOCKED FIELDS
  const lockedListStr:string = (nameLocked ? 'name,' : ''
    + typeLocked ? 'type,' : ''
    + sizeLocked ? 'size,' : ''
    + modifierLocked ? 'modifier,' : ''
    + appearanceLocked ? 'appearance,' : ''
    + natureLocked ? 'nature,' : ''
    + societyLocked ? 'society,' : ''
    + parentLocked ? 'parent,' : ''
    + positionLocked ? 'position,' : ''
    + childrenLocked ? 'children,' : ''
    + anomaliesLocked ? 'anomalies,' : ''
    + summaryLocked ? 'summary,' : '').slice(0, -1) // remove last comma;

  function randomizeUnlockedFields() {
    const controller8 = new AbortController(); // stop call from happenig 2x
    const { signal } = controller8;

    async function partiallyRandomizeLocation() {
        try {
            const res = await fetch(baseApiUrl + '/randomizeLocation/' + lockedListStr, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonBody),
            signal, // Attach the signal to the fetch request
            },);
            // console.log('Randomizing location ' + locationName + '...')
            const result = await res.json();
            // if (res.ok) console.log('Randomized ' + locationName + '.')
            // update fields with result
            setLocationName(result.name)
            setLocationType(result.type)
            setLocationSize(result.size)
            setLocationModifier(result.modifier ?? 'NONE')
            setLocationAppearance(result.appearance)
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
        } catch (error: any) {
            if (error.name === 'AbortError') {
            // console.log('Request was canceled intentionally.');
            return; // Gracefully exit
            }
            console.error('Error posting data:', error);
        } finally {
            // clearTimeout(timeoutId);
        }
    }
    partiallyRandomizeLocation()
  }

  // HELPERS

  function setMaxInfiniteItemWidth(itemList: {name: string, type: string}[]) {
    var maxLength = 0;
    for (const item of itemList) {
      const textWidth = getTextWidth(item.name, '13px Arial')
      if (textWidth > maxLength) {
        maxLength = textWidth
      }
    }
    if (maxLength > 0 && maxLength != infiniteItemWidth) {
      setInfiniteItemWidth(maxLength);
    }
  }

  // CONTENT

  const BackToGM = (<a href={baseWebUrl + "/routes/gamemanagement"}>{'< Game Management'}</a>);

  const LocationsTitle = (<div 
    style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      gap: '10px', 
      alignItems: 'center',
      marginRight: '-10px',
      marginLeft: isModalHidden ? '0px' : '-25px',
    }}>
      <h2>Locations</h2>
      {isModalHidden &&
        <button className="fadeInItem"
          style={{
            aspectRatio: '1 / cos(30deg)',
            background: '#3498db',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            marginBottom: '-3px',
            border: 'none',
            width: '15px',
            height: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={(e) => {
            e.stopPropagation() // this stops the clickOut event
            setEditMode('CREATE')
            setModalHidden(false)
          }}>
          +
        </button>}
    </div>
  );

  const ModalTitle = (<div style={{
    // minWidth: 'max-content',
  }}>
      {editMode === 'CREATE' || currentCompressedLocation == null ? 
        'Creating a new location' :  
      (editMode === 'VIEW' ? 
        'Viewing ' : 
        'Editing ') + 
        currentCompressedLocation.name}
  </div>);

  function addToExcludedList(name: string, type: string) {
      // console.log('adding to excluded list: ' + name + ', ' + type)
      setExcludedListLocations(prev => [...prev, {name, type}])
   }

   function removeFromExcludedList(name: string, type: string) {
      // console.log('removing from excluded list: ' + name + ', ' + type)
      setExcludedListLocations(prev => prev.filter(location => location.name !== name || location.type !== type))
   }

   const resetLocationFilters = () => {
      // console.log('resetLocationFilters...')
      setSearchStr('')
      setDescending(false)
      setTypeFilter(null)
      setBreathableFilter(null)
      setSortBy('TIME')
   }

   const refreshLocations = () => {
    // console.log('new location added, list ended loading')
    console.log('refreshing...')
    // resetLocationFilters()
    setDoRefresh(prev => !prev)
   }

  const LocationModal = (<ViewEditLocationsModal 
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
        resetLocationFilters={resetLocationFilters}
        endOfList={endOflist}
        refreshLocations={refreshLocations}
      />
   );

   const ModalFooter = (<div className='no-scrollbar' style={{
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
        <ViewInMapButton 
          currentLocationName={currentCompressedLocation && currentCompressedLocation.name} 
          viewMode={editMode === 'VIEW'}
        />
        <div style={{
            // border:'1px solid green',
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
            randomizeUnlockedFields={randomizeUnlockedFields}
        />
        {/* SET CURRENT */}
        <SetCurrentButton 
            currentLocationName={currentCompressedLocation &&currentCompressedLocation.name}
            viewMode={editMode === 'VIEW'}
        />
        {/* EDIT/SAVE */}
        <EditSaveButton 
            viewMode={editMode === 'VIEW'}
            createMode={editMode === 'CREATE'}
            locationName={locationName}
            currentLocationName={currentCompressedLocation && currentCompressedLocation.name}
            setEditMode={setEditMode}
            saveLocationToDB={saveCurrentLocationToDB}
        />
    </div>);

    const modalOnClose = () => {
      setCurrentCompressedLocation(null)
      setNewParentName(null)
      setNewParentType(null)
      setNewChildName(null)
      setNewChildType(null)
      unlockAllInputs()
      setExcludedListLocations([])
      setModalHidden(true)
      // resetLocationFilters() // only refresh on 2nd modal close
      setLocationName(null) // not entirelly sure why I only need to null name, but all other fields are auto-nulled on close
  }

  function chooseLocationForRelative(location: {name: string, type: string}) {
    if (secondaryModalParentMode) {
      setNewParentName(location.name)
      setNewParentType(location.type)
    } else {
      setNewChildName(location.name)
      setNewChildType(location.type)
    }
    setChooseLocationModalHidden(true)
  }

  const ChooseLocationModalContent = (<>
    {/* SORT & FILTER & SEARCH */}
    <div style={{
      // marginTop: '-10px',
      // display: 'flex',
      position: 'fixed',
      // alignSelf: 'center',
      justifySelf: 'center',
      // justifyContent: 'center',
      // marginLeft: '25%',
      marginTop: '-10px',
      // marginBottom: '5px',
      // margin: '5px auto',
      // border: '1px solid black',
      background: '#ccc9c9',
      zIndex: 50,
      padding: '10px 60px',
    }}>
      <LocationFilters 
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        breathableFilter={breathableFilter}
        setBreathableFilter={setBreathableFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        descending={descending}
        setDescending={setDescending}
      />
    </div>
    {/* LIST LOCATIONS */}
    <div style={{
      // border: '1px solid green',
      marginTop: '30px',
      // zIndex: 1,
      // maxHeight: '60%',
      // overflowY: 'auto',
    }}>
      <InfiniteLocationList 
        allCompressedLocations={allCompressedLocations}
        selectLocation={chooseLocationForRelative}
        infiniteItemWidth={infiniteItemWidth}
        loadMoreRef={loadMoreRef}
        endOflist={endOflist}
        excludedLocations={excludedListLocations}
      />
    </div>
  </>);

  const ChooseLocationModal = (<ChooseParentOrChildModal 
      modalContent={ChooseLocationModalContent}
      modalParentMode={secondaryModalParentMode ?? false}
      chooseLocationModalHidden={chooseLocationModalHidden}
      resetLocationFilters={resetLocationFilters}
      setChooseLocationModalHidden={setChooseLocationModalHidden}
  />);

  function selectLocationForViewing(location: {name: string, type: string}) {
    // console.log('selected location: ' + location.name + ', ' + location.type)
    setCurrentCompressedLocation(location)
    setExcludedListLocations([location])
    setEditMode('VIEW')
    setModalHidden(false)
  }

  function selectNewLocationForViewing(location: {name: string, type: string}) {
    setNewParentName(null)
    setNewParentType(null)
    setNewChildName(null)
    setNewChildType(null)

    setExcludedListLocations([location])

    unlockAllInputs()
    // resetLocationFilters() // only reset on 2nd modal open and close
    
    setLocationName(null)

    setEditMode('VIEW')

    setCurrentCompressedLocation(location)
  }

  const LocationsContent = (<div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // maxHeight: '80vh',
      marginTop: '70px',
      marginBottom: '40px',
      // paddingTop: '200px',
    }}>
    {/* GREY TOP BOX */}
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        width: '75%',
        position: 'fixed', 
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px',
        zIndex: 50,
        background: 'darkgrey' }}>
      {/* SORT & FILTER & SEARCH */}
      <LocationFilters 
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        breathableFilter={breathableFilter}
        setBreathableFilter={setBreathableFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        descending={descending}
        setDescending={setDescending}
      />
    </div>
    {/* LOADING */}
    {loading ? <div style={{ margin: '20px auto'}}><SpinningLoader/></div> : 
    // LOADING COMPLETE
    <InfiniteLocationList 
        allCompressedLocations={allCompressedLocations}
        selectLocation={selectLocationForViewing}
        infiniteItemWidth={infiniteItemWidth}
        loadMoreRef={loadMoreRef}
        endOflist={endOflist}
        excludedLocations={null}
    />}
    {/* GREY BOTTOM BOX */}
    <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        position: 'fixed', 
        bottom: '0px',
        left: '50%',
        height: '40px',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        background: 'darkgrey',
        width: '60%',
        padding: '10px',
        marginBottom: '10px',
        minWidth: '500px', 
        justifyContent: 'right' 
      }}>
      {/* ITEMS PER PAGE */}
      {/* <div style={{
        marginRight: '50px'
      }}>{offset+1 + ' - ' + (offset+limit+1)}</div>
      <div style={{
        marginRight: '50px'
      }}>
        <button onClick={() => {
          setParentSelectMode(!parentSelectMode && !parentFilter)
          setParentFilter(null)
        }}>{parentSelectMode || parentFilter ? 'View all locations' : 'View a locations\'s children'}</button>
        {'Items per page: '}
        <select name="itemsPerPage" onChange={(i) => {setLimit(parseInt(i.target.value) || 20)}} value={limit}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div> */}
    </div>
  </div>);

  // const LocationsFooter = (<>
  //   Footer Content
  // </>);

  return ( <WebPage 
    backButton={BackToGM} 
    modal={LocationModal} 
    modalTitle={ModalTitle}
    modalHidden={isModalHidden}
    // setModalHidden={setModalHidden}
    modalFooter={ModalFooter}
    modalOnClose={modalOnClose}
    secondaryModal={ChooseLocationModal}
    title={LocationsTitle}
    content={isModalHidden ? LocationsContent : null} 
    footer={null} />
  )
}
