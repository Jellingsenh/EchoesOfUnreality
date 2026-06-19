import { LocationSortDropdown } from "./LocationSortDropdown"
import { LocationTypeBreathableFilter } from "./LocationTypeBreathableFilter"
import { LocationSearch } from "./LocationSearch"

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
    return <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        gap: '4px' 
    }}>
        {/* SORT BY */}
        <LocationSortDropdown 
            sortBy={sortBy}
            setSortBy={setSortBy}
            descending={descending}
            setDescending={setDescending}
        />
        {/* FILTER TYPE & AIR */}
        <LocationTypeBreathableFilter 
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            breathableFilter={breathableFilter}
            setBreathableFilter={setBreathableFilter}
        />
        {/* SEARCH */}
        <LocationSearch 
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            typeFilter={typeFilter}
        />
    </div>
}