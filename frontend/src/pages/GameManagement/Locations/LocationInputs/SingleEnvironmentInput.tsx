import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

export default function SingleEnvironmentInput({
    env,
    index,
    setCurrentInput,
    currentInputLocked,
    viewMode,
}:{
    env: string,
    index: number,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    viewMode: boolean,
}) {
    const [tempInputValue, setTempInputValue] = useState<string | null>(env ?? '')
    
    useEffect(() => {
        setTempInputValue(env ?? '')
    }, [env])

    const actualInputValue:string|null = (tempInputValue !== '') ? tempInputValue : (env ?? '')

    return <div style={{
        // border:'1px solid grey',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        minWidth: '300px',
        // width: '100%',
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
            value={actualInputValue  ?? ''}
            onBlur={() => { // Triggers when user clicks outside the textfield
                setCurrentInput(prevEnvs => {
                    if (!prevEnvs) return prevEnvs
                    return prevEnvs.map((env, i) => 
                        i === index ? 
                            actualInputValue  ?? '': 
                            env
                    )
                })
            }} 
            onChange={(input) => {
                if (input.target.value === '') {
                    setTempInputValue(null)
                } else {
                    setTempInputValue(input.target.value)
                }
            }}
        />
        {!viewMode && !currentInputLocked && <button style={{
            alignSelf: 'center',
        }}
        onClick={() => {
            setCurrentInput(prevItems => {
                if (!prevItems) return prevItems
                return prevItems.filter(item => item !== env)
            })
        }}>
            {'Remove'}
        </button>}
    </div>
}