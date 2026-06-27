import Select, { components } from "react-select"
import type { valueLabel } from "../LocationTypes/ValueLabel"
import BreathableFilter from "./BreathableFilter"
import { PLACE, CITY, AREA, COUNTRY, CONTINENT, FEATURE, MOON, PLANET, STAR, SPACE, GALAXY, UNIVERSE, DIMENSION } from "../../../../resources/constants"

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
        { value: PLACE, label: 'Place' },
        { value: CITY, label: 'City' },
        { value: AREA, label: 'Area' },
        { value: COUNTRY, label: 'Country' },
        { value: CONTINENT, label: 'Continent' },
        { value: FEATURE, label: 'Feature' },
        { value: MOON, label: 'Moon' },
        { value: PLANET, label: 'Planet' },
        { value: STAR, label: 'Star' },
        { value: SPACE, label: 'Space' },
        { value: GALAXY, label: 'Galaxy' },
        { value: UNIVERSE, label: 'Universe' },
        { value: DIMENSION, label: 'Dimension' }
    ]
    
    const typeValue:valueLabel|null = 
    (typeFilter == PLACE) ? 
        typeOptions[0] :
        (typeFilter == CITY) ?
            typeOptions[1] :
            (typeFilter == AREA) ?
                typeOptions[2] :
                (typeFilter == COUNTRY) ?
                    typeOptions[3] :
                    (typeFilter == CONTINENT) ?
                        typeOptions[4] :
                        (typeFilter == FEATURE) ?
                            typeOptions[5] :
                            (typeFilter == MOON) ?
                                typeOptions[6] :
                                (typeFilter == PLANET) ?
                                    typeOptions[7] :
                                    (typeFilter == STAR) ?
                                        typeOptions[8] :
                                        (typeFilter == SPACE) ?
                                            typeOptions[9] :
                                            (typeFilter == GALAXY) ?
                                                typeOptions[10] :
                                                (typeFilter == UNIVERSE) ?
                                                    typeOptions[11] :
                                                    (typeFilter == DIMENSION) ?
                                                        typeOptions[12] :
                                                        null // no typeFilter

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
                ClearIndicator: (props) => <div style={{
                    display: 'flex',
                    // flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: (typeFilter === SPACE
                                || typeFilter === GALAXY 
                                || typeFilter === UNIVERSE 
                                || typeFilter === DIMENSION) ? '-15px' : '0px',
                }}>
                    {/* Breathable filter */}
                    {typeFilter 
                        && typeFilter != SPACE 
                        && typeFilter != GALAXY 
                        && typeFilter != UNIVERSE 
                        && typeFilter != DIMENSION 
                        && <BreathableFilter 
                            breathableFilter={breathableFilter}
                            setBreathableFilter={setBreathableFilter}
                    />}
                    {/* Clear button */}
                    <div onMouseDown={() => {
                            setBreathableFilter(null)
                    }}>
                        <components.ClearIndicator {...props}>
                            <components.CrossIcon style={{
                                color: 'darkgrey',
                            }} 
                            tabIndex={0}
                            size={14}/>
                        </components.ClearIndicator>
                    </div>
                </div>
            }}
            // className='no-scrollbar'
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
                    cursor: 'pointer',
                }),
                menu: (base) => ({ // dropdown menu
                    ...base,
                    // // Hide scrollbar for Chrome, Safari, and Opera
                    // '&::-webkit-scrollbar': {
                    //     display: 'none',
                    // },
                    // // Hide scrollbar for IE, Edge, and Firefox
                    // msOverflowStyle: 'none',
                    // scrollbarWidth: 'none',
                    // // className: 'no-scrollbar',
                    width: '75px',
                    marginTop: '3px',
                    marginLeft: !typeFilter ? '-14px' : 
                                typeFilter === PLACE ? '0px' : 
                                typeFilter === CITY ? '-3px' : 
                                typeFilter === AREA ? '-2px' :
                                typeFilter === COUNTRY ? '8px' :
                                typeFilter === CONTINENT ? '13px' :
                                typeFilter === FEATURE ? '6px' :
                                typeFilter === MOON ? '2px' :
                                typeFilter === PLANET ? '2px' :
                                typeFilter === STAR ? '-4px' :
                                typeFilter === SPACE ? '-5px' :
                                typeFilter === GALAXY ? '-2px' :
                                typeFilter === UNIVERSE ? '2px' :
                                '7px', // DIMENSION
                    fontSize: '0.7rem',
                }),
                menuList: (provided) => ({ // remove scrollbar from menulist
                    ...provided,
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For IE and Edge
                    '&::-webkit-scrollbar': {
                        display: 'none', // For Chrome, Safari, and Opera
                    },
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
    </div>
}
