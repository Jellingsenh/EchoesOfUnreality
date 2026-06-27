import Select, { components } from "react-select"
import type { valueLabel } from "../LocationTypes/ValueLabel"
import { useState } from "react"

export function LocationSortDropdown({
    sortBy,
    setSortBy,
    descending,
    setDescending,
}:{
    sortBy: string,
    setSortBy: React.Dispatch<React.SetStateAction<string>>,
    descending: boolean,
    setDescending: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const [sortByPicked, setSortByPicked] = useState(false)

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

    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        // cursor: 'pointer',
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
                    // boxShadow: 'none', // remove blue focus (might need to change for accessibility)
                    transition: 'width 0.3s ease',
                    minWidth: 'max-content',
                    // width: !sortByPicked ? '40px' :
                    //         sortBy === 'NAME' ? '55px' : 
                    //         sortBy === 'TYPE' ? '50px' : 
                    //         '85px', // TIME
                    minHeight: '25px',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    cursor: 'pointer',
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
                    marginLeft: !sortByPicked ? '8px' : 
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
                    // cursor: 'pointer',
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
        <div
        onClick={() => setDescending(prev => !prev)}
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
                transform: descending ? 'rotate(0deg)' : 'rotate(180deg)',
                marginLeft: '5px',
                cursor: 'pointer',
                // marginRight: '5px',
            }}>
                <components.DownChevron tabIndex={0} size={14} />
            </div>
        </div>
    </div>
}