import OutlinedDiv from "../../../../components/helpers/OutlinedDiv";
import LockInputButton from "../../../../components/helpers/LockInputButton";
import SingleAnomalyInput from "./SingleAnomalyInput";

export default function LocationAnomalyInput({
    currentInput,
    setCurrentInput,
    currentInputLocked,
    setCurrentInputLocked,
    viewMode,
}:{
    currentInput: string[] | null,
    setCurrentInput: React.Dispatch<React.SetStateAction<string[] | null>>,
    currentInputLocked: boolean,
    setCurrentInputLocked: React.Dispatch<React.SetStateAction<boolean>>,
    viewMode: boolean,
}) {
    // console.log('rendering anomaly input with current input: ', currentInput)
    function setAnomaly(newAnomaly: string, index: number) {
        setCurrentInput(prevAnoms => {
            if (!prevAnoms) return prevAnoms
            return prevAnoms.map((anom, i) => 
                i === index ? 
                    newAnomaly : 
                    anom
            )
        })
    }

    function removeAnomaly(anomaly: string) {
        // console.log('removing anomaly: ' + anomaly)
        setCurrentInput(prevItems => {
            if (!prevItems) return prevItems
            return prevItems.filter(item => item !== anomaly)
        })
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        // minWidth: '250px',
    }}>
        {!viewMode && <div style={{
            marginTop: '20px',
        }}>
            <LockInputButton 
                // lockedVariable="anomalies"
                locked={currentInputLocked}
                setLocked={setCurrentInputLocked}
            />
        </div>}
        <div style={{
            width: '100%',
            // overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Anomalies'}
                locked={currentInputLocked || viewMode}
            >
                <div style={{
                    // border:'1px solid green', 
                    // width: '100%',
                    alignSelf: 'start',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '5px',
                    marginTop: (currentInput && currentInput.length > 0) ? '10px' : '0px',
                    // marginRight: '10px',
                    marginBottom: ((currentInput && currentInput.length > 0) && currentInputLocked) ? '-5px' : '0px',
                }}>
                    {/* map anomalies */}
                    {currentInput?.map((anom:string, index:number) => (
                        <SingleAnomalyInput key={index}
                            anom={anom}
                            index={index}
                            setCurrentAnomaly={setAnomaly}
                            removeCurrentAnomaly={removeAnomaly}
                            currentInputLocked={currentInputLocked}
                            viewMode={viewMode}
                    />))}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        // marginTop: '-10px',
                        // overflowX: 'auto',
                    }}>
                        <div style={{
                            minWidth: 'max-content',
                        }}>
                            {((currentInput && currentInput.length > 0) ? '' : 'No anomalies found.  ')}
                        </div>
                        {!viewMode && !currentInputLocked && <button style={{
                            marginLeft: '5px',
                            // marginBottom: '5px',
                            minWidth: 'max-content',
                            
                        }} onClick={() => {
                            setCurrentInput(prevItems => [...prevItems || [], ''])                     
                        }}>
                            {'Add anomaly'}
                        </button>}
                    </div>
                </div>
            </OutlinedDiv>
        </div>
    </div>
}