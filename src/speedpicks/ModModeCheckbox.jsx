import Checkbox from '@mui/material/Checkbox'
import React, {useContext} from 'react'
import DataContext from '../context/DataContext'
import {useTheme} from '@mui/material/styles'
import ColorModeContext from '../app/ColorModeContext.jsx'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

function ModModeCheckbox() {

    const colorMode = React.useContext(ColorModeContext)
    const {isMod, toggleMod = []} = useContext(DataContext)

    const theme = useTheme()

    return (
        <div style={{
            fontSize: '1.0rem',
            textAlign: 'right',
            width: '50%',
            paddingRight: 10,
            color: theme.palette.text
        }}>

            moderator mode: <Checkbox value={isMod} onChange={toggleMod} defaultChecked style={{color: '#7272d7'}}/>

            { 0===0 &&
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            }


        </div>
    )
}

export default ModModeCheckbox