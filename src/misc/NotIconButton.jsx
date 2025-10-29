import React from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Icon from '@mui/material/Icon'

// (icon button, share link): http://localhost:3001/#/lockbazaar?collection=Watchlist&sellerName=Lockskipper

export default function NotIconButton({iconName, onClick, tooltip = '', color = '#fff', hoverColor, size = 'medium'}) {

    return (
        <Tooltip title={tooltip} arrow disableFocusListener>
            <Box
                style={{
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 20,
                    cursor: 'pointer',
                    width: 40,
                    height: 40
                }}
                sx={{
                    color: color,
                    '&:hover': {
                        backgroundColor: '#ffffff14',
                        color: hoverColor || color || 'inherit'
                    }
                }}
                onClick={onClick}
            >
                <Icon fontSize={size === 'small' ? 'small' : 'medium'}>{iconName}</Icon>
            </Box>
        </Tooltip>
    )
}