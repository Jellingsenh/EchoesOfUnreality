export default function RandomizeUnlockedButton({
    viewMode,
    allFieldsUnlocked,
    allFieldsLocked,
    randomizeUnlockedFields,
}:{
    viewMode: boolean,
    allFieldsUnlocked: boolean,
    allFieldsLocked: boolean,
    randomizeUnlockedFields: () => void,
}) {
    return <>
        {!viewMode && !allFieldsLocked && <button style={{
            // border:'1px solid grey',
            // maxHeight: '20px',
            // maxWidth: '200px',
            // overflow: 'hidden',
            // fontSize: '8px',
            minWidth: 'max-content',
        }}
        onClick={randomizeUnlockedFields}>
            {'Randomize ' + (allFieldsUnlocked ? 'all' : 'unlocked')}
        </button>}
    </>
}