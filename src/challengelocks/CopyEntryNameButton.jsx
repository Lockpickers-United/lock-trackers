import React, {useCallback} from 'react'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Tooltip from '@mui/material/Tooltip'
import {enqueueSnackbar} from 'notistack'

export default function CopyEntryNameButton({entry}) {

    const handleClick = useCallback(async () => {
        await navigator.clipboard.writeText(`${entry.name} by ${entry.maker}`)
        enqueueSnackbar('Lock name copied to clipboard.')
    }, [entry])

    return (
        <Tooltip title='Copy Challenge Lock Name' arrow disableFocusListener>
            <IconButton onClick={handleClick}>
                <ContentCopyIcon/>
            </IconButton>
        </Tooltip>
    )
}
