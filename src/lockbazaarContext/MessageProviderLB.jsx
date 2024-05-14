import React, {useCallback, useContext, useMemo, useState} from 'react'
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

    const [displayMessage, setDisplayMessage] = useState(false)
    const [systemMessage, setSystemMessage] = useState(null)

    const handleDismiss = useCallback(() => {
        updateLastMessageDate({lastNewEntryDismiss: dayjs().format()})
    }, [updateLastMessageDate])


    // New Listings Message
    if (profile && filters?.collection !== 'Watchlist') {
        const startDate = dayjs('2024-05-12T00:00:00.000Z')
        const lastMessageDate = profile?.lastNewEntryDismiss ? dayjs(profile?.lastNewEntryDismiss) : startDate
        const newListingIds = watchlistIds.filter(id => {
            const newListingDate = getEntryFromId(id)?.newListingsDate ? dayjs(getEntryFromId(id).newListingsDate) : null
            return (newListingDate && newListingDate.isAfter(lastMessageDate))
        })
        if (newListingIds?.length > 0 && !systemMessage) {
            setSystemMessage(<NewListingsMessage entryCount={newListingIds?.length} handleDismiss={handleDismiss}/>)
        }
    }


    const value = useMemo(() => ({
        displayMessage,
        setDisplayMessage,
        systemMessage,
        handleDismiss
    }), [
        displayMessage,
        setDisplayMessage,
        systemMessage,
        handleDismiss
    ])

    return (
        <MessageContext.Provider value={value}>
            {children}
        </MessageContext.Provider>
    )
}

