import React, {useCallback, useContext, useDeferredValue, useState} from 'react'
import ListContext from '../context/ListContext'
import NoEntriesCardLB from './NoEntriesCardLB.jsx'
import EntryLB from './EntryLB.jsx'

function EntriesLB({entries}) {

    document.title = 'LPU Locks - Lock Bazaar Browser'

    const {expanded, setExpanded} = useContext(ListContext)

    const [updated, setUpdated] = useState(0)

    const entriesUpdate = useCallback(value => {
        setUpdated(value)
        console.log('entriesUpdate: ', updated)
    }, [updated])

    const defExpanded = useDeferredValue(expanded)

    return (
        <div>
            {entries.map((entry) =>

                <React.Fragment key={entry.id}>
                    { entry.listings &&
                        <EntryLB
                            key={entry.id}
                            entry={entry}
                            expanded={entry.id === defExpanded}
                            onExpand={setExpanded}
                            entriesUpdate={entriesUpdate}
                        />
                    }
                    { !entry.listings &&
                        <EntryLB
                            key={entry.id}
                            entry={entry}
                            expanded={entry.id === defExpanded}
                            onExpand={setExpanded}
                            entriesUpdate={entriesUpdate}
                        />
                    }
                </React.Fragment>
            )}

            {entries?.length === 0 &&
                <NoEntriesCardLB/>
            }
        </div>
    )
}

export default EntriesLB
