import TextField from "@mui/material/TextField"
import LockInputButton from "../../../../components/helpers/LockInputButton"

export default function NameInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
    createMode,
}:{
    currentInput: string | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    createMode: boolean,
}){
    return <>
        {!viewMode && <LockInputButton 
            // lockedVariable="name"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <TextField 
            fullWidth
            label='Name' 
            // helperText={viewModeActive ? ' ' : 'Name & type must be unique'}
            variant='outlined' 
            size='small'
            sx={{
            minWidth: 180,
            // Root text color // JOSH HERE FINISH COLORS THEN KEEP SETTIN GUP
            // input: { color: 'blue' },
            // Label color
            // '& .MuiInputLabel-root': { color: 'blue' }, 
            // Border color (Outlined variant)
            // '& .MuiOutlinedInput-root': {
                // '& fieldset': { borderColor: 'blue' },
                // '&:hover fieldset': { borderColor: 'blue' },
                // '&.Mui-focused fieldset': { borderColor: 'blue' },
            // },
            }}
            focused={viewMode || currentInputLocked}
            slotProps={{ htmlInput: { readOnly: viewMode || currentInputLocked } }} 
            defaultValue={createMode ? null : currentInput} 
            style={{ 
            marginTop: '5px',
            // // marginLeft: '5px',
            marginBottom: '5px',
            }} 
            onChange={(input) => {
                if (input.target.value !== '' && input.target.value.length < 2) {
                    return
                }
                // console.log(input.target.value)
                setCurrentInput(input.target.value)
            }}
        />
    </>
}


