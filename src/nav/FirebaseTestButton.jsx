import React, {useCallback, useContext} from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TelegramIcon from '@mui/icons-material/Telegram'
import DBContext from '../app/DBContext.jsx'
import {enqueueSnackbar} from 'notistack'

function FirebaseTestButton() {

    const verbose = false
    const {testDoc, updateTestDoc} = useContext(DBContext)
    verbose && console.log('testDoc', testDoc)

    const handleSave = useCallback(async () => {
        try {
            updateTestDoc('qwe')
            enqueueSnackbar('Congratulations!')
        } catch (ex) {
            console.error('Error while updating testDoc', ex)
            enqueueSnackbar('Error while updating testDoc', ex)
        }
    }, [updateTestDoc])

    return (
        <Tooltip title={'Test!'} arrow disableFocusListener>
            <IconButton onClick={handleSave} style={{color:'#0b0017'}}>
                <TelegramIcon fontSize='small'/>
            </IconButton>
        </Tooltip>
    )
}

export default FirebaseTestButton