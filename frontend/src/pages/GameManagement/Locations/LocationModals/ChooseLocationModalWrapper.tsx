import ChooseParentOrChildModal from "./ChooseLocationModal";
import InfiniteLocationList from "../LocationsList/InfiniteLocationList";
import LocationFilters from "../LocationsFilterParts/LocationFilters";
import type { JSX, Ref } from "react";

export default function ChooseLocationModalWrapper({
    chooseLocationModalHidden,
    setChooseLocationModalHidden,
    secondaryModalParentMode,
    excludedListLocations,
    allCompressedLocations,
    noLocationsExist,
    infiniteItemWidth,
    loadMoreRef,
    endOflist,
    resetLocationFilters,
    chooseLocationForRelative,
    generateRelativeLocationButton,
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
    excludedListLocations: {name: string, type: string}[],
    allCompressedLocations: {name: string, type: string}[],
    noLocationsExist: boolean | null,
    infiniteItemWidth: number,
    loadMoreRef: Ref<HTMLDivElement>,
    endOflist: boolean,
    resetLocationFilters: () => void,
    chooseLocationForRelative: (location: { name: string; type: string; }) => void,  
    generateRelativeLocationButton: JSX.Element | null,
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
                generateButton={generateRelativeLocationButton}
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