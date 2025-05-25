import React, {useContext, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import ChallengeLockEntry from './ChallengeLockEntry.jsx'

function ChallengeLocksCardsMain() {

    const {allEntries} = useContext(DataContext)
    const {filters} = useContext(FilterContext)
    const [entryExpanded, setEntryExpanded] = useState(filters.id)

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <React.Fragment>
        <div style={{
            minWidth: 330, maxWidth: 720, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>
                {allEntries.map((entry) => (
                    <ChallengeLockEntry
                        key={entry.id}
                        entry={entry}
                        expanded={entry.id === entryExpanded}
                        onExpand={setEntryExpanded}
                    />
                ))}
        </div>
        </React.Fragment>
    )
}

export default ChallengeLocksCardsMain
