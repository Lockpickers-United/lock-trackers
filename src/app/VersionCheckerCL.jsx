import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CachedIcon from '@mui/icons-material/Cached'
import DBContextCL from '../challengelocks/DBContextCL.jsx'
import AuthContext from './AuthContext.jsx'

function VersionChecker() {
    //if (import.meta.env.DEV) return null
    const {isLoggedIn} = useContext(AuthContext)
    const {newVersionAvailable} = useContext(DBContextCL)

    const handleClick = useCallback(() => location.reload(), [])

    if ((newVersionAvailable && isLoggedIn)) {
        return (
            <Tooltip title='New Version Available' arrow disableFocusListener>
                <IconButton onClick={handleClick} style={{color: '#fff702', marginLeft: 0}}>
                    <CachedIcon/>
                </IconButton>
            </Tooltip>
        )
    } else {
        return null
    }
}

export default VersionChecker
