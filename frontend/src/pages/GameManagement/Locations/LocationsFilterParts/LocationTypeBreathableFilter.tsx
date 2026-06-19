import Select, { components } from "react-select"
import type { valueLabel } from "../../../../components/helpers/ValueLabel"

export function LocationTypeBreathableFilter({
    typeFilter,
    setTypeFilter,
    breathableFilter,
    setBreathableFilter,
}:{
    typeFilter: string | null,
    setTypeFilter: React.Dispatch<React.SetStateAction<string | null>>,
    breathableFilter: string | null,
    setBreathableFilter: React.Dispatch<React.SetStateAction<string | null>>,

}) {
    const typeOptions: valueLabel[] = [
        { value: 'PLACE', label: 'Place' },
        { value: 'CITY', label: 'City' },
        { value: 'AREA', label: 'Area' },
        { value: 'COUNTRY', label: 'Country' },
        { value: 'CONTINENT', label: 'Continent' },
        { value: 'FEATURE', label: 'Feature' },
        { value: 'MOON', label: 'Moon' },
        { value: 'PLANET', label: 'Planet' },
        { value: 'STAR', label: 'Star' },
        { value: 'SPACE', label: 'Space' },
        { value: 'GALAXY', label: 'Galaxy' },
        { value: 'UNIVERSE', label: 'Universe' },
        { value: 'DIMENSION', label: 'Dimension' }
    ]
    
    const typeValue:valueLabel|null = 
    (typeFilter == 'PLACE') ? 
        typeOptions[0] :
        (typeFilter == 'CITY') ?
            typeOptions[1] :
            (typeFilter == 'AREA') ?
                typeOptions[2] :
                (typeFilter == 'COUNTRY') ?
                    typeOptions[3] :
                    (typeFilter == 'CONTINENT') ?
                        typeOptions[4] :
                        (typeFilter == 'FEATURE') ?
                            typeOptions[5] :
                            (typeFilter == 'MOON') ?
                                typeOptions[6] :
                                (typeFilter == 'PLANET') ?
                                    typeOptions[7] :
                                    (typeFilter == 'STAR') ?
                                        typeOptions[8] :
                                        (typeFilter == 'SPACE') ?
                                            typeOptions[9] :
                                            (typeFilter == 'GALAXY') ?
                                                typeOptions[10] :
                                                (typeFilter == 'UNIVERSE') ?
                                                    typeOptions[11] :
                                                    (typeFilter == 'DIMENSION') ?
                                                        typeOptions[12] :
                                                        null // no typeFilter
        
    const breathableOptions: valueLabel[] = [
        { value: 'BREATHABLE', label: 'Breathable' },
        { value: 'UNBREATHABLE', label: 'Not breathable' }
    ]
    
    const breathableValue:valueLabel|null = 
        (breathableFilter === 'BREATHABLE') ? 
            breathableOptions[0] :
            (breathableFilter === 'UNBREATHABLE') ?
                breathableOptions[1] :
                null // no breathable filter

    return <div style={{
        display: 'flex',
    }}>
        {/* TYPE */}
        <Select
            onChange={(f) => {setTypeFilter(f?.value ?? null)}}
            value={typeValue}
            placeholder={'Type'}
            isSearchable={false}
            maxMenuHeight={200}
            isClearable
            components={{ 
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
                ClearIndicator: (props) => <div onMouseDown={() => {
                    setBreathableFilter(null)
                }}>
                    <components.ClearIndicator {...props}>
                        <components.CrossIcon style={{
                            color: 'darkgrey',
                        }} size={14}/>
                    </components.ClearIndicator>
                </div>
            }}
            styles={{
                control: (base) => ({ // selection box
                ...base,
                // display: 'flex',
                // justifyContent: 'center',
                border: 'none',
                boxShadow: 'none',
                textAlign: 'center',
                alignContent: 'center',
                minHeight: '25px',
                maxHeight: '25px',
                fontSize: '0.8rem',
                alignSelf: 'center',
                transition: 'width 0.3s ease',
                minWidth: 'max-content',
                // width: !typeFilter ? '45px' : 
                //         typeFilter === 'PLACE' ? '85px' : 
                //         typeFilter === 'CITY' ? '80px' : 
                //         typeFilter === 'AREA' ? '85px' :
                //         typeFilter === 'COUNTRY' ? '100px' :
                //         typeFilter === 'CONTINENT' ? '110px' :
                //         typeFilter === 'FEATURE' ? '95px' :
                //         typeFilter === 'MOON' ? '90px' :
                //         typeFilter === 'PLANET' ? '90px' :
                //         typeFilter === 'STAR' ? '80px' :
                //         typeFilter === 'SPACE' ? '82px' :
                //         typeFilter === 'GALAXY' ? '85px' :
                //         typeFilter === 'UNIVERSE' ? '95px' :
                //         '105px', // DIMENSION
                // border: 'none',
                }),
                menu: (base) => ({ // dropdown menu
                ...base,
                width: '75px',
                marginTop: '3px',
                marginLeft: !typeFilter ? '-14px' : 
                                typeFilter === 'PLACE' ? '5px' : 
                                typeFilter === 'CITY' ? '2px' : 
                                typeFilter === 'AREA' ? '5px' :
                                typeFilter === 'COUNTRY' ? '12px' :
                                typeFilter === 'CONTINENT' ? '17px' :
                                typeFilter === 'FEATURE' ? '10px' :
                                typeFilter === 'MOON' ? '7px' :
                                typeFilter === 'PLANET' ? '7px' :
                                typeFilter === 'STAR' ? '2px' :
                                typeFilter === 'SPACE' ? '2px' :
                                typeFilter === 'GALAXY' ? '4px' :
                                typeFilter === 'UNIVERSE' ? '9px' :
                                '13px', // DIMENSION
                fontSize: '0.7rem',
                }),
                option: (base) => ({ // selection options
                ...base,
                maxHeight: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }),
                clearIndicator: (base) => ({
                ...base,
                marginBottom: '-1px',
                marginRight: '-3px',
                }),
            }}
            options={typeOptions}
        />
        {/* AIR */}
        {typeFilter && typeFilter != 'SPACE' && typeFilter != 'GALAXY' && typeFilter != 'UNIVERSE' && typeFilter != 'DIMENSION' && 
        <Select
            onChange={(b) => {setBreathableFilter(b?.value ?? null)}}
            value={breathableValue}
            placeholder={<div style={{
                // minWidth: '0px',
                // maxWidth: '0px',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-1px',
            }}>
                <img src={'../../resources/images/weather.svg'} alt="Breathable" width="12" />
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
                        {breathableFilter === 'BREATHABLE' ? 
                            <img src={'../../resources/images/smile.svg'} alt="Breathable" width="10" /> :
                            <img src={'../../resources/images/mute.svg'} alt="Not breathable" width="10" />
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
                }),
                container: (base) => ({ // selection options
                ...base,
                marginLeft: '-37px',
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
                marginLeft: '-37px',
                
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
        />}
    </div>
}