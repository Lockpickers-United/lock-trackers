import React, {useContext, useMemo} from 'react'
import DBContext from '../app/DBContext.jsx'
import AppContext from '../app/AppContext.jsx'
import LoadingContext from './LoadingContextLB.jsx'

const WatchlistContext = React.createContext({})

export function WatchlistProvider({children}) {

    const {verbose, beta} = useContext(AppContext)  //eslint-disable-line
    const {allDataLoaded, allEntries, uniqueLockIds, getLockLineFromId} = useContext(LoadingContext)
    const {profile} = useContext(DBContext)

    const watchlistIds = useMemo(() => profile?.watchlist || [], [profile?.watchlist])

    const watchlistEntries = useMemo(() => {
        return watchlistIds.filter(x => !uniqueLockIds.includes(x)).map((id) => {
            return getLockLineFromId(id)
        })
    }, [watchlistIds, uniqueLockIds, getLockLineFromId])

    const combinedEntries = useMemo(() => {
        return !allDataLoaded
            ? []
            : (allEntries && watchlistEntries)
                ? [...allEntries, ...watchlistEntries]
                : allEntries ? allEntries : []
    }, [allDataLoaded, allEntries, watchlistEntries])

    const value = useMemo(() => ({
        combinedEntries
    }), [
        combinedEntries
    ])

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    )
}

export default WatchlistContext

