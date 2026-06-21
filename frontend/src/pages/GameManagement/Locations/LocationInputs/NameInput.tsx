import TextField from "@mui/material/TextField"
import LockInputButton from "../../../../components/LockInputButton"
import { useState } from "react"

export default function NameInput({
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
    const [tempNameInput, setTempNameInput] = useState<string | null>(currentInput ?? '')
    // console.log('temp: ' + tempNameInput + ', current: ' + currentInput )
    const nameValue:string|null = (tempNameInput !== '') ? tempNameInput : (currentInput ?? '')

    function handleSubmit() {
        // console.log('submitting name: ' + nameValue)
        setCurrentInput(nameValue)
    }

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
            // minWidth: 180,
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
            // placeholder="Name"
            // value ={currentInput ?? ''}
            value={nameValue ?? ''}
            onKeyDown={(e) => { 
                // console.log('key: ' + e.key)
                if (e.key === 'Enter') {
                    handleSubmit()
                } 
            }}
            onBlur={handleSubmit} // Triggers when user clicks outside the textfield
            onChange={(input) => {
                if (input.target.value === '') {
                    // setCurrentInput('') // ignore empty name
                    setTempNameInput(null)
                } else {
                    setTempNameInput(input.target.value)
                }
            }} 
            focused={viewMode || currentInputLocked}
            slotProps={{ htmlInput: { readOnly: viewMode || currentInputLocked } }} 
            // defaultValue={createMode ? null : currentInput} 
            style={{ 
            marginTop: '5px',
            // // marginLeft: '5px',
            marginBottom: '5px',
            }} 
        />
    </>
}


