import BreathableDropdown from "./BreathableDropdown"
import GravityDropdown from "./GravityDropdown"
import EnvironmentInput from "./EnvironmentInput"
import MaterialInput from "./MaterialInput"
import OutlinedDiv from "../../../../components/helpers/OutlinedDiv"
import LockInputButton from "../../../../components/helpers/LockInputButton"

export default function NatureSection({
    currentBreathableInput,
    setCurrentBreathableInput,
    currentGravityInput,
    setCurrentGravityInput,
    currentEnvironmentInput,
    setCurrentEnvironmentInput,
    currentMaterialInput,
    setCurrentMaterialInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentBreathableInput: boolean | null,
    setCurrentBreathableInput: React.Dispatch<React.SetStateAction<boolean | null>>,
    currentGravityInput: string | null,
    setCurrentGravityInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentEnvironmentInput: string[] | null,
    setCurrentEnvironmentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentMaterialInput: string[] | null,
    setCurrentMaterialInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
    // createMode: boolean,
}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {!viewMode && <div style={{
            marginTop: '20px',
        }}>
            <LockInputButton 
                // lockedVariable="nature"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
        }}>
            <OutlinedDiv 
                label={'Nature'}
                locked={currentInputLocked || viewMode}
            >
                {(currentBreathableInput 
                || currentGravityInput 
                || currentEnvironmentInput 
                || currentMaterialInput) ? 
                < div style={{
                    // border:'1px solid orange',
                    flexDirection: 'column',
                    display: 'flex',
                    // gap: '5px',
                    margin: '5px',
                    // overflowX: 'auto',
                }}>
                    <div className='no-scrollbar' style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        overflowX: 'auto',
                        // marginTop: '5px',
                        // marginBottom: '5px',
                    }}>
                        <BreathableDropdown 
                            currentInput={currentBreathableInput}
                            setCurrentInput={setCurrentBreathableInput}
                            currentInputLocked={currentInputLocked}
                            viewMode={viewMode}
                        />
                        <GravityDropdown 
                            currentInput={currentGravityInput}
                            setCurrentInput={setCurrentGravityInput}
                            currentInputLocked={currentInputLocked}
                            viewMode={viewMode}
                        />
                    </div>
                    <EnvironmentInput 
                        currentInput={currentEnvironmentInput}
                        setCurrentInput={setCurrentEnvironmentInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    <MaterialInput 
                        currentInput={currentMaterialInput}
                        setCurrentInput={setCurrentMaterialInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {(!currentMaterialInput || currentMaterialInput.length < 1) 
                    && (!currentEnvironmentInput || currentEnvironmentInput.length < 1) 
                    && (!currentGravityInput || currentGravityInput === 'NONE') 
                    && !currentBreathableInput
                    && <button style={{
                        alignSelf: 'center',
                        marginTop: '10px',
                        marginBottom: '-5px',
                    }}
                    onClick={() => {
                        setCurrentBreathableInput(null)
                        setCurrentGravityInput(null)
                        setCurrentEnvironmentInput(null)
                        setCurrentMaterialInput(null)
                    }}>
                        {'Remove nature'}
                    </button>}
                </div> : 
                <div className='no-scrollbar' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    overflowX: 'auto',
                    // margin: '5px',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                        marginLeft: '5px',
                    }}>
                        {'No nature found.  '}
                    </div>
                    {!viewMode && !currentInputLocked && <button style={{
                        // border:'1px solid red', 
                        // marginLeft: '10px',
                        // marginBottom: '5px',
                        minWidth: 'max-content',
                    }}
                    onClick={() => {
                        setCurrentBreathableInput(false)
                        setCurrentGravityInput('NONE')
                        setCurrentEnvironmentInput([''])
                        setCurrentMaterialInput([''])
                    }}>
                        {'Add Nature'}
                    </button>}
                </div>}
            </OutlinedDiv>
        </div>
    </div>
}
