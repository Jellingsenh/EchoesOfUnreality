import { useState } from "react"
import Select, { components } from "react-select"

export default function LocationFilters({
    sortBy,
    setSortBy,
    descending,
    setDescending,
    typeFilter,
    setTypeFilter,
    breathableFilter,
    setBreathableFilter,
    searchStr,
    setSearchStr,
}:{
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    descending: boolean,
    setDescending: React.Dispatch<React.SetStateAction<boolean>>,
    typeFilter: string | null,
    setTypeFilter: React.Dispatch<React.SetStateAction<string | null>>,
    breathableFilter: string | null,
    setBreathableFilter: React.Dispatch<React.SetStateAction<string | null>>,
    searchStr: string | null,
    setSearchStr: React.Dispatch<React.SetStateAction<string | null>>,
}) {
    const [sortByPicked, setSortByPicked] = useState(false)

    interface valueLabel {
        value: string,
        label: string,
    }

    const sortOptions: valueLabel[] = [
        { value: 'NAME', label: 'Name' },
        { value: 'TYPE', label: 'Type' },
        { value: 'TIME', label: 'Most recent' }
      ]

    const sortValue: valueLabel = (sortBy === 'NAME') ? 
        sortOptions[0] : 
        (sortBy === 'TYPE') ? 
            sortOptions[1] : 
            sortOptions[2] // TIME

    // const descendingValue
    
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

      const typeValue: valueLabel | null = (typeFilter == 'PLACE') ? 
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

      const breathableValue: valueLabel | null = (breathableFilter === 'BREATHABLE') ? 
        breathableOptions[0] :
        (breathableFilter === 'UNBREATHABLE') ?
        breathableOptions[1] :
        null // no breathable filter

    const searchValue: string | undefined = searchStr ?? undefined
    
    return <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '4px' 
    }}>
        {/* SORT BY */}
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            // marginRight: '4px',
            }}>
            <Select
                value={sortValue}
                // placeholder={'Sort'}
                options={sortOptions}
                styles={{
                    control: (base) => ({ // main box
                    ...base,
                    alignContent: 'center',
                    border: 'none',
                    boxShadow: 'none', // remove blue focus (might need to change for accessibility)
                    transition: 'width 0.3s ease',
                    minWidth: 'max-content',
                    // width: !sortByPicked ? '40px' :
                    //         sortBy === 'NAME' ? '55px' : 
                    //         sortBy === 'TYPE' ? '50px' : 
                    //         '85px', // TIME
                    minHeight: '25px',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    }),
                    // container: (base) => ({ // entire container
                    //   ...base,
                    //   // textAlign: 'center',
                    // }),
                    menu: (base) => ({ // dropdown menu
                    ...base,
                    width: '80px',
                    marginTop: '3px',
                    // transition: 'marginLeft 0.2s ease',
                    marginLeft: !sortByPicked ? '-19px' : 
                            sortBy === 'NAME' ? '-8px' : 
                            sortBy === 'TYPE' ? '-9px' : 
                            '8px', // TIME
                    fontSize: '0.7rem',
                    }),
                    option: (base) => ({ // selection options
                    ...base,
                    maxHeight: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    }),
                    // placeholder: (base) => ({
                    //   ...base,
                    //   textAlign: 'center',
                    //   // minWidth: '60px',
                    //   // marginLeft: '-5px',
                    // }),
                    // singleValue: (base) => ({ 
                    //   ...base,
                    //   // textAlign: 'center',
                    //   // minWidth: '100px',
                    // }),
                }}
                onChange={(i) => {
                    setSortBy(i?.value ?? 'TIME')
                    setSortByPicked(true)
                }}
                isSearchable={false}
                components={{ 
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null, 
                }}
            />
            {/* DESCENDING */}
            <div onClick={() => setDescending(!descending)}
            style={{
                background: 'white',
                borderRadius: '3px',
                paddingRight: '5px',
                maxHeight: '25px',
                border: 'none',
                marginLeft: '-10px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    transition: 'transform 0.3s ease',
                    transform: descending ? 'rotate(180deg)' : 'rotate(0deg)',
                    marginLeft: '5px',
                    // marginRight: '5px',
                }}>
                    <components.DownChevron size={14} />
                </div>
            </div>
        </div>
        {/* FILTER TYPE & AIR */}
        <div style={{
            display: 'flex',
        }}>
            {/* TYPE */}
            <Select
                onChange={(f) => {setTypeFilter(f?.value ?? null)}}
                value={typeValue}
                placeholder={'Type'}
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
        {/* SEARCH */}
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <input
                style={{
                    marginLeft: (!typeFilter || typeFilter === 'SPACE' || typeFilter === 'GALAXY' || typeFilter === 'UNIVERSE' || typeFilter === 'DIMENSION') ? '0px' : '22px',
                    fieldSizing: 'content', 
                    minHeight: '21px',
                    maxHeight: '21px',
                    fontSize: '0.8rem',
                    fontFamily: 'inherit',
                    padding: '2px 10px',
                    borderRadius: '4px',
                    border: 'none',
                    outline: 'none',
                    minWidth: 'max-content',
                    paddingRight: searchStr ? '20px' : '10px',
                    // width: searchStrPxls+5+'px',
                    transition: 'width 0.4s ease',
                }}
                onChange={(s) => {
                    setSearchStr(s.target.value)
                }} 
                value={searchValue}
                placeholder="Search" 
            />
            {searchStr && <components.CrossIcon onClick={() => {
                setSearchStr('')
            }}
            style={{
                color: 'darkgrey',
                alignSelf: 'center',
                marginLeft: '-18px',
                marginBottom: '-1px',
            }} 
            size={14}/>}
      
        </div>
    </div>
}