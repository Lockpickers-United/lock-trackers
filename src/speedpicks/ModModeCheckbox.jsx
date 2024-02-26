import Checkbox from '@mui/material/Checkbox'
import React, {useContext} from 'react'
import DataContext from '../context/DataContext'
import {useTheme} from '@mui/material/styles'

function ModModeCheckbox() {
    const theme = useTheme()

    const {isMod, toggleMod = []} = useContext(DataContext)

    return (
        <div style={{
            fontSize: '1.0rem',
            textAlign: 'right',
            width: '50%',
            paddingRight: 10,
            color: theme.palette.text.primary
        }}>
            moderator mode: <Checkbox value={isMod} onChange={toggleMod} defaultChecked style={{color: '#7272d7'}}/>
        </div>
    )
}

export default ModModeCheckbox