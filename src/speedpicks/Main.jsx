import React, {useContext} from 'react'
import Entries from './Entries.jsx'
import DBContext from '../app/DBContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'

function Main() {

    const {dataLoaded} = useContext(DBContext)

    return (
        <React.Fragment>
            {!dataLoaded &&
                <LoadingDisplay/>
            }
            {dataLoaded &&
                <Entries/>
            }
        </React.Fragment>
    )
}

export default Main