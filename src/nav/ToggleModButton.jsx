import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ShieldIcon from '@mui/icons-material/Shield'
import DataContext from '../context/DataContext.jsx'

function ToggleModButton() {

    const {isMod, toggleMod = []} = useContext(DataContext)

    const handleClick = useCallback(() => {
        toggleMod()
    }, [toggleMod])

    return (
        <Tooltip title={`Toggle moderator mode to ${isMod ? 'off' : 'on'}`} arrow
                 disableFocusListener>
            <IconButton onClick={handleClick} color='inherit'>
                <ShieldIcon fontSize='small'  color={isMod ? 'primary' : 'secondary'}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToggleModButton