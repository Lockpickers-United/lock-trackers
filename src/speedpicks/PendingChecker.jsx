import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DataContext from '../app/DataContext.jsx'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import {useNavigate} from 'react-router-dom'

function PendingChecker() {

    //if (import.meta.env.DEV) return null

    const navigate = useNavigate()
    const {pendingEntries, isMod} = useContext(DataContext)

    const handleClick = useCallback(() => {
        navigate('/speedpicks?status=pending')
    }, [navigate])

    if (pendingEntries?.length > 0 && isMod) {
        return (
            <Tooltip title='Pending Entries Waiting' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{color: '#ed4242', marginLeft: 0}}>
                    <CircleNotificationsIcon/>
                </IconButton>
            </Tooltip>
        )
    } else {
        return null
    }
}

export default PendingChecker
