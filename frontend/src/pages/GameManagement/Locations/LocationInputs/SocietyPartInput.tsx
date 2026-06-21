import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

export default function SocietyPartInput({
    inputLabel,
    currentInput,
    setCurrentInput,
    currentInputLocked,
    // setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    inputLabel: string,
    currentInput: string | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentInputLocked: boolean,
    // setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}){
    const [tempInputValue, setTempInputValue] = useState<string | null>(currentInput ?? '')
        
    useEffect(() => {
        setTempInputValue(currentInput ?? '')
    }, [currentInput])

    if (viewMode && (currentInput === null || currentInput === '')) {
        return <></> // josh need to fix spacing still
    }

    const actualInputValue:string|null = (tempInputValue !== '') ? tempInputValue : (currentInput ?? '')
    
    return  <TextField 
        label={inputLabel}
        // helperText=''
        variant='outlined' 
        size='small'
        // sx={{
        //    // Root text color 
        //    input: { color: 'blue' },
        //    // Label color
        //    '& .MuiInputLabel-root': { color: 'blue' }, 
        //    // Border color (Outlined variant)
        //    '& .MuiOutlinedInput-root': {
        //       '& fieldset': { borderColor: 'blue' },
        //       '&:hover fieldset': { borderColor: 'blue' },
        //       '&.Mui-focused fieldset': { borderColor: 'blue' },
        //    },
        // }}
        fullWidth
        multiline
        focused={viewMode || currentInputLocked}
        slotProps={{ htmlInput: { readOnly: viewMode || currentInputLocked } }} 
        // defaultValue={createMode ? null : currentInput}
        value={actualInputValue ?? ''}
        onBlur={() => { // Triggers when user clicks outside the textfield
            setCurrentInput(actualInputValue)
        }} 
        onChange={(input) => {
            if (input.target.value === '') {
                setTempInputValue(null)
            } else {
                setTempInputValue(input.target.value)
            }
        }}
    />
}