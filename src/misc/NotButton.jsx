import React from 'react'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Icon from '@mui/material/Icon'

// contained buttons: http://localhost:3001/#/lockbazaar?collection=Watchlist
// text button with icon: http://localhost:3001/#/lockbazaar?collection=Watchlist&sellerName=Lockskipper
// (icon button, share link): http://localhost:3001/#/lockbazaar?collection=Watchlist&sellerName=Lockskipper

export default function NotButton({
                                      text,
                                      onClick,
                                      tooltip = '',
                                      color = '#fff',
                                      backgroundColor = '#a5a5a5',
                                      hoverColor,
                                      size = 'medium',
                                      startIconName,
                                      variant,
                                      style,
                                      textStyle
                                  }) {

    const buttonText = text
    const boxShadow = '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
    const fontSize = size === 'small' ? '0.8rem' : '0.81rem'

    const letterSpacing = size === 'small' ? '0.02rem' : '0.02rem'
    const fontWeight = size === 'small' ? 500 : 500
    const iconSize = size === 'small' ? '1.05rem' : '1.25rem'
    const padding = size === 'small' ? '4px 4px' : '6.5px 10px'
    const variantStyles = {
        contained: {fontSize, border: `1px solid ${backgroundColor}`, boxShadow},
        outlined: {fontSize, border: `1px solid ${color}`, boxShadow},
        text: {fontSize: '0.9rem', border: 'none'}
    }

    return (
        <Tooltip title={tooltip} arrow disableFocusListener>
            <Box style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding,
                borderRadius: 4,
                cursor: 'pointer',
                ...variantStyles[variant],
                ...style
            }}
                 sx={{
                     fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                     color: color,
                     '&:hover': {
                         backgroundColor: '#ffffff09',
                         color: hoverColor || color || 'inherit'
                     }
                 }}
                 onClick={onClick}
            >

                <div style={{
                    letterSpacing,
                    fontWeight,
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    textTransform: 'uppercase',
                    alignItems: 'center',
                    ...textStyle
                }}>
                    {startIconName && startIconName.length > 0 &&
                        <Icon sx={{fontSize: iconSize}} style={{marginRight: 8}}>{startIconName}</Icon>
                    }
                    {buttonText}
                </div>
            </Box>
        </Tooltip>
    )
}