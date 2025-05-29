import React, {useCallback} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

export default function ReportButton({entry, style}) {

    const safeName = entry.name.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const handleClick = useCallback(() => {
        console.log('Report Problem clicked for entry:', safeName, entry.id)
    },[entry.id, safeName])

    return (
    <Tooltip title='Report Problem' arrow disableFocusListener>
        <IconButton onClick={handleClick} style={{height:40, width:40, ...style}}>
            <ReportProblemIcon fontSize='medium'/>
        </IconButton>
    </Tooltip>

)

}