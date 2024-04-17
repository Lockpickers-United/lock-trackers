import React, {useCallback, useContext, useDeferredValue, useState, useMemo} from 'react'
import DataContext from '../context/DataContext'
import ListContext from '../context/ListContext'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'

function EntriesLB() {

    document.title = 'LPU Locks - Lock Bazaar Browser'

    const {visibleEntries = []} = useContext(DataContext)
    const {expanded, setExpanded} = useContext(ListContext)

    const [updated, setUpdated] = useState(0)

    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log('entriesUpdate: ', updated)
    }, [updated])

    const defExpanded = useDeferredValue(expanded)

    const entries = useMemo(() => {
        // removed tab/search code
        return visibleEntries
    }, [visibleEntries])

    return (
        <div>
            {entries.map((entry) =>
                <EntryLB
                    key={entry.id}
                    entry={entry}
                    expanded={entry.id === defExpanded}
                    onExpand={setExpanded}
                    entriesUpdate={entriesUpdate}
                />
            )}

            {entries?.length === 0 &&
                <NoEntriesCardLB/>
            }
        </div>
    )
}

export default EntriesLB
