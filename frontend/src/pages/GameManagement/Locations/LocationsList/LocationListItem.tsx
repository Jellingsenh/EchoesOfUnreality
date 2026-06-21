export default function LocationListItem({
    infiniteItemWidth,
    location,
    selectLocation,
}:{
    infiniteItemWidth: number,
    location: {name: string, type: string},
    selectLocation: (location: {name: string, type: string}) => void,
}) {
    return <div className="fadeInItem" style={{
        borderRadius: '5px',
        height: '20px',
        background: 'lightblue',
        filter: 'drop-shadow(1px 1px 2px black)',
        transition: 'width 0.2s ease',
        alignSelf: 'center',
        width: infiniteItemWidth+60+'px',
        padding: '5px 0px',
    }} 
    onClick={() => {
        // console.log('selecting location:', location.name)
        selectLocation(location)
    }}>
        <div style={{ 
            justifyContent: 'center',
            display: 'flex', 
            alignItems: 'center', 
            height: '100%', 
        }}>
            {location.name}
        </div>
    </div>
}