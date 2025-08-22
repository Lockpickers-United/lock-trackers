import React, {useCallback} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PrintIcon from '@mui/icons-material/Print'
import Button from '@mui/material/Button'
import useWindowSize from '../util/useWindowSize.jsx'

export default function PrintButton({entry, style, text = false}) {

    const encodedName = encodeURIComponent(entry.name)
    const encodedMaker = encodeURIComponent(entry.maker)

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const handleClick = useCallback(() => {
        openInNewTab(`${window.location.origin}/#/challengelocksPrint?id=${entry.id}&name=${encodedName}&maker=${encodedMaker}`)
    }, [entry.id, encodedName, encodedMaker])

    const {isMobile} = useWindowSize()
    const padding = isMobile ? 4 : 10
    const buttonStyle = {lineHeight: '1.0rem', fontSize: '0.8rem', padding: padding, maxHeight: 45, ...style}

    return (
        <Tooltip title='Print QR Code' arrow disableFocusListener>
            {text
                ? <IconButton onClick={handleClick} style={{height: 40, width: 40, ...style}}>
                    <PrintIcon fontSize='medium'/>
                </IconButton>
                : <Button variant='contained' onClick={handleClick} style={buttonStyle} size='small' color='success'>
                    Print QR Code
                </Button>
            }
        </Tooltip>

    )

}