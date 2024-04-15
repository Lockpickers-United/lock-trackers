import React, {useCallback} from 'react'
import {enqueueSnackbar} from 'notistack'
import LinkIcon from '@mui/icons-material/Link'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import entryName from '../util/entryName'

function CopyLinkToEntryButton({entry, nameType, fontSize}) {

    const handleClick = useCallback(async () => {
        const name =  entryName(entry, nameType)
        const safeName = name.replace(/[\s/]/g, '_').replace(/\W/g, '')
        const link = `https://lpulocks.com/#/lockbazaar?id=${entry.id}&name=${safeName}`

        await navigator.clipboard.writeText(link)
        enqueueSnackbar('Link to entry copied to clipboard.')
    }, [entry, nameType])

    return (
        <Tooltip title='Copy Link to Entry' arrow disableFocusListener>
            <IconButton onClick={handleClick} style={{height:40, width:40}}>
                <LinkIcon fontSize={fontSize}/>
            </IconButton>
        </Tooltip>
    )
}

export default CopyLinkToEntryButton
