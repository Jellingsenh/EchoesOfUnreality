import TextField from "@mui/material/TextField"
import OutlinedDiv from "../../../../components/helpers/OutlinedDiv"

export default function EnvironmentInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    // setCurrentInputLocked,
    viewMode,
}:{
    currentInput: string[] | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    // setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
}) {
    return <OutlinedDiv 
        label={'Environments'}
        locked={currentInputLocked || viewMode}
    >
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: (currentInput && currentInput.length > 0) ? '10px' : '0px',
            marginLeft: '5px',
            marginBottom: ((currentInput && currentInput.length > 0) && currentInputLocked) ? '-5px' : '0px',
        }}>
            {currentInput && currentInput.map((env, index) => (
            <div key={index} style={{
                // border:'1px solid grey',
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
            }}>
                <TextField 
                    fullWidth
                    multiline
                    label={'Envirionment ' + (index + 1)}
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
                    // defaultValue={createMode ? null : env}
                    value={env}
                    style={{ 
                        // marginTop: '5px',
                        // marginLeft: '-5px',
                        // marginBottom: '5px',
                    }} 
                    onChange={(input) => {
                        setCurrentInput(prevEnvs => {
                            if (!prevEnvs) return prevEnvs
                            return prevEnvs.map((env, i) => 
                                i === index ? 
                                    input.target.value : 
                                    env
                            )
                        })
                    }}
                />
                {!viewMode && !currentInputLocked && <button style={{
                    alignSelf: 'center',
                }}
                onClick={() => {
                    const newEnvironments = [...currentInput!]
                    newEnvironments.splice(index, 1)
                    setCurrentInput(newEnvironments)
                }}>
                    {'Remove'}
                </button>}
            </div>
            ))}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5px',
            }}>
                {((currentInput && currentInput.length > 0) ? '' : 'No Environments.  ')}
                {!viewMode && !currentInputLocked && <button style={{
                    marginLeft: '5px',
                }}
                onClick={() => {
                    const newEnvironments = currentInput ? [...currentInput] : []
                    newEnvironments.push('')
                    setCurrentInput(newEnvironments)
                }}>
                    {'  Add environment'}
                </button>}
            </div>
        </div>
    </OutlinedDiv>
}