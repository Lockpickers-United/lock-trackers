import React from 'react'
import {useTheme} from '@mui/material/styles'
import ColorModeContext from '../app/ColorModeContext.jsx'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LightModeIcon from '@mui/icons-material/LightMode'

function ToggleColorMode() {

    const colorMode = React.useContext(ColorModeContext)

    const theme = useTheme()

    return (
        <Tooltip title={`Toggle color mode to ${theme.palette.mode === 'dark' ? 'light' : 'dark'}`} arrow
                 disableFocusListener>
            <IconButton onClick={colorMode.toggleColorMode} color='inherit'>
                <LightModeIcon fontSize='small'  color={theme.palette.mode === 'dark' ? 'secondary' : 'inherit'}/>
            </IconButton>
        </Tooltip>
    )
}

export default ToggleColorMode