import React, {useContext, useMemo, useCallback} from 'react'
import DBContext from '../app/DBContext.jsx'
import AppContext from '../app/AppContext.jsx'
import LoadingContext from './LoadingContextLB.jsx'
import useData from '../util/useData'

const WatchlistContext = React.createContext({})

export function WatchlistProvider({children}) {

    const {verbose, beta} = useContext(AppContext)  //eslint-disable-line
    const {allDataLoaded, allEntries, uniqueLockIds, getLockLineFromId} = useContext(LoadingContext)
    const {profile} = useContext(DBContext)

    const getLpuWishlist = useCallback((id) => {
        const token = '81750a99'
        const url = `https://explore.lpubelts.com/wishlist/?token=${token}&id=${id}`
        const {data, loading, error} = useData({url})
        const lpuWishlist = data ? data[1].wishlist : []
        const lpuWishlistStatus = data ? data[1].status : []
        const jsonLoaded = (!loading && !error && !!data)
        return jsonLoaded ? {lpuWishlistStatus,lpuWishlist} : {}
    }, [])
    //console.log('wishlist', getLpuWishlist('GGplAdctTfVDLVvYsfIADJmfp8f2'))


    const watchlistIds = useMemo(() => profile?.watchlist || [], [profile?.watchlist])
    const watchlistEntries = useMemo(() => {
        return watchlistIds
            .filter(id => !uniqueLockIds.includes(id))
            .map((id) => {
                const entry = getLockLineFromId(id)
                if (entry) { entry.newListingsDate = new Date('1969-01-01') }
                return entry
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
        watchlistIds,
        watchlistEntries,
        combinedEntries,
        getLpuWishlist
    }), [
        watchlistIds,
        watchlistEntries,
        combinedEntries,
        getLpuWishlist
    ])

    return (
        <WatchlistContext.Provider value={value}>
            {children}
        </WatchlistContext.Provider>
    )
}

export default WatchlistContext

