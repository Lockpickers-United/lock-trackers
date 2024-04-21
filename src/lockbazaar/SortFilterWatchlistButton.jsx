import IconButton from '@mui/material/IconButton'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FilterContext from '../context/FilterContext.jsx'

function SortFilterWatchlistButton() {
    const {isLoggedIn} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const {filters, addFilter, removeFilter} =useContext(FilterContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const watchlistView = useMemo(() => {
        return filters.collection === 'Watchlist'
    }, [filters.collection])

    console.log('watchlistView', watchlistView)

    const hasWatchlist = useMemo(() => {
        return !!profile?.watchlist && profile.watchlist.length > 0
    }, [profile?.watchlist])

    const handleChange = useCallback((event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)

        if (isLoggedIn) {
            if (!watchlistView) {
                addFilter('collection', 'Watchlist', true)
            } else {
                removeFilter('collection')
            }
        }

    }, [addFilter, isLoggedIn, removeFilter, watchlistView])

    const tooltipText = isLoggedIn ? 'View Watchlist' : 'Sign in to create Watchlist'

    const watchlistIcon = watchlistView
        ? <FavoriteIcon fontSize={'medium'} color={hasWatchlist ? 'error' : 'inherit'}/>
        : <FavoriteBorderIcon fontSize={'medium'} color={hasWatchlist ? 'error' : 'inherit'}/>

    return (
        <React.Fragment>
            <Tooltip title={tooltipText} arrow disableFocusListener>
                <IconButton onClick={handleChange} style={{height: 40, width: 40, marginTop: 4}}>
                    {watchlistIcon}
                </IconButton>
            </Tooltip>
            {(!isLoggedIn && open) &&
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                <div style={{padding: 20}}>
                    You must be signed in<br/>
                    to use a Watchlist.<br/>
                    <br/>
                    <SignInButton onClick={handleClose}/>
                </div>
            </Popover>
            }
        </React.Fragment>
    )
}

export default SortFilterWatchlistButton
