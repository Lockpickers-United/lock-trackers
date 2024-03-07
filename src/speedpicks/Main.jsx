import React, {useContext, useEffect} from 'react'
import Entries from './Entries.jsx'
import EntriesSkeleton from './SkeletonEntries.jsx'
import LoadingContext from '../context/LoadingContext.jsx'
import FilterContext from '../context/FilterContext.jsx'

function Main() {

    const {filters} = useContext(FilterContext)
    const {refreshData} = useContext(LoadingContext)
    const {allDataLoaded} = useContext(LoadingContext)

    // refresh if username has changed
    if (filters['profileUpdated']==='true') {
        useEffect(() => {
            refreshData()
        }, []) // eslint-disable-line
    }

    return (
        <React.Fragment>
            {!allDataLoaded &&
                <EntriesSkeleton/>
            }
            {allDataLoaded &&
                <Entries/>
            }
        </React.Fragment>
    )
}

export default Main