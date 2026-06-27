import { StrictMode, useState } from "react"
import { baseWebUrl, DISORDERED, ERROR, SUCCESS, TIME, VIEW, type bannerAlertType, type editType } from "../../../resources/constants"
import { Root } from "../../../Echoes"
import WebPage from "../../../components/WebPage"
import SpinningLoader from "../../../components/SpinningLoader"
import { useInView } from "react-intersection-observer"
import LocationFilters from "./LocationsFilterParts/LocationFilters"
import InfiniteLocationList from "./LocationsList/InfiniteLocationList"
import CreateLocationButton from "./LocationButtons/CreateLocationButton"
import doMobileFormatCheck from "../../../helpers/doMobileFormatCheck"
import getInitialLocationsFromAPI from "./LocationsNetworking/getInitialLocationsFromAPI"
import getMoreLocationsFromAPI from "./LocationsNetworking/getMoreLocationsFromAPI"
import ViewLocationModalWrapper from "./LocationModals/ViewLocationModalWrapper"
import ChooseLocationModalWrapper from "./LocationModals/ChooseLocationModalWrapper"
import GenerateLocationButton from "./LocationButtons/GenerateLocationButton"
import { getTextWidth } from "../../../helpers/textHelpers"
import TimedAlertBanner from "../../../components/TimedAlertBanner"

Root.render(
  <StrictMode>
    <Locations />
  </StrictMode>,
)

function Locations() {
  const [allCompressedLocations, setAllCompressedLocations] = useState<{name:string,type:string}[]>([])
  const [noLocationsExist, setNoLocationsExist] = useState<boolean | null>(null);
  const [currentCompressedLocation, setCurrentCompressedLocation] = useState<{name:string, type:string} | null>(null)
  const [loadingLocations, setLoadingLocations] = useState<boolean | null>(null) // loading state
  const [offset, setOffset] = useState(0) // pagination offset
  const {ref: loadMoreRef, inView: loadMoreInView} = useInView({});
  const [endOflist, setEndOfList] = useState(false)
  const [infiniteItemWidth, setInfiniteItemWidth] = useState(0)

  // filter variables
  const [searchStr, setSearchStr] = useState<string | null>('')
  const [typeFilter, setTypeFilter] = useState<string | null>(null) // PLACE, CITY, AREA, COUNTRY, CONTINENT, FEATURE, MOON, PLANET, STAR, SPACE, GALAXY, UNIVERSE, or DIMENSION
  const [breathableFilter, setBreathableFilter] = useState<string | null>(null) // BREATHABLE or UNBREATHABLE
  const [sortBy, setSortBy] = useState(TIME) // NAME, TYPE, or TIME
  const [descending, setDescending] = useState(true)
  const [doRefresh, setDoRefresh] = useState(false)
  const [refreshOnCloseModal, setRefreshOnCloseModal] = useState(false) 
  const noFilters = (
      ('' === searchStr)
      && (typeFilter === null)      
      && (breathableFilter === null)
      && (sortBy === TIME)
      && descending)

  // BANNER ARGUMENTS
  const [alertBannerOpen, setAlertBannerOpen] = useState(false);
  const [alertContent, setAlertContent] = useState<string|null>(null);
  const [alertType, setAlertType] = useState<bannerAlertType>(SUCCESS);

  // MODAL 1 ARGUMENTS
  const [editMode, setEditMode] = useState<editType>(VIEW) 
  const [isModalHidden, setModalHidden] = useState(true)
  const [nameLocked, setNameLocked] = useState(false)
  const [typeLocked, setTypeLocked] = useState(false)
  const [positionLocked, setPositionLocked] = useState(false)
  const [locationType, setLocationType] = useState<string | null>(null)
  const [locationParentName, setLocationParentName] = useState<string | null>(null)
  const [locationParentType, setLocationParentType] = useState<string | null>(null)
  const [locationParentCharted, setLocationParentCharted] = useState<boolean | null>(null)
  const [locationChildren, setLocationChildren] = useState<{name: string, type: string, charted: boolean}[] | null>(null)

  // MODAL 2 ARGUMENTS
  const [chooseLocationModalHidden, setChooseLocationModalHidden] = useState(true)
  const [secondaryModalParentMode, setSecondaryModalParentMode] = useState<boolean | null>(null) // parentMode
  const [newParentName, setNewParentName] = useState<string | null>(null) // can be for a chosen parent or child
  const [newParentType, setNewParentType] = useState<string | null>(null) // can be for a chosen parent or child
  const [newChildName, setNewChildName] = useState<string | null>(null) // can be for a chosen parent or child
  const [newChildType, setNewChildType] = useState<string | null>(null) // can be for a chosen parent or child
  const [excludedListLocations, setExcludedListLocations] = useState<{name:string, type:string}[]>([])

  // MOBILE FORMAT CHECK
  const [isMobile, setIsMobile] = useState(false);
  doMobileFormatCheck(setIsMobile)

  // API CALLS

  // GET INITIAL LOCATIONS
  getInitialLocationsFromAPI(
    searchStr,
    typeFilter,
    breathableFilter,
    sortBy,
    descending,
    setOffset,
    doRefresh,
    setLoadingLocations,
    setNoLocationsExist,
    setMaxInfiniteItemWidth,
    setAllCompressedLocations,
    setEndOfList,
    noFilters)

  // LOAD MORE LOCATIONS
  getMoreLocationsFromAPI(
    offset,
    setOffset,
    searchStr,
    typeFilter,
    breathableFilter,
    sortBy,
    descending,
    loadMoreInView,
    loadingLocations,
    setAllCompressedLocations,
    setMaxInfiniteItemWidth,
    setEndOfList)

  // HELPERS

  const resetLocationFilters = () => {
      setSearchStr('')
      setTypeFilter(null)
      setBreathableFilter(null)
      setSortBy(TIME)
      setDescending(true)
  }

  const refreshLocations = () => {
    // console.log('new location added, list ended loading')
    console.log('Refreshing locations...')
    if (!noFilters) {
      resetLocationFilters()
    }
    setDoRefresh(prev => !prev)
  }

  const triggerAlertBanner = (content:string, type:bannerAlertType) => {
    if (SUCCESS === type) {
      console.log(content)
    } else if (ERROR === type) {
      console.error(content)
    } else { // warning
      console.warn(content)
    }
    
    setAlertContent(content)
    setAlertType(type)
    setAlertBannerOpen(true)
  }

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

  function selectLocationForViewing(location: {name: string, type: string}) {
    // console.log('selected location for viewing: ' + location.name + ', ' + location.type)
    setCurrentCompressedLocation(location)
    setExcludedListLocations([location])

    setEditMode(VIEW)

    setNameLocked(true)
    setTypeLocked(true)

    setRefreshOnCloseModal(false)
    setModalHidden(false)
  }

  function chooseLocationForRelative(location: {name: string, type: string}) {
      if (secondaryModalParentMode) {
          // console.log('choosing parent location: ' + location.name + ', ' + location.type)
          setNewParentName(location.name)
          setNewParentType(location.type)
      } else {
          // console.log('choosing child location: ' + location.name + ', ' + location.type)
          setNewChildName(location.name)
          setNewChildType(location.type)
      }
          setChooseLocationModalHidden(true)
  }

  function addToExcludedList(name: string, type: string) {
      // console.log('adding to excluded list: ' + name + ', ' + type)
      setExcludedListLocations(prev => [...prev, {name, type}])
  }
    
  function removeFromExcludedList(name: string, type: string) {
      // console.log('removing from excluded list: ' + name + ', ' + type)
      setExcludedListLocations(prev => prev.filter(location => location.name !== name || location.type !== type))
  }

  const chooseModalGenerateButton = (locationParentName && locationParentType) ? null : // if parent exists, do ot generate from list (must instead click re-generate)
    <GenerateLocationButton 
      closeModal2={() => setChooseLocationModalHidden(true)} // when generate button is in modal, close modal on press
      parentMode={true} // for both
      addToExcludedListLocations={addToExcludedList} // for both
      removeFromExcludedListLocations={removeFromExcludedList} // for both

      parentNameInput={locationParentName} // for parent
      setParentNameInput={setLocationParentName} // for parent
      parentTypeInput={locationParentType} // for parent
      setParentTypeInput={setLocationParentType} // for parent
      setParentChartedInput={setLocationParentCharted} // for parent
      setPositionInputLocked={setPositionLocked} // for parent
      childType={locationType} // for parent
      childDisordered={DISORDERED === locationType} // for parent
      
      parentType={locationType} // for child
      setCurrentChildren={setLocationChildren} // for child
    />

  // WEPPAGE CONTENT

  // BACK BUTTON
  const BackToGM = (<a href={baseWebUrl + "/routes/gamemanagement"}>{'< Game Management'}</a>);

  const alertBanner = (
    <TimedAlertBanner 
        bannerOpen={alertBannerOpen}
        setBannerOpen={setAlertBannerOpen}
        alertContent={alertContent}
        alertType={alertType}
    />
  )

  // MODAL 1
  const LocationModalDefinition = <ViewLocationModalWrapper 
    isMobile={isMobile}
    isModalHidden={isModalHidden}
    setModalHidden={setModalHidden}
    editMode={editMode}
    setEditMode={setEditMode}
    currentCompressedLocation={currentCompressedLocation}
    setCurrentCompressedLocation={setCurrentCompressedLocation}
    setChooseLocationModalHidden={setChooseLocationModalHidden}
    setSecondaryModalParentMode={setSecondaryModalParentMode}
    newParentName={newParentName}
    setNewParentName={setNewParentName}
    newParentType={newParentType}
    setNewParentType={setNewParentType}
    newChildName={newChildName}
    setNewChildName={setNewChildName}
    newChildType={newChildType}
    setNewChildType={setNewChildType}
    addToExcludedList={addToExcludedList}
    removeFromExcludedList={removeFromExcludedList}
    setExcludedListLocations={setExcludedListLocations}
    nameLocked={nameLocked}
    setNameLocked={setNameLocked}
    locationType={locationType}
    setLocationType={setLocationType}
    typeLocked={typeLocked}
    setTypeLocked={setTypeLocked}
    locationParentName={locationParentName}
    setLocationParentName={setLocationParentName}
    locationParentType={locationParentType}
    setLocationParentType={setLocationParentType}
    locationParentCharted={locationParentCharted}
    setLocationParentCharted={setLocationParentCharted}
    positionLocked={positionLocked}
    setPositionLocked={setPositionLocked}
    locationChildren={locationChildren}
    setLocationChildren={setLocationChildren}
    refreshLocations={refreshLocations}
    resetLocationFilters={resetLocationFilters}
    refreshOnCloseModal={refreshOnCloseModal}
    setRefreshOnCloseModal={setRefreshOnCloseModal}
    triggerAlertBanner={triggerAlertBanner}
  />

  // MODAL 2 
  const ChooseLocationModal = <ChooseLocationModalWrapper 
    chooseLocationModalHidden={chooseLocationModalHidden}
    setChooseLocationModalHidden={setChooseLocationModalHidden}
    secondaryModalParentMode={secondaryModalParentMode}
    excludedListLocations={excludedListLocations}
    allCompressedLocations={allCompressedLocations}
    noLocationsExist={noLocationsExist}
    infiniteItemWidth={infiniteItemWidth}
    loadMoreRef={loadMoreRef}
    endOflist={endOflist}
    resetLocationFilters={resetLocationFilters}
    chooseLocationForRelative={chooseLocationForRelative}
    generateRelativeLocationButton={chooseModalGenerateButton}
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

  // LOCATIONS PAGE TITLE
  const LocationsTitle = (<div 
    style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      position: 'sticky',
      gap: '10px', 
      alignItems: 'center',
      marginLeft: '10px',
      marginRight: (isModalHidden && (false === noLocationsExist)) ? '0px' : '25px',
    }}>
      <h2>Locations</h2>
      {false === noLocationsExist && <CreateLocationButton 
          isModalHidden={isModalHidden}
          setModalHidden={setModalHidden}
          setEditMode={setEditMode}
          setRefreshOnCloseModal={setRefreshOnCloseModal}
      />}
    </div>
  );

  // LOCATIONS PAGE MAIN CONTENT
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
        background: 'darkgrey' 
    }}>
      {/* SORT & FILTER & SEARCH */}
      {false === noLocationsExist && <LocationFilters 
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
      />}
    </div>
    {/* LOADING */}
    {(true  === loadingLocations) ? 
    // not null (at startup) or false (after completion), but during loading
    <div style={{ margin: '10px auto'}}>
      <SpinningLoader/>
    </div> : 
    (false  === loadingLocations) ? 
    // not null (startup) or true (during loading), only after completion
    // LOADING COMPLETE
    <InfiniteLocationList 
      allCompressedLocations={allCompressedLocations}
      mainMode={true} // set true for main page list
      noLocationsExist={noLocationsExist}
      createButton={<CreateLocationButton 
        isModalHidden={isModalHidden}
        setModalHidden={setModalHidden}
        setEditMode={setEditMode}
        setRefreshOnCloseModal={setRefreshOnCloseModal}
      />}
      generateButton={null}
      selectLocation={selectLocationForViewing}
      infiniteItemWidth={infiniteItemWidth}
      loadMoreRef={loadMoreRef}
      endOflist={endOflist}
      excludedLocations={null}
    /> :
    // loading == null (on startup)
    <></>}
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

  // LOCATIONS PAGE FOOTER
  // const LocationsFooter = (<>
  //   Footer Content
  // </>);

  return ( <WebPage 
    backButton={BackToGM} 
    alertBanner={alertBanner}
    title={LocationsTitle}
    locationModal={LocationModalDefinition}
    secondaryModal={ChooseLocationModal}
    content={isModalHidden ? LocationsContent : null} 
    footer={null} />
  )
}
