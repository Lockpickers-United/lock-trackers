import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DBContext from './DBContext.jsx'
import CachedIcon from '@mui/icons-material/Cached'

function VersionChecker() {
    //if (import.meta.env.DEV) return null
    const {newVersionAvailable, profile} = useContext(DBContext)

    const handleClick = useCallback(() => location.reload(), [])

    if (newVersionAvailable && profile?.username) {
        return (
            <Tooltip title='New Version Available' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{color: '#7272ce', marginLeft: 0}}>
                    <CachedIcon/>
                </IconButton>
            </Tooltip>
        )
    } else {
        return null
    }
}

export default VersionChecker
