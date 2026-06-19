import TextField from "@mui/material/TextField";
import LockInputButton from "../../../../components/helpers/LockInputButton";
import { useState } from "react";

export default function SummaryInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentInput: string | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}){
    const [tempInputValue, setTempInputValue] = useState<string | null>(currentInput ?? '')
    const actualInputValue:string|null = (tempInputValue !== '') ? tempInputValue : (currentInput ?? '')

    function handleSubmit() {
        // console.log('input value submitted: ' + actualInputValue)
        setCurrentInput(actualInputValue ?? '')
    }

    return <div style={{
        // marginLeft: '-5px',
        marginTop: '15px',
        marginBottom: '-20px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // minWidth: '250px',
    }}>
        {!viewMode && <LockInputButton 
            // lockedVariable="summary"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <TextField 
            label='Summary' 
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
            // onKeyDown={(e) => { // muliline textfields should not submit on enter
            //     if (e.key === 'Enter') {
            //         handleSubmit()
            //     } 
            // }}
            onBlur={handleSubmit} // Triggers when user clicks outside the textfield
            onChange={(input) => {
                if (input.target.value === '') {
                    setTempInputValue(null)
                } else {
                    setTempInputValue(input.target.value)
                }
            }}
        />
    </div>
}