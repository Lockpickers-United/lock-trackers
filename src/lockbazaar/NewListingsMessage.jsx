import React, {useCallback} from 'react'
import MoodIcon from '@mui/icons-material/Mood'
import Button from '@mui/material/Button'
import {useNavigate} from 'react-router-dom'

function NewListingsMessage({entryCount, handleDismiss}) {

    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        navigate('/lockbazaar?sort=newListings&collection=Watchlist')
    }, [navigate])

    const newListingEntryCount = (entryCount > 10) ? 10 : entryCount
    const messageHeader = 'Good news!'
    const messageText = newListingEntryCount > 1
        ? numberNames[newListingEntryCount] + ' locks in your Watchlist have new listings.'
        : 'A lock in your Watchlist has new listings.'

    const messageTypeStyle = {
        width: 28,
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        paddingTop: 20,
        backgroundColor: '#609cce',
        textAlign: 'center'
    }

    return (
        <div style={{
            minWidth: '320px', maxWidth: 720, height: '100%',
            marginLeft: 'auto', marginRight: 'auto',
            textAlign: 'center'
        }}>
            <div style={{
                fontSize: '1rem',
                lineHeight: '1.2rem',
                width: '100%',
                textAlign: 'left',
                marginTop: 15,
                border: '1px solid #609cce',
                display: 'flex',
                alignItems: 'center', position: 'relative'
            }}>
                <div style={messageTypeStyle}><MoodIcon fontSize={'medium'}/></div>
                <div style={{width: '100%'}}>
                    <div style={{height: '100%', width: '100%', padding: '10px 20px 5px 45px'}}>
                        <b>{messageHeader}</b> {messageText}
                    </div>
                    <div style={{width: '100%', textAlign: 'right', padding: '5px 20px 10px 0px'}}>
                        <Button variant='text' size='small'
                                style={{
                                    lineHeight: '.9rem',
                                    textAlign: 'left',
                                    marginRight: 10
                                }}
                                color='primary'
                                onClick={handleClick}
                        >View Listings</Button>
                        <Button variant='text' size='small'
                                style={{
                                    lineHeight: '.9rem',
                                    textAlign: 'left'
                                }}
                                color='primary'
                                onClick={handleDismiss}
                        >Dismiss</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const numberNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', '10+']

export default NewListingsMessage
