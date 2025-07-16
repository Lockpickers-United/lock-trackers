import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import DataContext from '../context/DataContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import ChallengeLockEntry from './ChallengeLockEntry.jsx'
import SubNav from '../nav/SubNav.jsx'
import SortFilterBar from './SortFilterBar.jsx'
import SortButtonCL from './SortButtonCL.jsx'
import {optionsCL} from '../data/subNavOptions.js'
import AdminActionsButton from './AdminActionsButton.jsx'
import NoEntriesCardCL from './NoEntriesCardCL.jsx'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import ExportChallengeLocksButton from './ExportChallengeLocksButton.jsx'

function ChallengeLocksMain({user}) {

    const {allEntries, visibleEntries} = useContext(DataContext)
    const {filters, addFilters, clearFilters} = useContext(FilterContext)
    const [entryExpanded, setEntryExpanded] = useState(filters.id)
    const handleExpand = useCallback(entryId => {
        addFilters([{key: 'id', value: entryId}, {key: 'name', value: undefined}], true)
        setEntryExpanded(entryId)
    }, [addFilters])
    const cycleExpanded = useCallback(entryId => {
        setEntryExpanded(false)
        setEntryExpanded(entryId)
        addFilters([{key: 'id', value: entryId}, {key: 'name', value: undefined}], true)
    }, [addFilters])

    const imageCount = useMemo(() => { // eslint-disable-line
        return allEntries?.reduce((acc, entry) => {
            if (entry.media && entry.media.length > 0) {
                acc += entry.media.length
            }
            return acc
        }, 0) || 0
    },[allEntries])

    //console.log('imageCount', imageCount)

    useEffect(() => {
        if (visibleEntries?.length === 1 && !filters.id) {
            setEntryExpanded(visibleEntries[0].id)
            addFilters([{key: 'id', value: visibleEntries[0].id}], true)
        }
    }, [addFilters, visibleEntries, filters.id])

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const onNavChange = useCallback(() => {
        clearFilters()
        setEntryExpanded(false)
    }, [clearFilters])

    const navSortButton = <SortButtonCL/>
    const navAdminButton = <AdminActionsButton/>

    return (
        <React.Fragment>
            <SubNav options={optionsCL} onNavChange={onNavChange} defaultValue={optionsCL[0].label}/>

            <div style={{
                minWidth: 330, maxWidth: 720, height: '100%',
                padding: pagePadding, backgroundColor: '#223',
                marginLeft: 'auto', marginRight: 'auto',
                fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
            }}>
                <SortFilterBar label='Challenge Locks' entryCount={visibleEntries.length} sortButton={navSortButton} adminButtons={navAdminButton}/>

                {(allEntries?.length > 0 && visibleEntries?.length === 0) &&
                    <NoEntriesCardCL/>
                }

                {allEntries?.length === 0 &&
                    <LoadingDisplay/>
                }

                {visibleEntries.map((entry) => (
                    <ChallengeLockEntry
                        key={entry.id}
                        entry={entry}
                        expanded={entry.id === entryExpanded}
                        onExpand={handleExpand}
                        cycleExpanded={cycleExpanded}
                        user={user}
                    />
                ))}

                {visibleEntries?.length > 0 &&
                    <div style={{margin: '30px 0px'}}>
                        <ExportChallengeLocksButton text={true} entries={visibleEntries}/>
                    </div>
                }

            </div>
        </React.Fragment>
    )
}

export default ChallengeLocksMain
