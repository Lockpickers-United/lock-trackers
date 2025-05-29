import React, {useCallback} from 'react'
import {enqueueSnackbar} from 'notistack'
import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

function CopyLinkToCLButton({entry, fontSize='medium', style}) {

    const handleClick = useCallback(async () => {
        const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
        const link = `${window.location.origin}/#/challengelocks?id=${entry.id}&name=${safeName}`

        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to entry copied to clipboard.')
    }, [entry])

    return (
        <Tooltip title='Copy Link to Entry' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{height:40, width:40, ...style}}>
                <LinkIcon fontSize={fontSize}/>
            </IconButton>
        </Tooltip>
    )
}

export default CopyLinkToCLButton
