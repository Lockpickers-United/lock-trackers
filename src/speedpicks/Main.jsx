import React, {useContext} from 'react'
import Entries from './Entries.jsx'
import EntriesSkeleton from './SkeletonEntries.jsx'
import LoadingContext from '../context/LoadingContext.jsx'
function Main() {

    const {allDataLoaded} = useContext(LoadingContext)

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