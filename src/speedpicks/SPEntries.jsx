import React, {useCallback, useContext, useDeferredValue, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import SPDataContext from './SPDataContext.jsx'
import SPListContext from './SPListContext.jsx'
import SPEntry from './SPEntry.jsx'
import SPEntryNew from './SPEntryNew.jsx'

function SPEntries() {

    const {speedPicks, bestTimes, handleSort = []} = useContext(SPDataContext)
    const {tab, expanded, setExpanded, displayAll} = useContext(SPListContext)

    const [updated, setUpdated] = useState(0)
    const entriesUpdate = useCallback(value => {
        setUpdated(value)
    }, [])

    const defTab = useDeferredValue(tab)
    const defExpanded = useDeferredValue(expanded)
    const defDisplayAll = useDeferredValue(displayAll)


    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const divStyle = {
        width: '100%', padding: '0px', marginBottom: 12, alignItems: 'top',
        marginLeft: 'auto', marginRight: 'auto', justifyContent: 'top'
    }
    const divFlexStyle = !smallWindow ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 900, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>
            <SPEntryNew entriesUpdate={entriesUpdate}/>

            {speedPicks.data.map((entry) =>
                <SPEntry bestTimes={bestTimes}
                         key={entry.id}
                         entry={entry}
                         expanded={entry.id === defExpanded}
                         onExpand={setExpanded}
                         entriesUpdate={entriesUpdate}
                />
            )}

        </div>
    )
}

export default SPEntries
