import React from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function OpenYouTubeLinkButton({channel, fontSize}) {

    const link = channel.customUrl
        ? `https://www.youtube.com/${channel.customUrl}`
        : `https://www.youtube.com/channel/${channel.id}`

    return (
        <Tooltip title='View channel on YouTube' arrow disableFocusListener>
            <IconButton onClick={null} style={{height:40, width:40}}>
                <a href={link} target='_blank' rel='noopener noreferrer' style={{height: 24}}>
                    <OpenInNewIcon style={{color:'#fff'}}  fontSize={fontSize}/>
                </a>
            </IconButton>
        </Tooltip>
    )
}

export default OpenYouTubeLinkButton
