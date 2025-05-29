import React, {useCallback} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PrintIcon from '@mui/icons-material/Print'

export default function PrintButton({entry, style}) {

    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const handleClick = useCallback(() => {
        openInNewTab(`${window.location.origin}/#/challengelocks/print?id=${entry.id}&name=${safeName}`)
    },[entry.id, safeName])

    return (
    <Tooltip title='Print QR Code' arrow disableFocusListener>
        <IconButton onClick={handleClick} style={{height:40, width:40, ...style}}>
            <PrintIcon fontSize='medium'/>
        </IconButton>
    </Tooltip>

)

}