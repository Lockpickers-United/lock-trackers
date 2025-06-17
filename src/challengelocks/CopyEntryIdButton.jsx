import React, {useCallback} from 'react'
import IconButton from '@mui/material/IconButton'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import {enqueueSnackbar} from 'notistack'
import Tooltip from '@mui/material/Tooltip'

function CopyEntryIdButton({entry}) {
    const handleClick = useCallback(async () => {
        await navigator.clipboard.writeText(entry.id)
        enqueueSnackbar('ID copied to clipboard.')
    }, [entry.id])

    return (
        <Tooltip title='Copy Entry Id' arrow disableFocusListener>
            <IconButton onClick={handleClick}>
                <FingerprintIcon style={{color:'#333'}}/>
            </IconButton>
        </Tooltip>
    )
}

export default CopyEntryIdButton
