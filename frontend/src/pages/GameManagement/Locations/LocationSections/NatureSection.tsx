import BreathableDropdown from "../LocationDropdowns/BreathableDropdown"
import GravityDropdown from "../LocationDropdowns/GravityDropdown"
import OutlinedDiv from "../../../../components/OutlinedDiv"
import LockInputButton from "../../../../components/LockInputButton"
import MaterialsInput from "../LocationInputs/MaterialsInput"
import EnvironmentsInput from "../LocationInputs/EnvironmentsInput"
import { BREATHABLE, NONE } from "../../../../resources/constants"

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
    const anyNatureInputsPresent = (currentBreathableInput 
        || currentGravityInput 
        || currentEnvironmentInput 
        || currentMaterialInput)

    if (viewMode && !anyNatureInputsPresent) {
        return <></> // 
    }

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
                {anyNatureInputsPresent ? 
                < div style={{
                    // border:'1px solid orange',
                    flexDirection: 'column',
                    display: 'flex',
                    // gap: '5px',
                    margin: '5px',
                    // overflowX: 'auto',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '5px',
                        // overflowX: 'auto',
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
                    <EnvironmentsInput 
                        currentInput={currentEnvironmentInput}
                        setCurrentInput={setCurrentEnvironmentInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    <MaterialsInput 
                        currentInput={currentMaterialInput}
                        setCurrentInput={setCurrentMaterialInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {(!currentMaterialInput || currentMaterialInput.length < 1) 
                    && (!currentEnvironmentInput || currentEnvironmentInput.length < 1) 
                    && (!currentGravityInput || currentGravityInput === NONE) 
                    && (!currentBreathableInput || currentGravityInput === BREATHABLE)
                    && !viewMode &&
                    <button style={{
                        alignSelf: 'center',
                        marginTop: '8px',
                        marginBottom: '-5px',
                        cursor: 'pointer',
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
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    // overflowX: 'auto',
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
                        marginLeft: '5px',
                        // marginBottom: '5px',
                        minWidth: 'max-content',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setCurrentBreathableInput(false)
                        setCurrentGravityInput(NONE)
                        setCurrentEnvironmentInput([''])
                        setCurrentMaterialInput([''])
                    }}>
                        {'Add nature'}
                    </button>}
                </div>}
            </OutlinedDiv>
        </div>
    </div>
}
