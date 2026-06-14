export default function RandomizeUnlockedButton({
    viewMode,
    randomizeUnlockedFields,
}:{
    viewMode: boolean,
    randomizeUnlockedFields: () => void,
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
        onClick={randomizeUnlockedFields}>
            Randomize unlocked
        </button>}
    </>
}