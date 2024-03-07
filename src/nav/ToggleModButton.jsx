import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ShieldIcon from '@mui/icons-material/Shield'
import AppContext from '../app/AppContext.jsx'

function ToggleModButton() {

    const {modMode, setModMode} = useContext(AppContext)

    const handleClick = useCallback(() => {
        setModMode(!modMode)
    }, [modMode, setModMode])

    return (
        <Tooltip title={`Toggle moderator mode to ${modMode ? 'off' : 'on'}`} arrow
                 disableFocusListener>
            <IconButton onClick={handleClick} color='inherit'>
                <ShieldIcon fontSize='small'  color={modMode ? 'primary' : 'secondary'}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToggleModButton