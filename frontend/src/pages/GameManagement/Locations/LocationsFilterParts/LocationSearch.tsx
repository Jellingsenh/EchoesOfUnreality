import { useState } from "react"
import { components } from "react-select"

export function LocationSearch({
    searchStr,
    setSearchStr,
}:{
    searchStr: string | null,
    setSearchStr: React.Dispatch<React.SetStateAction<string | null>>,
}) {
    const [tempSearchStr, setTempSearchStr] = useState<string | null>(null)
    const searchValue: string | undefined = tempSearchStr ?? searchStr ?? undefined

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <input
            style={{
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
                if (s.target.value === '') {
                    setSearchStr('')
                    setTempSearchStr(null)
                } else {
                    setTempSearchStr(s.target.value)
                }
                
            }} 
            value={searchValue}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    // actually search
                    setSearchStr(searchValue ?? '')
                }
            }}
            placeholder="Search" 
        />
        {searchStr && <components.CrossIcon onClick={() => {
            setSearchStr('')
            setTempSearchStr(null)
        }}
        tabIndex={0}
        style={{
            color: 'darkgrey',
            alignSelf: 'center',
            marginLeft: '-18px',
            marginBottom: '-1px',
            cursor: 'pointer',
        }} 
        size={14}/>}
    </div>
}