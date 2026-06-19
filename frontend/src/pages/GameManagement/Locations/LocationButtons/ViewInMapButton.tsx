export default function ViewInMapButton({
    currentLocationName,
    viewMode,
}:{
    currentLocationName: string | null,
    viewMode: boolean,
}) {
    return <>
        {viewMode &&<button style={{
            // border:'1px solid grey',
            // maxHeight: '20px',
            // maxWidth: '200px',
            // overflow: 'hidden',
            // fontSize: '8px',
            // marginRight: '10px',
            minWidth: 'max-content',
        }}>
            View {currentLocationName} in map (tbd)
        </button>}
    </>
}
