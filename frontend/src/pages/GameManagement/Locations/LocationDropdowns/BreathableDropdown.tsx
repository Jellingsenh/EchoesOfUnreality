import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function BreathableDropdown({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    // setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentInput: boolean | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<boolean | null>>,
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
            width: 'max-content',
            // minWidth: 155,
            // maxWidth: 155,
        }} 
        size="small"
    >
        <InputLabel id={`breathable-label`}>Breathable</InputLabel>
        <Select
            labelId={`breathable-label`}
            id={'breathable'}
            value={currentInput ? 'Breathable' : 'Not Breathable'}
            onChange={(input) => {
                setCurrentInput(input.target.value === 'Breathable')
            }}
            label="Breathable"
            sx={{
                textAlign: "center",
                '& .MuiSelect-select': (currentInputLocked || viewMode) ? { paddingRight: '14px !important' } : undefined, // Removes padding space
                // "& .MuiSelect-select": {
                //     textAlign: "center", 
                // }
            }}
            slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
            IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
        >
        <MenuItem value={'Breathable'}>Breathable</MenuItem>
        <MenuItem value={'Not Breathable'}>Not Breathable</MenuItem>
        </Select>
    </FormControl>
    
}