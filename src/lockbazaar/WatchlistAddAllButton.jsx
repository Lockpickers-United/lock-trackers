import React, {useCallback, useContext, useMemo, useState} from 'react'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'

function WatchlistAddAllButton({entry}) {

    const {isLoggedIn} = useContext(AuthContext)
    const {profile, addToLockCollection, removeFromLockCollection} = useContext(DBContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const allIds = entry.makeModels.length > 1
        ? entry.makeModels.map((makeModel, index) => {
            return entry.id + '-' + (index + 1)
        })
        : entry.id

    const areCollected = useMemo(() => {
        return allIds.every(r => profile.watchlist.includes(r))
    }, [allIds, profile.watchlist])

    const handleChange = useCallback(async (event) => {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        if (isLoggedIn) {
            if (!areCollected) {
                await addToLockCollection('watchlist', allIds)
            } else {
                await removeFromLockCollection('watchlist', allIds)
            }
        }
    }, [isLoggedIn, areCollected, allIds, addToLockCollection, removeFromLockCollection])

    const tooltipText = areCollected ? 'Remove All' : 'Add All'

    return (
        <React.Fragment>
            <Tooltip title={tooltipText} arrow disableFocusListener>
                <div style={{alignItems: 'left'}}>
                    <Button size='small' startIcon={<FavoriteIcon/>} onClick={handleChange}
                            color={areCollected ? 'error' : 'inherit'} style={{alignItems: 'left'}}>
                        <nobr>{tooltipText}</nobr>
                    </Button>
                </div>
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

export default WatchlistAddAllButton
