import React, {useCallback, useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import EditProfilePage from '../profile/EditProfilePage.jsx'
import SignInButton from '../auth/SignInButton.jsx'
import Button from '@mui/material/Button'
import WatchlistAddLPUbelts from './WatchlistAddLPUbelts.jsx'

const WatchlistAddLPUbeltsButton = () => {

    const [open, setOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])

    const {user, isLoggedIn} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const noUsername = isLoggedIn && user && !profile?.username
    const editOK = isLoggedIn && profile?.username

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
                        <Button variant='contained' size='small' style={{backgroundColor: '#609cce'}}>
                            Add LPUbelts Lock to Watchlist
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
                    {noUsername && <EditProfilePage/>}
                    {editOK &&
                        <WatchlistAddLPUbelts/>
                    }
                </AccordionDetails>
            </Accordion>
    )
}

export default WatchlistAddLPUbeltsButton