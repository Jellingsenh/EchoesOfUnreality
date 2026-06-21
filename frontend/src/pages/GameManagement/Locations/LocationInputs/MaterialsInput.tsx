import OutlinedDiv from "../../../../components/OutlinedDiv"
import SingleMaterialInput from "./SingleMaterialInput"

export default function MaterialsInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    // setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentInput: string[] | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    // setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}) {
    if (viewMode && (currentInput === null || currentInput.length === 0 || currentInput.every(item => item.trim() === ''))) {
        return <></> // josh need to fix spacing still
    }
    
    return <OutlinedDiv 
        label={'Materials'}
        locked={currentInputLocked || viewMode}
    >
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: (currentInput && currentInput.length > 0) ? '10px' :'0px',
            marginLeft: '5px',
            marginBottom: ((currentInput && currentInput.length > 0) && currentInputLocked) ? '-5px' : '0px',

        }}>
            {currentInput && currentInput.map((mat, index) => ( <SingleMaterialInput key={index}
                mat={mat}
                index={index}
                setCurrentInput={setCurrentInput}
                currentInputLocked={currentInputLocked}
                viewMode={viewMode}
            /> ))}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
                alignSelf: (currentInput && currentInput.length > 0) ? 'center' : undefined,
            }}>
                {((currentInput && currentInput.length > 0) ? '' : 'No Materials.  ')}
                {!viewMode && !currentInputLocked && <button style={{
                    marginLeft: '5px',
                }}
                onClick={() => {
                    setCurrentInput(prevMats => [...prevMats || [], ''])
                }}>
                    {'Add material'}
                </button>}
            </div>
        </div>
    </OutlinedDiv>
}