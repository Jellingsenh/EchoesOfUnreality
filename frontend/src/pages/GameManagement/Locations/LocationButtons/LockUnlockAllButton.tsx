export default function LockUnlockAllButton({
    allInputsUnlocked,
    lockAllInputs,
    unlockAllInputs,
    viewMode,
}:{
    allInputsUnlocked: () => boolean,
    lockAllInputs: () => void,
    unlockAllInputs: () => void,
    viewMode: boolean,
}) {
    return <>
        {!viewMode && <button style={{
            // border:'1px solid grey',
            // maxHeight: '20px',
            // maxWidth: '200px',
            // overflow: 'hidden',
            // fontSize: '8px',
            minWidth: 'max-content',
        }}
        onClick={() => {
            if (allInputsUnlocked()) {
                lockAllInputs()
            } else {
                unlockAllInputs()
            }  
        }}>
            {allInputsUnlocked() ? 
                'Lock all' : 
                'Unlock all'}
        </button>}
    </>
}