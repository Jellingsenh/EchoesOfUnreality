
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import LockInputButton from "../../../../components/LockInputButton"

export default function LocationModifierDropdown({
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
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // width: '100%',
        minWidth: 'max-content',
    }}>
        {!viewMode && <LockInputButton 
            // lockedVariable="modifier"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <FormControl 
            focused={viewMode || currentInputLocked}
            // fullWidth
            sx={{ 
                mt: '5px',
                // width: 'max-content',
                // minWidth: 80,
                // maxWidth: 130,
            }} 
            size="small"
        >
            <InputLabel id={`modifier-label`}>Modifier</InputLabel>
            <Select
                labelId={`modifier-label`}
                id={'modifier'}
                value={currentInput ?? 'NONE'}
                onChange={(input) => {
                    setCurrentInput(input.target.value)
                }}
                label="Modifier"
                sx={{
                    width: 'max-content',
                    minWidth: 70, // keep label visible
                    textAlign: "center",
                    '& .MuiSelect-select': (currentInputLocked || viewMode) ? { paddingRight: '14px !important' } : undefined, // Removes padding space
                    // "& .MuiSelect-select": {
                    //     textAlign: "center", 
                    // }
                }}
                slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
                IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
            >
            <MenuItem value={'NONE'}>None</MenuItem>
            <MenuItem value={'CONTRARY'}>Contrary</MenuItem>
            <MenuItem value={'DISORDERED'}>Disordered</MenuItem>
            <MenuItem value={'DESERTED'}>Deserted</MenuItem>
            <MenuItem value={'VOLATILE'}>Volatile</MenuItem>
            <MenuItem value={'EXTREME'}>Extreme</MenuItem>
            <MenuItem value={'UNREAL'}>Unreal</MenuItem>
            </Select>
        </FormControl>
    </div>
}