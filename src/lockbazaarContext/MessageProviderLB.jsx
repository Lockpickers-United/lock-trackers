import React, {useCallback, useContext, useMemo} from 'react'
import MessageContext from '../app/MessageContext.jsx'
import DBContext from '../app/DBContext.jsx'
import DataContext from '../app/DataContext.jsx'
import WatchlistContextLB from './WatchlistContextLB.jsx'
import dayjs from 'dayjs'

import NewListingsMessage from '../lockbazaar/NewListingsMessage.jsx'
import FilterContext from '../context/FilterContext.jsx'

export function MessageProvider({children}) {
    const {profile, updateLastMessageDate} = useContext(DBContext)
    const {filters} = useContext(FilterContext)
    const {getEntryFromId} = useContext(DataContext)
    const {watchlistIds} = useContext(WatchlistContextLB)


    const handleDismiss = useCallback(() => {
        updateLastMessageDate({lastNewEntryDismiss: dayjs().format()})
    }, [updateLastMessageDate])


    // New Listings Message

    const systemMessage = useMemo(() => {
        if (profile && filters?.collection !== 'Watchlist') {
            const startDate = dayjs('2024-05-14T00:00:00.000Z')
            const lastMessageDate = profile?.lastNewEntryDismiss ? dayjs(profile?.lastNewEntryDismiss) : startDate
            const newListingIds = watchlistIds.filter(id => {
                const newListingDate = getEntryFromId(id)?.newListingsDate ? dayjs(getEntryFromId(id).newListingsDate) : null
                return (newListingDate && newListingDate.isAfter(lastMessageDate))
            })
            if (newListingIds?.length > 0) {
                return <NewListingsMessage entryCount={newListingIds?.length} handleDismiss={handleDismiss}/>
            }
        }
    }, [filters?.collection, getEntryFromId, handleDismiss, profile, watchlistIds])

    const value = useMemo(() => ({
        systemMessage,
        handleDismiss
    }), [
        systemMessage,
        handleDismiss
    ])

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    )
}

