export default function SetCurrentButton({
    currentLocationName,
    viewMode,
}:{
    currentLocationName: string | null,
    viewMode: boolean,
}){
    return <>
        {viewMode && <button 
        style={{
            // border:'1px solid grey',
            // maxHeight: '20px',
            // maxWidth: '200px',
            // overflow: 'hidden',
            // fontSize: '8px',
            minWidth: 'max-content',
        }}>
            Set {currentLocationName} as current location (tbd)
        </button>}
    </>
}