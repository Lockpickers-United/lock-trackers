import React, {useContext} from 'react'
import Entries from './Entries.jsx'
import DBContext from '../app/DBContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import EntriesSkeleton from './EntriesSkeleton.jsx'
function Main() {

    const {dataLoaded} = useContext(DBContext)

    return (
        <React.Fragment>
            {!dataLoaded &&
                <EntriesSkeleton/>
            }
            {dataLoaded &&
                <Entries/>
            }
        </React.Fragment>
    )
}

export default Main