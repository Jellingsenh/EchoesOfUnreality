export default function ViewDiscoverRemoveButton({
    currentInputLocked,
    currentInputCharted,
    setCurrentInputCharted,
    viewThisOne,
    discoverThisOne,
    removeThisOne,
    viewMode,
}:{
    currentInputLocked : boolean | null,
    currentInputCharted: boolean | null,
    setCurrentInputCharted: (charted: boolean | null) => void,
    viewThisOne: () => void | null,
    discoverThisOne: () => void | null,
    removeThisOne: () => void | null,
    viewMode: boolean,
}) {
    return <>
        {!currentInputLocked && <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            marginBottom: '-10px',
            // alignItems: 'center',
            // marginLeft: '5px',
        }}>
            {viewMode ? <button onClick={currentInputCharted ? 
                () => viewThisOne() : 
                () => {
                    discoverThisOne()
                    setCurrentInputCharted(true)
                }
            } 
            style={{
                alignSelf: 'center',
                cursor: 'pointer',
            }}>
                {currentInputCharted ? 'View' : 'Discover'}
            </button> :
             <button style={{
                alignSelf: 'center',
                cursor: 'pointer',
            }}
            onClick={removeThisOne}>
                {'Remove'}
            </button>}
        </div>}
    </>
}