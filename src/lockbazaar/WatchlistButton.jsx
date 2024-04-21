import IconButton from '@mui/material/IconButton'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import FavoriteIcon from '@mui/icons-material/Favorite'

function WatchlistButton({id, fontSize}) {
    const {isLoggedIn} = useContext(AuthContext)
    const {profile, addToLockCollection, removeFromLockCollection} = useContext(DBContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const isCollected = useMemo(() => {
        return profile?.watchlist?.includes(id)
    }, [id, profile?.watchlist])

    const handleChange = useCallback((event) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
        if (isLoggedIn) {
            if (!isCollected) {
                addToLockCollection('watchlist', id)
            } else {
                removeFromLockCollection('watchlist', id)
            }
        }
    }, [addToLockCollection, id, isCollected, isLoggedIn, removeFromLockCollection])

    const tooltipText = isCollected ? 'In Watchlist' : 'Add to Watchlist'

    return (
        <React.Fragment>
            <Tooltip title={tooltipText} arrow disableFocusListener>
                <IconButton onClick={handleChange} style={{height: 40, width: 40}}>
                    {isCollected &&
                        <FavoriteIcon fontSize={fontSize} color={isCollected ? 'error' : 'inherit'}/>
                    }
                    {!isCollected &&
                        <FavoriteIcon fontSize={fontSize} color={isCollected ? 'error' : 'inherit'}/>
                    }
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

export default WatchlistButton
