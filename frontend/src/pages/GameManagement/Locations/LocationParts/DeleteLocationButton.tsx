export default function DeleteLocationButton({
    currentLocationName,
    deleteLocationFromDB,
}:{
    currentLocationName: string | null,
    deleteLocationFromDB: () => void,
}) {
    return <>
        <button style={{
            // border:'1px solid grey',
            // maxHeight: '20px',
            // maxWidth: '200px',
            // overflow: 'hidden',
            // fontSize: '8px',
            // marginRight: '10px',
            minWidth: 'max-content',
        }}
        onClick={deleteLocationFromDB}>
            Delete {currentLocationName}
        </button>
    </>
}
