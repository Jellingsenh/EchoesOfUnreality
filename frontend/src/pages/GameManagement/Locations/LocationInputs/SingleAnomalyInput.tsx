import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

export default function SingleAnomalyInput({
    anom,
    index,
    setCurrentAnomaly,
    removeCurrentAnomaly,
    currentInputLocked,
    viewMode,
}:{
    anom: string,
    index: number,
    setCurrentAnomaly: (anomaly:string, index:number) => void,
    removeCurrentAnomaly: (anomaly:string) => void,
    currentInputLocked: boolean,
    viewMode: boolean,
}) {
    const [tempInputValue, setTempInputValue] = useState<string | null>(anom ?? '') // decalre hooks at top

    useEffect(() => {
        setTempInputValue(anom ?? '')
    }, [anom])

    if (viewMode && (anom === null || anom === '')) {
        return <></> // 
    }

    const actualInputValue:string|null = (tempInputValue !== '') ? tempInputValue : (anom ?? '')

    function handleSubmit() {
        // console.log('input value submitted: ' + actualInputValue)
        setCurrentAnomaly(actualInputValue ?? '', index)
    }

    return <div style={{
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
            // onKeyDown={(e) => { // no enter sumbitting for multiline textfields
            //     if (e.key === 'Enter') {
            //         handleSubmit()
            //     } 
            // }}
            value={actualInputValue ?? ''}
            onBlur={handleSubmit} // Triggers when user clicks outside the textfield
            onChange={(input) => {
                if (input.target.value === '') {
                    setTempInputValue(null)
                } else {
                    setTempInputValue(input.target.value)
                }
            }}
        />
        {!viewMode && !currentInputLocked && <button style={{
            cursor: 'pointer',
            alignSelf: 'center',
            // marginRight: '5px',
        }}
        onClick={() => {
            removeCurrentAnomaly(anom)
        }}>
            {'Remove'}
        </button>}
    </div>
}