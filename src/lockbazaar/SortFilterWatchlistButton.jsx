import IconButton from '@mui/material/IconButton'
import React, {useCallback, useContext, useMemo} from 'react'
import Tooltip from '@mui/material/Tooltip'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FilterContext from '../context/FilterContext.jsx'

function SortFilterWatchlistButton() {
    const {isLoggedIn} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const {filters, addFilter, removeFilter} =useContext(FilterContext)

    const watchlistView = useMemo(() => {
        return filters.collection === 'Watchlist'
    }, [filters.collection])

    const hasWatchlist = useMemo(() => {
        return !!profile?.watchlist && profile.watchlist.length > 0
    }, [profile?.watchlist])

    const handleChange = useCallback((event) => {
        event.preventDefault()
            if (!watchlistView) {
                addFilter('collection', 'Watchlist', true)
            } else {
                removeFilter('collection')
            }
    }, [addFilter, removeFilter, watchlistView])

    const tooltipText = isLoggedIn ? 'View Watchlist' : 'Sign in to create Watchlist'

    const watchlistIcon = watchlistView
        ? <FavoriteIcon fontSize={'medium'} color={hasWatchlist ? 'error' : 'inherit'}/>
        : <FavoriteIcon fontSize={'medium'} color={hasWatchlist ? 'error' : 'inherit'}/>

    return (
            <Tooltip title={tooltipText} arrow disableFocusListener>
                <IconButton onClick={handleChange} style={{height: 40, width: 40, marginTop: 4}}>
                    {watchlistIcon}
                </IconButton>
            </Tooltip>
    )
}

export default SortFilterWatchlistButton
