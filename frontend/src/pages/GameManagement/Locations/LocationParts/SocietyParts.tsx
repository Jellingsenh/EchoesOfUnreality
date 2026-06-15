import TextField from "@mui/material/TextField"

export default function NameInput({
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
        value={currentInput ?? ''}
        style={{ 
            // margin: '5px',
        }} 
        onChange={(input) => {
            // if (input.target.value !== '' && input.target.value.length < 2) {
            //     return
            // }
            // console.log(input.target.value)
            setCurrentInput(input.target.value)
        }}
    />
}