import { type JSX, type Ref } from "react"
import SpinningLoader from "../../../../components/SpinningLoader"
import LocationListItem from "./LocationListItem"

export default function InfiniteLocationList({
    allCompressedLocations,
    mainMode, // set for false for modal use (true for main page use)
    noLocationsExist, 
    createButton,
    generateButton,
    selectLocation,
    infiniteItemWidth,
    loadMoreRef,
    endOflist,
    excludedLocations,
}:{
    allCompressedLocations: {name:string,type:string}[],
    mainMode: boolean,
    noLocationsExist: boolean | null,
    createButton: JSX.Element | null,
    generateButton: JSX.Element | null,
    selectLocation: (location: {
        name: string,
        type: string,
        // awlays charted
    }) => void,
    infiniteItemWidth: number,
    loadMoreRef: Ref<HTMLDivElement>,
    endOflist: boolean,
    excludedLocations: {name:string,type:string}[] | null,
}) {
    if (noLocationsExist === null) { // startup
        return <></>
    }

    const noValidLocationsSection = <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        // marginTop: '-40px',
    }}>
        <div style={{
            margin: '10px auto',
            marginBottom: '15px',
        }}>
            {'No valid locations found'}
        </div>
        {generateButton}
    </div>

    if (true === noLocationsExist) {
        if (!mainMode) {
            return noValidLocationsSection
        } else {
            return <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
            }}>
                <div style={{
                    margin: '10px auto',
                }}>
                    {'No locations exist yet'}
                </div>
                {createButton}
            </div>
        }
    }

    // only proceeds when false === noLocationsExist

    const includedCompressedLocations = allCompressedLocations.filter((location:{name:string,type:string}) => {
        return !excludedLocations?.some(excluded => excluded.name === location.name && excluded.type === location.type)
    }) // remove excluded before filtering

    return <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // height: '100%',
        // overflowY: 'auto',
        // border: '2px solid yellow',
        // justifyContent: 'center', 
    }}>
        {/* NO DATA */}
        {(0 === includedCompressedLocations.length) ? 
        <div style={{
            marginTop: mainMode ? '10px' : '0px',
            // fontSize: '1.25rem',
        }}>
            {mainMode ? 
                'No locations found' : 
                noValidLocationsSection}
        </div> 
        :
            // DATA
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                // justifyContent: 'center',
                gap: '8px',  
                width: '80%',
                padding: '10px', 
                // height: '100%',
                // overflowY: 'auto',
            }}> 
            {includedCompressedLocations.map((location:{name:string,type:string}, index) => (
                <LocationListItem key={index}
                    infiniteItemWidth={infiniteItemWidth}
                    location={location}
                    selectLocation={selectLocation}
                />
            ))}
            {endOflist ? 
            <></> : 
            <div ref={loadMoreRef} style={{ 
                // zIndex: '9999' // 
            }}>
                <SpinningLoader/>
            </div>}
        </div>}
    </div>
}