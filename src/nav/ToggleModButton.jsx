import React, {useContext} from 'react'
import {useTheme} from '@mui/material/styles'
import ColorModeContext from '../app/ColorModeContext.jsx'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LightModeIcon from '@mui/icons-material/LightMode'
import ShieldIcon from '@mui/icons-material/Shield'
import DataContext from '../context/DataContext.jsx'

function ToggleModButton() {

    const {isMod, toggleMod = []} = useContext(DataContext)

    const colorMode = React.useContext(ColorModeContext)

    const theme = useTheme()

    return (
        <Tooltip title={`Toggle moderator mode to ${isMod ? 'off' : 'on'}`} arrow
                 disableFocusListener>
            <IconButton onClick={toggleMod} color='inherit'>
                <ShieldIcon fontSize='small'  color={isMod ? 'primary' : 'secondary'}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToggleModButton