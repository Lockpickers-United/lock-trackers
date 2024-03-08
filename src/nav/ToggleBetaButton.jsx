import Tooltip from '@mui/material/Tooltip'
import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import AppContext from '../app/AppContext'
import BoltIcon from '@mui/icons-material/Bolt'
import AuthContext from '../app/AuthContext.jsx'

function ToggleBetaButton() {
    const {beta, setBeta} = useContext(AppContext)
    const {isLoggedIn} = useContext(AuthContext)

    const handleClick = useCallback(() => {
        setBeta(!beta)
    }, [beta, setBeta])

    if (isLoggedIn) {
        return (
            <Tooltip title={`Toggle Beta Features ${beta ? 'Off' : 'On'}`} arrow disableFocusListener>
                <IconButton onClick={handleClick}>
                    <BoltIcon fontSize='small' style={{color: beta ? '#459eea' : '#0b0017'}}/>
                </IconButton>
            </Tooltip>
        )
    } else {
        return null
    }
}

export default ToggleBetaButton
