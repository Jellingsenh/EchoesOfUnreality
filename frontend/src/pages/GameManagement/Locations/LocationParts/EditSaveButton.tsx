export default function EditSaveButton({
    viewMode,
    createMode,
    locationName,
    // currentLocationName,
    setEditMode,
    saveLocationToDB,
    editLocationInDB,
}:{
    viewMode: boolean,
    createMode: boolean,
    locationName: string | null,
    // currentLocationName: string | null,
    setEditMode: (mode: 'VIEW' | 'EDIT' | 'CREATE') => void,
    saveLocationToDB: () => void,
    editLocationInDB: () => void,
}) {
    
    return <button style={{
        // border:'1px solid grey',
        // maxHeight: '20px',
        // maxWidth: '200px',
        // overflow: 'hidden',
        // fontSize: '8px',
        minWidth: 'max-content',
    }}
    onClick={() => {
        if (viewMode) {
            setEditMode('EDIT')
        } else {
            if (createMode) {
                saveLocationToDB()
            } else {
                editLocationInDB()
            }
        }
    }}>
        {(viewMode ? 'Edit ' :'Save ') + 
        ((!locationName || locationName.length === 0) ? 'location' : locationName)}
    </button>
}