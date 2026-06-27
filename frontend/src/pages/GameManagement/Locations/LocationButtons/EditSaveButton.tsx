export default function EditSaveButton({
    viewMode,
    createMode,
    locationName,
    // currentLocationName,
    setEditMode,
    setNameAndTypeLocked,
    takeLocationSnapshot,
    saveLocationToDB,
    editLocationInDB,
    doDeleteImageOnEdit,
    deleteLocationImageInDB,
    anyDataPresent,
    anyDataChanged,
}:{
    viewMode: boolean,
    createMode: boolean,
    locationName: string | null,
    // currentLocationName: string | null,
    setEditMode: (mode: 'VIEW' | 'EDIT' | 'CREATE') => void,
    setNameAndTypeLocked: () => void,
    takeLocationSnapshot: () => void,
    saveLocationToDB: () => void,
    editLocationInDB: () => void,
    doDeleteImageOnEdit: boolean,
    deleteLocationImageInDB: () => void,
    anyDataPresent: boolean,
    anyDataChanged: boolean,
}) {
    return <button style={{
        // border:'1px solid grey',
        // maxHeight: '20px',
        // maxWidth: '200px',
        // overflow: 'hidden',
        // fontSize: '8px',
        minWidth: 'max-content',
        cursor: 'pointer',
    }}
    onClick={() => {
        if (viewMode) {
            setEditMode('EDIT')
            setNameAndTypeLocked()
            takeLocationSnapshot()
        } else {
            if (createMode) {
                if (anyDataPresent) {
                    saveLocationToDB()
                } else {
                    console.log('No data present. Cannot save.')
                }
                
            } else {
                if (anyDataChanged) {
                    editLocationInDB()
                    if (doDeleteImageOnEdit) {
                        deleteLocationImageInDB()
                    }
                } else {
                    console.log('No data changed. Will not edit unless data changes.')
                }
            }
        }
    }}>
        {(viewMode ? 'Edit ' :'Save ') + 
        ((!locationName || locationName.length === 0) ? 'location' : locationName)}
    </button>
}