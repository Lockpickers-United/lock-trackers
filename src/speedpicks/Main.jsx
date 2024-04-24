import React, {useContext, useEffect} from 'react'
import Entries from './Entries.jsx'
import EntriesSkeleton from './SkeletonEntries.jsx'
import LoadingContext from '../context/LoadingContext.jsx'
import FilterContext from '../context/FilterContext.jsx'
import DataContext from '../app/DataContext.jsx'

function Main() {

    const {filters} = useContext(FilterContext)
    const {refreshData, allDataLoaded} = useContext(LoadingContext)
    const {visibleEntries, bestTimes} = useContext(DataContext)

    // refresh if username has changed
    if (filters['profileUpdated'] === 'true') {
        useEffect(() => {
            refreshData()
        }, []) // eslint-disable-line
    }

    return (
        <React.Fragment>
            {(!allDataLoaded || !visibleEntries || !bestTimes) &&
                <EntriesSkeleton/>
            }
            {(visibleEntries && allDataLoaded && bestTimes) &&
                <Entries/>
            }
        </React.Fragment>
    )
}

export default Main