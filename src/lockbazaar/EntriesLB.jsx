import React, {useContext, useDeferredValue} from 'react'
import ListContext from '../context/ListContext'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'

function EntriesLB({entries}) {

    document.title = 'LPU Locks - Lock Bazaar Browser'

    const {expanded, setExpanded} = useContext(ListContext)
    const defExpanded = useDeferredValue(expanded)

    return (
        <div>
            {entries?.length === 0 &&
                <NoEntriesCardLB/>
            }
            {entries.map((entry) =>
                <EntryLB
                    key={entry.id}
                    entry={entry}
                    expanded={entry.id === defExpanded}
                    onExpand={setExpanded}
                />
            )}
        </div>
    )
}

export default EntriesLB
