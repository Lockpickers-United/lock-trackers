import React, {useContext, useState} from 'react'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'
import FilterContext from '../context/FilterContext.jsx'

function EntriesLB({entries}) {

    document.title = 'LPU Locks - Lock Bazaar Browser'

    const {filters} = useContext(FilterContext)
    const [entryExpanded, setEntryExpanded] = useState(filters.id)

    return (
        <div>
            {entries?.length === 0 &&
                <NoEntriesCardLB/>
            }
            {entries.map((entry) =>
                <EntryLB
                    key={entry.id}
                    entry={entry}
                    expanded={entry.id === entryExpanded}
                    onExpand={setEntryExpanded}
                />
            )}
        </div>
    )
}

export default EntriesLB
