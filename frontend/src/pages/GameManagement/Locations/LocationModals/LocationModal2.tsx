import ChooseParentOrChildModal from "./ChooseParentOrChildModal";
import GenerateLocationButton from "../LocationButtons/GenerateLocationButton";
import InfiniteLocationList from "../LocationsList/InfiniteLocationList";
import LocationFilters from "../LocationsFilterParts/LocationFilters";
import type { Ref } from "react";

export default function LocationModal2({
    chooseLocationModalHidden,
    setChooseLocationModalHidden,
    secondaryModalParentMode,
    locationParentName,
    setLocationParentName,
    locationParentType,
    setLocationParentType,
    setLocationParentCharted,
    locationType,
    addToExcludedList,
    removeFromExcludedList,
    excludedListLocations,
    allCompressedLocations,
    noLocationsExist,
    infiniteItemWidth,
    loadMoreRef,
    endOflist,
    resetLocationFilters,
    setLocationChildren,
    chooseLocationForRelative,
    setPositionLocked,
    searchStr,
    setSearchStr,
    typeFilter,
    setTypeFilter,
    breathableFilter,
    setBreathableFilter,
    sortBy,
    setSortBy,
    descending,
    setDescending,
}:{
    chooseLocationModalHidden: boolean,
    setChooseLocationModalHidden: React.Dispatch<React.SetStateAction<boolean>>,
    secondaryModalParentMode: boolean | null,
    locationParentName: string | null,
    setLocationParentName: React.Dispatch<React.SetStateAction<string | null>>,
    locationParentType: string | null,
    setLocationParentType: React.Dispatch<React.SetStateAction<string | null>>,
    setLocationParentCharted: React.Dispatch<React.SetStateAction<boolean | null>>,
    locationType: string | null,
    addToExcludedList: (name: string, type: string) => void,
    removeFromExcludedList: (name: string, type: string) => void,
    excludedListLocations: {name: string, type: string}[],
    allCompressedLocations: {name: string, type: string}[],
    noLocationsExist: boolean | null,
    infiniteItemWidth: number,
    loadMoreRef: Ref<HTMLDivElement>,
    endOflist: boolean,
    resetLocationFilters: () => void,
    setLocationChildren: React.Dispatch<React.SetStateAction<{ name: string; type: string; charted: boolean; }[] | null>>,
    chooseLocationForRelative: (location: { name: string; type: string; }) => void,  
    setPositionLocked: React.Dispatch<React.SetStateAction<boolean>>,
    searchStr: string | null,
    setSearchStr: React.Dispatch<React.SetStateAction<string | null>>,
    typeFilter: string | null,
    setTypeFilter: React.Dispatch<React.SetStateAction<string | null>>,
    breathableFilter: string | null,
    setBreathableFilter: React.Dispatch<React.SetStateAction<string | null>>,
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    descending: boolean,
    setDescending: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    // MODAL 2 CONTENT

    const ChooseLocationModalContent = (<div style={{
        // border: '1px solid red',
        marginLeft: '-20px',
        marginRight: '-20px',
        // overflowX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // marginTop: '-10px',
        // paddingTop: '10px',
        height: '100%', // needed for infinte list to have a scroll height limit
        minWidth: 'max-content',
        // paddingRight: '200px',
        // paddingLeft: '200px',
        }}>
        {/* SORT & FILTER & SEARCH */}
        <div style={{
            // position: 'fixed',
            alignSelf: 'center',
            // marginTop: '-10px',
            background: '#ccc9c9',
            zIndex: 50,
            // padding: '10px',
            // marginLeft: '-20px',
            // overflowX: 'auto',
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
        <div className='no-scrollbar' style={{
            // border: '1px solid green',
            marginTop: '10px',
            // display: 'flex',
            height: '100%',
            overflowY: 'auto', // josh HERE
        }}>
            <InfiniteLocationList 
            allCompressedLocations={allCompressedLocations}
            noLocationsExist={noLocationsExist}
            mainMode={false} // set false for modal list
            createButton={null}
            generateButton={(locationParentName && locationParentType) ? // parent exists
                null :
                <GenerateLocationButton 
                    closeModal2={() => setChooseLocationModalHidden(true)} // when generate button is in modal, close modal on press
                    parentMode={true} // for both
                    parentNameInput={locationParentName}
                    setParentNameInput={setLocationParentName}
                    parentTypeInput={locationParentType}
                    setParentTypeInput={setLocationParentType}
                    setParentChartedInput={setLocationParentCharted}
                    setPositionInputLocked={setPositionLocked}
                    childType={locationType}
                    childDisordered={'DISORDERED' === locationType}
                    addToExcludedListLocations={addToExcludedList} // for both
                    removeFromExcludedListLocations={removeFromExcludedList} // for both
                    parentType={locationType} // for child
                    setCurrentChildren={setLocationChildren} // for child
            />}
            selectLocation={chooseLocationForRelative}
            infiniteItemWidth={infiniteItemWidth}
            loadMoreRef={loadMoreRef}
            endOflist={endOflist}
            excludedLocations={excludedListLocations}
            />
        </div>
    </div>);
    
    return (<ChooseParentOrChildModal 
        modalContent={ChooseLocationModalContent}
        modalParentMode={secondaryModalParentMode ?? false}
        chooseLocationModalHidden={chooseLocationModalHidden}
        resetLocationFilters={resetLocationFilters}
        setChooseLocationModalHidden={setChooseLocationModalHidden}
    />);
}