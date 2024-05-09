import React, {useCallback, useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AuthContext from '../app/AuthContext.jsx'
import SignInButton from '../auth/SignInButton.jsx'
import Button from '@mui/material/Button'
import WatchlistAddLPUbelts from './WatchlistAddLPUbelts.jsx'
import {useNavigate} from 'react-router-dom'

const WatchlistAddLPUbeltsButton = () => {

    const {isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    const [open, setOpen] = useState(window.location.hash.includes('add'))
    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])

    const handleClick = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()
        navigate('/import')
    }, [navigate])

    return (
        <Accordion expanded={open} onChange={toggleOpen}
                   style={{
                       maxWidth: 700,
                       marginLeft: 'auto',
                       marginRight: 'auto',
                       marginBottom: 10,
                       backgroundColor: 'transparent'
                   }}>
            <AccordionSummary>
                <div style={{fontSize: '.9rem', textAlign: 'center', width: '100%'}}>
                    <Button variant='contained' size='small'
                            style={{backgroundColor: '#a5a5a5', textTransform: 'none', margin: '4px 10px'}}>
                        Add LPUbelts Lock to Watchlist
                    </Button>
                    <Button variant='contained' size='small' onClick={handleClick}
                            style={{backgroundColor: '#a5a5a5', textTransform: 'none', margin: '4px 10px'}}>
                        New! Import Your LPUbelts Wishlist
                    </Button>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {!isLoggedIn &&
                    <div style={{textAlign: 'center', alignItems: 'center'}}>
                        Please log in to use a Watchlist<br/>
                        <div style={{
                            width: 210,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: 20,
                            textAlign: 'center'
                        }}><SignInButton/></div>
                    </div>
                }
                {isLoggedIn &&
                    <WatchlistAddLPUbelts/>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default WatchlistAddLPUbeltsButton