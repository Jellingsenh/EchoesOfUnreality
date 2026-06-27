import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

export default function SingleMaterialInput({
    mat,
    index,
    setCurrentInput,
    currentInputLocked,
    viewMode,
}:{
    mat: string,
    index: number,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    viewMode: boolean,
}) {
    const [tempInputValue, setTempInputValue] = useState<string | null>(mat ?? '')
    
    useEffect(() => {
        setTempInputValue(mat ?? '')
    }, [mat])

    if (viewMode && (mat === null || mat === '')) {
        return <></> // 
    }

    const actualInputValue:string|null = (tempInputValue !== '') ? tempInputValue : (mat ?? '')

    return <div style={{
        // border:'1px solid grey',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        minWidth:'300px',
    }}>
        <TextField 
            fullWidth
            multiline
            label={'Material ' + (index + 1)}
            // helperText={viewModeActive ? ' ' : 'Name & type must be unique'}
            variant='outlined' 
            size='small'
            // sx={{
                // minWidth: 180,
                // Root text color
                // input: { color: 'blue' },
                // Label color
                // '& .MuiInputLabel-root': { color: 'blue' }, 
                // Border color (Outlined variant)
                // '& .MuiOutlinedInput-root': {
                // '& fieldset': { borderColor: 'blue' },
                // '&:hover fieldset': { borderColor: 'blue' },
                // '&.Mui-focused fieldset': { borderColor: 'blue' }, 
                // },
            // }}
            focused={viewMode || currentInputLocked}
            slotProps={{ htmlInput: { readOnly: viewMode || currentInputLocked } }} 
            // defaultValue={createMode ? null : mat}
            value={actualInputValue ?? ''}
            onBlur={() => { // Triggers when user clicks outside the textfield
                setCurrentInput(prevMats => {
                    if (!prevMats) return prevMats
                    return prevMats.map((material, i) => 
                        i === index ? 
                            actualInputValue ?? '' : 
                            material
                    )
                })
            }} 
            onChange={(input) => {
                if (input.target.value === '') {
                    setTempInputValue(null)
                } else {
                    setTempInputValue(input.target.value)
                }
            }}
        />
        {!viewMode && !currentInputLocked && <button style={{
            alignSelf: 'center',
            cursor: 'pointer',
        }}
        onClick={() => {
            setCurrentInput(prevItems => {
                if (!prevItems) return prevItems
                return prevItems.filter(item => item !== mat)
            })
        }}>
            {'Remove'}
        </button>}
    </div>
}