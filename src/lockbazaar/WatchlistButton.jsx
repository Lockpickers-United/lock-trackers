import React, {useCallback, useContext, useMemo, useState} from 'react'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton'
import AuthContext from '../app/AuthContext'
import DBContext from '../app/DBContext'
import useWindowSize from '../util/useWindowSize.jsx'
import NotButton from '../misc/NotButton'
import NotIconButton from '../misc/NotIconButton.jsx'

function WatchlistButton({id, fontSize, dense}) {
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
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
        if (isLoggedIn) {
            if (!isCollected) {
                addToLockCollection('watchlist', [id])
            } else {
                removeFromLockCollection('watchlist', [id])
            }
        }
    }, [addToLockCollection, id, isCollected, isLoggedIn, removeFromLockCollection])

    const {width} = useWindowSize()
    const smallWindow = width <= 400

    const tooltipText = isCollected
        ? 'In Watchlist'
        : smallWindow
            ? '+ Watchlist'
            : 'Add to Watchlist'

    return (
        <React.Fragment>
            {dense &&
                    <NotIconButton iconName={'favorite'} onClick={handleChange} size={fontSize}
                                   tooltip={tooltipText} color={isCollected ? '#F44336' : 'inherit'}/>
            }
            {!dense &&
                <NotButton text={tooltipText} startIconName={'favorite'} onClick={handleChange}
                           color={isCollected ? '#F44336' : 'inherit'} tooltip={tooltipText} size={fontSize}/>
            }

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
