import TextField from "@mui/material/TextField";
import LockInputButton from "../../../../components/helpers/LockInputButton";
import OutlinedDiv from "../../../../components/helpers/OutlinedDiv";

export default function PositionOnParent({
    currentXInput,
    setCurrentXInput,
    currentYInput,
    setCurrentYInput,
    currentLocationType,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentXInput: number | null,
    setCurrentXInput: React.Dispatch<React.SetStateAction<number | null>>,
    currentYInput: number | null,
    setCurrentYInput: React.Dispatch<React.SetStateAction<number | null>>,
    currentLocationType: string | null,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}){
    var currentOrbitsParent = false;
    if ('PLANET' === currentLocationType 
     || 'STAR' === currentLocationType 
     || 'MOON' === currentLocationType
     || 'FEATURE' === currentLocationType) {
            currentOrbitsParent = true;
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        gap: '10px',
    }}>
        {!viewMode && <div style={{
            marginTop: '20px',
        }}>
            <LockInputButton 
                // lockedVariable="position"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
        }}>
            <OutlinedDiv 
                label={'Position on parent' + (currentOrbitsParent ? ' (Polar)' : '')}
                locked={currentInputLocked || viewMode}
            >
                <div style={{
                    // border:'1px solid grey',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '5px',
                    marginTop: '10px',
                    // marginLeft: '8%',
                    gap: '10px',
                }}>
                    <TextField
                        focused={viewMode || currentInputLocked}
                        label={currentOrbitsParent ? 'R' : 'X'}
                        type={'number'}
                        size='small'
                        sx={{
                            width: 75,
                            input: { 
                                textAlign: 'center',
                            },
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': (viewMode || currentInputLocked) ? {
                                display: 'none',
                                WebkitAppearance: 'none',
                                margin: 0,
                            } : undefined,
                            '& input[type=number]': (viewMode || currentInputLocked) ? {
                                MozAppearance: 'textfield',
                            }: undefined,
                        }}
                        slotProps={{ htmlInput: { 
                            min: 0,
                            max: 999,
                            readOnly: viewMode || currentInputLocked 
                        } }} 
                        value={currentXInput ?? 0}
                        onChange={(input) => {
                            setCurrentXInput(Number(input.target.value));
                        }}
                    />
                    <TextField
                        focused={viewMode || currentInputLocked}
                        label={currentOrbitsParent ? 'Θ' : 'Y'}
                        type={'number'}
                        size='small'
                        sx={{ 
                            width: 75,
                            input: { 
                                textAlign: 'center',
                            },
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': (viewMode || currentInputLocked) ? {
                                display: 'none',
                                WebkitAppearance: 'none',
                                margin: 0,
                            } : undefined,
                            '& input[type=number]': (viewMode || currentInputLocked) ? {
                                MozAppearance: 'textfield',
                            }: undefined,
                        }}
                        slotProps={{ htmlInput: { 
                            min: 0,
                            max: 999,
                            readOnly: viewMode || currentInputLocked 
                        } }} 
                        value={currentYInput ?? 0}
                        onChange={(input) => {
                            setCurrentYInput(Number(input.target.value));
                        }}
                    />
                </div>
            </OutlinedDiv>
        </div>
    </div>
}
