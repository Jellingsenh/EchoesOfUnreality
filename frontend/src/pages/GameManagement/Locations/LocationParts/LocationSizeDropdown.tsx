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
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // width: '100%',
        minWidth: 'max-content',
    }}>
        {!viewMode && <LockInputButton 
            // lockedVariable="size"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <FormControl 
            focused={viewMode || currentInputLocked}
            // fullWidth
            sx={{ 
                mt: '5px',
                // width: 'max-content',
                // minWidth: 115,
                // maxWidth: 115,
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
                sx={{
                    width: 'max-content',
                    // minWidth: 70, // keep label visible
                    textAlign: "center",
                    '& .MuiSelect-select': (currentInputLocked || viewMode) ? { paddingRight: '14px !important' } : undefined, // Removes padding space
                    // "& .MuiSelect-select": {
                    //     textAlign: "center", 
                    // }
                }}
                slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
                IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
            >
            <MenuItem value={'SMALL'}>Small</MenuItem>
            <MenuItem value={'STANDARD'}>Standard</MenuItem>
            <MenuItem value={'HUGE'}>Huge</MenuItem>
            <MenuItem value={'MASSIVE'}>Massive</MenuItem>
            </Select>
        </FormControl>
    </div>
}