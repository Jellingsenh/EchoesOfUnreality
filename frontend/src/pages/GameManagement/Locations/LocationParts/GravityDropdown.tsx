import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

export default function GravityDropdown({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    // setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentInput: string | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentInputLocked: boolean,
    // setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}) {
    return <FormControl 
        focused={viewMode || currentInputLocked}
        fullWidth
        sx={{ 
        mt: '5px',
        minWidth: 125,
        maxWidth: 125,
        }} 
        size="small"
    >
        <InputLabel id={`gravity-label`}>Gravity</InputLabel>
        <Select
            labelId={`gravity-label`}
            id={'gravity'}
            value={currentInput ?? 'NONE'}
            onChange={(input) => {
                setCurrentInput(input.target.value)
            }}
            label="Gravity"
            slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
            IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
        >
        <MenuItem value={'NONE'}>None</MenuItem>
        <MenuItem value={'LOW'}>Low</MenuItem>
        <MenuItem value={'STANDARD'}>Standard</MenuItem>
        <MenuItem value={'HIGH'}>High</MenuItem>
        <MenuItem value={'SEVERE'}>Severe</MenuItem>
        <MenuItem value={'SINGULARITY'}>Singularity</MenuItem>
        </Select>
    </FormControl>
}