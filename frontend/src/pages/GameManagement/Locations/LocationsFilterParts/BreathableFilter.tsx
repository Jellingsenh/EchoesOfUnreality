import Select, { components } from "react-select"
import type { valueLabel } from "../LocationTypes/ValueLabel"
import atmosphereSvgUrl from "../../../../resources/svgs/weather.svg"
import breathableSvgUrl from "../../../../resources/svgs/smile.svg"
import unbreathableSvgUrl from "../../../../resources/svgs/mute.svg"
import { BREATHABLE, UNBREATHABLE } from "../../../../resources/constants"

export default function BreathableFilter({
    breathableFilter,
    setBreathableFilter,
}:{
    breathableFilter: string | null,
    setBreathableFilter: React.Dispatch<React.SetStateAction<string | null>>,
}) {
    const breathableOptions: valueLabel[] = [
            { value: BREATHABLE, label: 'Breathable' },
            { value: UNBREATHABLE, label: 'Not breathable' }
        ]
        
    const breathableValue:valueLabel|null = 
        (breathableFilter === BREATHABLE) ? 
            breathableOptions[0] :
            (breathableFilter === UNBREATHABLE) ?
                breathableOptions[1] :
                null // no breathable filter

    return <div style={{
        transform: 'translateX(33px)',
    }}>
        <Select
            onChange={(b) => {setBreathableFilter(b?.value ?? null)}}
            value={breathableValue}
            placeholder={<div style={{
                // minWidth: '0px',
                // maxWidth: '0px',
                // border: '2px solid green',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-1px',
            }}>
                <img src={atmosphereSvgUrl} alt="Breathable" width="12" />
            </div>}
            isSearchable={false}
            components={{ 
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
                SingleValue: ({children, ...props}) => 
                <components.SingleValue {...props}>
                    <div style={{
                        marginLeft: '-4px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {BREATHABLE === breathableFilter ? 
                            <img src={breathableSvgUrl} alt="Breathable" width="10" /> :
                            <img src={unbreathableSvgUrl} alt="Not breathable" width="10" />
                        }
                    </div>
                </components.SingleValue>
            }}
            styles={{
                control: (base) => ({ // selection box
                    ...base,
                    border: 'none',
                    boxShadow: 'none',
                    minHeight: '25px',
                    maxHeight: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // fontSize: '0.4rem',
                    cursor: 'pointer',
                }),
                container: (base) => ({ // selection options
                    ...base,
                    marginLeft: '-40px',
                    width: '15px', 
                }),
                valueContainer: (base) => ({
                    ...base,
                    padding: '0px',
                }),
                menu: (base) => ({ // dropdown menu
                    ...base,
                    width: '95px',
                    marginTop: '3px',
                    marginLeft: '-40px',
                
                fontSize: '0.7rem',
                }),
                option: (base) => ({ // selection options
                    ...base,
                    maxHeight: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }),
                singleValue: (base) => ({ 
                    ...base,
                    // textAlign: 'center',
                    width: '16px', 
                    height: '10px',
                    marginBottom: '-1px',
                }),
            }}
            options={breathableOptions}
        />
    </div>
}
