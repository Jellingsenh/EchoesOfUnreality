import TextField from "@mui/material/TextField";
import OutlinedDiv from "../../../../components/helpers/OutlinedDiv";
import LockInputButton from "../../../../components/helpers/LockInputButton";

export default function LocationAnomalyInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
}:{
    currentInput: string[] | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
}) {
    // console.log('rendering anomaly input with current input: ', currentInput)

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // minWidth: '250px',
    }}>
        {!viewMode && <div style={{
            marginTop: '20px',
        }}>
            <LockInputButton 
                // lockedVariable="anomalies"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
            // overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Anomalies'}
                locked={currentInputLocked || viewMode}
            >
                <div style={{
                    // border:'1px solid green', 
                    // width: '100%',
                    alignSelf: 'start',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '5px',
                    marginTop: (currentInput && currentInput.length > 0) ? '10px' : '0px',
                    // marginRight: '10px',
                    marginBottom: ((currentInput && currentInput.length > 0) && currentInputLocked) ? '-5px' : '0px',
                }}>
                    {/* map anomalies */}
                    {currentInput?.map((anom: string, index) => (
                    <div key={index} style={{
                        // border:'1px solid grey',
                        // width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        marginRight: '5px',
                    }}>
                        {/* ANOMALY INPUT */}
                        <TextField 
                            fullWidth
                            multiline
                            label={'Anomaly ' + (index + 1)}
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
                            focused={viewMode}
                            slotProps={{ htmlInput: { readOnly: viewMode } }} 
                            // defaultValue={(createMode && !anom) ? null : anom}
                            value={anom}
                            
                            style={{ 
                                // marginTop: '5px',
                                // marginLeft: '-5px',
                                // marginBottom: '5px',
                            }} 
                            onChange={(input) => {
                                setCurrentInput(prevAnoms => {
                                    if (!prevAnoms) return prevAnoms
                                    return prevAnoms.map((anomaly, i) => 
                                        i === index ? 
                                            input.target.value : 
                                            anomaly
                                    )
                                })
                            }}
                        />
                        {!viewMode && !currentInputLocked && <button style={{
                            alignSelf: 'center',
                            // marginRight: '5px',
                        }}
                        onClick={() => {
                            setCurrentInput(prevItems => {
                                 if (!prevItems) return prevItems
                                return prevItems.filter(item => item !== anom)
                            })
                        }}>
                            {'Remove'}
                        </button>}
                    </div>))}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        // marginTop: '-10px',
                        // overflowX: 'auto',
                    }}>
                        <div style={{
                            minWidth: 'max-content',
                        }}>
                            {((currentInput && currentInput.length > 0) ? '' : 'No anomalies found.  ')}
                        </div>
                        {!viewMode && !currentInputLocked && <button style={{
                            marginLeft: '5px',
                            // marginBottom: '5px',
                            minWidth: 'max-content',
                            
                        }} onClick={() => {
                            const newAnomalies = (currentInput && currentInput.length > 0) ? [...currentInput, ''] : ['']
                            setCurrentInput(newAnomalies)                       
                        }}>
                            {'Add anomaly'}
                        </button>}
                    </div>
                </div>
            </OutlinedDiv>
        </div>
    </div>
}