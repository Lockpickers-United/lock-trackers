import React, {useCallback, useContext, useDeferredValue, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataProvider from './DataProvider.jsx'
import ListContext from './ListContext.jsx'
import Entry from './Entry.jsx'
import NewEntry from './NewEntry.jsx'
import SortFilterBar from './SortFilterBar.jsx'

function Entries() {

    const {speedPicks, bestTimes, handleSort = []} = useContext(DataProvider)
    const {tab, expanded, setExpanded, displayAll} = useContext(ListContext)

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
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>
            <SortFilterBar/>

            <NewEntry entriesUpdate={entriesUpdate}/>


            {speedPicks.data.map((entry) =>
                <Entry bestTimes={bestTimes}
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

export default Entries
