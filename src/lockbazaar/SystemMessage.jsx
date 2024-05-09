import React, {useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
//import FilterContext from '../context/FilterContext.jsx'

import MoodIcon from '@mui/icons-material/Mood'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Button from '@mui/material/Button'

function SystemMessage() {
    //const {filters} = useContext(FilterContext)
    //const watchlistView = !!filters && filters?.collection === 'Watchlist'

    const [displayMessage] = useState(false)


    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '8px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return !displayMessage
        ? null
        : (
        <div style={{
            minWidth: '320px', maxWidth: 720, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>
            <div style={{
                fontSize: '1rem',
                lineHeight: '1.2rem',
                width: '100%',
                textAlign: 'left',
                marginTop: 15,
                border: '1px solid #609cce',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    backgroundColor: '#609cce', padding: '20px 2px', height: '100%', alignItems: 'center'
                }}>
                    <MoodIcon fontSize={'medium'}/>
                </div>
                <div style={{height: '100%', width:'100%', padding: '5px 20px'}}><b>Good news!</b> Locks in your
                    Watchlist have new listings.
                    Click here to view.
                </div>
                <Button style={{
                    marginTop: -60,
                    marginRight: -12,
                    backgroundColor: '#000',
                    height: 24,
                    minWidth: 24,
                    width: 24,
                    borderRadius: 12
                }}><HighlightOffIcon/></Button>
            </div>

        </div>
    )
}

export default SystemMessage
