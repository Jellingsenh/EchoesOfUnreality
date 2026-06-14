import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import LockInputButton from "../../../../components/helpers/LockInputButton"

export default function LocationSizeDropdown({
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
}) {
    return <>
        {!viewMode && <LockInputButton 
            // lockedVariable="size"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <FormControl 
            focused={viewMode || currentInputLocked}
            fullWidth
            sx={{ 
            mt: '5px',
            minWidth: 115,
            maxWidth: 115,
            }} 
            size="small"
        >
            <InputLabel id={`size-label`}>Size</InputLabel>
            <Select
                labelId={`size-label`}
                id={'size'}
                value={currentInput ?? ''}
                onChange={(input) => {
                    setCurrentInput(input.target.value)
                }}
                label="Size"
                slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
                IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
            >
            <MenuItem value={'SMALL'}>Small</MenuItem>
            <MenuItem value={'STANDARD'}>Standard</MenuItem>
            <MenuItem value={'HUGE'}>Huge</MenuItem>
            <MenuItem value={'MASSIVE'}>Massive</MenuItem>
            </Select>
        </FormControl>
    </>
}