import type { Ref } from "react"
import SpinningLoader from "../../../../components/SpinningLoader"


export default function InfiniteLocationList({
    allCompressedLocations,
    selectLocation,
    infiniteItemWidth,
    loadMoreRef,
    endOflist,
    excludedLocations,
}:{
    allCompressedLocations: {name:string,type:string}[],
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
    const includedCompressedLocations = allCompressedLocations.filter((location:{name:string,type:string}) => {
        return !excludedLocations?.some(excluded => excluded.name === location.name && excluded.type === location.type)
    }) // remove excluded before filtering

    return <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // border: '1px solid lightgrey',
        // justifyContent: 'center', 
    }}>
    {/* NO DATA */}
    {includedCompressedLocations.length === 0 ? 
        <div style={{
        marginTop: '20px',
        // fontSize: '1.25rem',
        }}>
        {'No locations found'}
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
        }}> 
        {includedCompressedLocations.map((location:{name:string,type:string}, index) => (
            <div className="fadeInItem" style={{
                borderRadius: '5px',
                height: '20px',
                background: 'lightblue',
                filter: 'drop-shadow(1px 1px 2px black)',
                transition: 'width 0.2s ease',
                alignSelf: 'center',
                width: infiniteItemWidth+60+'px',
                padding: '5px 0px',
            }} 
            key={index} 
            onClick={(e) => {
                e.stopPropagation() // this stops the clickOut event
                selectLocation(location)
                // if (parentSelectMode) {
                //   setParentFilter({name: location.name, type: location.type})
                //   setParentSelectMode(false)
                //   setTypeFilter(null)
                //   setBreathableFilter(null)
                // } else {
                    // selectLocation(location)
                    // setEditMode('VIEW')
                    // setModalHidden(false)
                    // console.log('clicked location: ' + JSON.stringify(location))
                // }
            }}>
                <div style={{ 
                    justifyContent: 'center',
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '100%', 
                    // marginLeft: '30px',
                    // marginRight: '30px',
                    // fontSize: '1.25rem' 
                    }}>
                    {location.name}
                </div>
            </div>
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