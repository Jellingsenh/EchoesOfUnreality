import OutlinedDiv from "../../../../components/helpers/OutlinedDiv"
import LockInputButton from "../../../../components/helpers/LockInputButton"
import SocietyParts from "./SocietyParts"

export default function SocietySection({
    currentHistoryInput,
    setCurrentHistoryInput,
    currentReligionInput,
    setCurrentReligionInput,
    currentTechnologyInput,
    setCurrentTechnologyInput,
    currentCultureInput,
    setCurrentCultureInput,
    currentGovernmentInput,
    setCurrentGovernmentInput,
    currentEconomyInput,
    setCurrentEconomyInput,
    currentSecretsInput,
    setCurrentSecretsInput,
    currentAlliesInput,
    setCurrentAlliesInput,
    currentEnemiesInput,
    setCurrentEnemiesInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
    // createMode,
}:{
    currentHistoryInput: string | null,
    setCurrentHistoryInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentReligionInput: string | null,
    setCurrentReligionInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentTechnologyInput: string | null,
    setCurrentTechnologyInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentCultureInput: string | null,
    setCurrentCultureInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentGovernmentInput: string | null,
    setCurrentGovernmentInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentEconomyInput: string | null,
    setCurrentEconomyInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentSecretsInput: string | null,
    setCurrentSecretsInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentAlliesInput: string | null,
    setCurrentAlliesInput: React.Dispatch<React.SetStateAction<string | null>>,
    currentEnemiesInput: string | null,
    setCurrentEnemiesInput: React.Dispatch<React.SetStateAction<string | null>>,
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
                // lockedVariable="society"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
        }}>
            <OutlinedDiv 
                label={'Society'}
                locked={currentInputLocked || viewMode}
            >
                {(currentHistoryInput === '' || (currentHistoryInput && currentHistoryInput.length > 0)
                || currentReligionInput === '' || (currentReligionInput && currentReligionInput.length > 0)
                || currentTechnologyInput === '' || (currentTechnologyInput && currentTechnologyInput.length > 0)
                || currentCultureInput === '' || (currentCultureInput && currentCultureInput.length > 0)
                || currentGovernmentInput === '' || (currentGovernmentInput && currentGovernmentInput.length > 0)
                || currentEconomyInput === '' || (currentEconomyInput && currentEconomyInput.length > 0)
                || currentSecretsInput === '' || (currentSecretsInput && currentSecretsInput.length > 0)
                || currentAlliesInput === '' || (currentAlliesInput && currentAlliesInput.length > 0)
                || currentEnemiesInput === '' || (currentEnemiesInput && currentEnemiesInput.length > 0)
                ) ? 
                <div style = {{
                    // border:'1px solid red',
                    // marginLeft: '-5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    marginTop: '10px',
                    marginLeft: '5px',
                    marginRight: '5px',
                    marginBottom: '-5px',
                    minWidth: '320px',
                }}>
                    {/* CULTURE */}
                    <SocietyParts 
                        inputLabel='Culture'
                        currentInput={currentCultureInput}
                        setCurrentInput={setCurrentCultureInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* HISTORY */}
                    <SocietyParts 
                        inputLabel='History'
                        currentInput={currentHistoryInput}
                        setCurrentInput={setCurrentHistoryInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* RELIGION */}
                    <SocietyParts 
                        inputLabel='Religion'
                        currentInput={currentReligionInput}
                        setCurrentInput={setCurrentReligionInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* TECHNOLOGY */}
                    <SocietyParts 
                        inputLabel='Technology'
                        currentInput={currentTechnologyInput}
                        setCurrentInput={setCurrentTechnologyInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* GOVERNMENT */}
                    <SocietyParts 
                        inputLabel='Government'
                        currentInput={currentGovernmentInput}
                        setCurrentInput={setCurrentGovernmentInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* ECONOMY */}
                    <SocietyParts 
                        inputLabel='Economy'
                        currentInput={currentEconomyInput}
                        setCurrentInput={setCurrentEconomyInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* SECRETS */}
                    <SocietyParts 
                        inputLabel='Secrets'
                        currentInput={currentSecretsInput}
                        setCurrentInput={setCurrentSecretsInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* ALLIES */}
                    <SocietyParts 
                        inputLabel='Allies'
                        currentInput={currentAlliesInput}
                        setCurrentInput={setCurrentAlliesInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    {/* ENEMIES */}
                    <SocietyParts 
                        inputLabel='Enemies'
                        currentInput={currentEnemiesInput}
                        setCurrentInput={setCurrentEnemiesInput}
                        currentInputLocked={currentInputLocked}
                        viewMode={viewMode}
                        // createMode={createMode}
                    />
                    <div style={{
                        display: 'flex',
                        alignSelf: 'center',
                    }}>
                        {!viewMode && !currentInputLocked &&
                            currentCultureInput === '' &&
                            currentHistoryInput === '' &&
                            currentReligionInput === '' &&
                            currentTechnologyInput === '' &&
                            currentGovernmentInput === '' &&
                            currentEconomyInput === '' &&
                            currentSecretsInput === '' &&
                            currentAlliesInput === '' &&
                            currentEnemiesInput === '' &&
                        <button style={{
                            alignSelf: 'center',
                            marginBottom: '5px'
                        }}
                        onClick={() => {
                            setCurrentHistoryInput(null)
                            setCurrentReligionInput(null)
                            setCurrentTechnologyInput(null)
                            setCurrentCultureInput(null)
                            setCurrentGovernmentInput(null)
                            setCurrentEconomyInput(null)
                            setCurrentSecretsInput(null)
                            setCurrentAlliesInput(null)
                            setCurrentEnemiesInput(null)
                        }}>
                            {'Remove society'}
                        </button>}
                    </div>
                </div> : 
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                    // minWidth: 'max-content',
                    // overflowX: 'auto',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                        marginLeft: '5px',
                    }}>
                        {'No society found.  '}
                    </div>
                    {!viewMode && !currentInputLocked && <button style={{
                        // border:'1px solid red', 
                        // marginLeft: '10px',
                        // marginBottom: '5px',
                        minWidth: 'max-content',
                    }}
                    onClick={() => {
                        setCurrentHistoryInput('')
                        setCurrentReligionInput('')
                        setCurrentTechnologyInput('')
                        setCurrentCultureInput('')
                        setCurrentGovernmentInput('')
                        setCurrentEconomyInput('')
                        setCurrentSecretsInput('')
                        setCurrentAlliesInput('')
                        setCurrentEnemiesInput('')
                    }}>
                        {'Add society'}
                    </button>}
                </div>} 
            </OutlinedDiv>
        </div>
    </div>
}