import React, {useCallback, useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AuthContext from '../app/AuthContext.jsx'
import SignInButton from '../auth/SignInButton.jsx'
import WatchlistAddLPUbelts from './WatchlistAddLPUbelts.jsx'
import {useNavigate} from 'react-router-dom'
import NotButton from '../misc/NotButton'

const WatchlistAddBar = () => {

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

    // Add LPUbelts Lock to Watchlist

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

                    <NotButton text={'Add LPUbelts Lock to Watchlist'} startIconName={''} onClick={()=>{}}
                               variant='contained' textStyle={{textTransform: 'none'}}
                               style={{backgroundColor: '#a5a5a5', margin: '4px 10px'}}
                               color={'#000'} tooltip={''} size={'medium'}/>

                    <NotButton text={'New! Import Your LPUbelts Wishlist'} startIconName={''} onClick={handleClick}
                               variant='contained' textStyle={{textTransform: 'none'}}
                               style={{backgroundColor: '#a5a5a5', margin: '4px 10px'}}
                               color={'#000'} tooltip={''} size={'medium'}/>
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

export default WatchlistAddBar