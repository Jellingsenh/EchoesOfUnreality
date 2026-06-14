import TextField from "@mui/material/TextField"
import OutlinedDiv from "../../../../components/helpers/OutlinedDiv"

export default function MaterialInput({
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
            {currentInput && currentInput.map((mat, index) => (
            <div key={index} style={{
                // border:'1px solid grey',
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
                minWidth:'300px',
            }}>
                <TextField 
                    fullWidth
                    multiline
                    label={'Material ' + (index + 1)}
                    // helperText={viewModeActive ? ' ' : 'Name & type must be unique'}
                    variant='outlined' 
                    size='small'
                    // sx={{
                        // minWidth: 180,
                        // Root text color
                        // input: { color: 'blue' },
                        // Label color
                        // '& .MuiInputLabel-root': { color: 'blue' }, 
                        // Border color (Outlined variant)
                        // '& .MuiOutlinedInput-root': {
                        // '& fieldset': { borderColor: 'blue' },
                        // '&:hover fieldset': { borderColor: 'blue' },
                        // '&.Mui-focused fieldset': { borderColor: 'blue' }, 
                        // },
                    // }}
                    focused={viewMode || currentInputLocked}
                    slotProps={{ htmlInput: { readOnly: viewMode || currentInputLocked } }} 
                    // defaultValue={createMode ? null : mat}
                    value={mat}
                    style={{ 
                        // marginTop: '5px',
                        // marginLeft: '-5px',
                        // marginBottom: '10px',
                    }} 
                    onChange={(input) => {
                        setCurrentInput(prevMats => {
                            if (!prevMats) return prevMats
                            return prevMats.map((material, i) => 
                                i === index ? 
                                    input.target.value : 
                                    material
                            )
                        })
                    }}
                />
                {!viewMode && !currentInputLocked && <button style={{
                    alignSelf: 'center',
                }}
                onClick={() => {
                    const newMaterials = [...currentInput!]
                    newMaterials.splice(index, 1)
                    setCurrentInput(newMaterials)
                }}>
                    {'Remove'}
                </button>}
            </div>
            ))}
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
                    const newMaterials = currentInput ? [...currentInput] : []
                    newMaterials.push('')
                    setCurrentInput(newMaterials)
                }}>
                    {'Add material'}
                </button>}
            </div>
        </div>
    </OutlinedDiv>
}