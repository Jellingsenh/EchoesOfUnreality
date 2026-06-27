import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LockInputButton from "../../../../components/LockInputButton";
import { AREA, CITY, CONTINENT, COUNTRY, DIMENSION, FEATURE, GALAXY, MOON, PLACE, PLANET, SPACE, STAR, UNIVERSE } from "../../../../resources/constants";

export default function LocationTypeDropdown({
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
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // width: '100%',
        minWidth: 'max-content',
    }}>
        {!viewMode && <LockInputButton 
            // lockedVariable="type"
            locked={currentInputLocked}
            setLocked={setCurrentInputLocked}
        />}
        <FormControl 
            focused={viewMode || currentInputLocked}
            // fullWidth
            sx={{ 
                mt: '5px',
                // width: 'max-content',
                // mb: '5px',
                // minWidth: 125,
                // maxWidth: 125,
            }} 
            size="small"
        >
            <InputLabel id={`type-label`}>Type</InputLabel>
            <Select
                slotProps={{ input: { readOnly: currentInputLocked || viewMode } }} 
                IconComponent={ (currentInputLocked || viewMode) ? () => null : undefined } // Removes icon
                // aria-describedby={`type-helper-text`}
                sx={{
                    width: 'max-content',
                    // minWidth: 70, // keep label visible
                    textAlign: "center",
                    '& .MuiSelect-select': (currentInputLocked || viewMode) ? { paddingRight: '14px !important' } : undefined, // Removes padding space
                    // "& .MuiSelect-select": {
                    //     textAlign: "center", 
                    // }
                }}
                labelId={`type-label`}
                id={'type'}
                value={currentInput ?? ''}
                onChange={(input) => {
                    setCurrentInput(input.target.value);
                }}
                label="Type"
            >
                <MenuItem value={PLACE}>Place</MenuItem>
                <MenuItem value={CITY}>City</MenuItem>
                <MenuItem value={AREA}>Area</MenuItem>
                <MenuItem value={COUNTRY}>Country</MenuItem>
                <MenuItem value={CONTINENT}>Continent</MenuItem>
                <MenuItem value={FEATURE}>Feature</MenuItem>
                <MenuItem value={MOON}>Moon</MenuItem>
                <MenuItem value={PLANET}>Planet</MenuItem>
                <MenuItem value={STAR}>Star</MenuItem>
                <MenuItem value={SPACE}>Space</MenuItem>
                <MenuItem value={GALAXY}>Galaxy</MenuItem>
                <MenuItem value={UNIVERSE}>Universe</MenuItem>
                <MenuItem value={DIMENSION}>Dimension</MenuItem>
            </Select>
            {/* <FormHelperText id={`type-helper-text`}>
            {viewModeActive ? ' ' : 'Name & type must be unique'}
            </FormHelperText> */}
        </FormControl>
    </div>
}