import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import entryName from '../util/entryName'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function CopyLinkToEntryButton({entry, nameType, fontSize}) {

    const name =  entryName(entry, nameType)
    const safeName = name.replace(/[\s/]/g, '_').replace(/\W/g, '')
    const [lockId, samelineIndex] = entry.id.split('-')     // eslint-disable-line
    const link = `https://share.lpubelts.com/?id=${lockId}&name=${safeName}`

    return (
        <Tooltip title='View lock on LPUbelts.com' arrow disableFocusListener>
            <IconButton onClick={null} style={{height:40, width:40}}>
                <a href={link} target='_blank' rel='noopener noreferrer' style={{height: 24}}>
                    <OpenInNewIcon style={{color:'#fff'}}  fontSize={fontSize}/>
                </a>
            </IconButton>
        </Tooltip>
    )
}

export default CopyLinkToEntryButton
