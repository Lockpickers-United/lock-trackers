import React, {useCallback, useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import EditEntry from './EditEntry.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import EditProfilePage from '../profile/EditProfilePage.jsx'
import SignInButton from '../auth/SignInButton.jsx'
import {Box} from '@mui/material'

const NewEntry = ({entriesUpdate}) => {

    const [open, setOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])
    
    const {user, isLoggedIn} = useContext(AuthContext)
    const {profile} = useContext(DBContext)
    const noUsername = isLoggedIn && user && !profile?.username
    const editOK = isLoggedIn && profile?.username

    const endEdit = useCallback(() => {
        //TODO : implement or remove
        console.log('implement or remove endEdit')
    }, [])

    return (
        <React.Fragment>
            <Accordion expanded={open} onChange={toggleOpen}
                       style={{
                           maxWidth: 700,
                           marginLeft: 'auto',
                           marginRight: 'auto',
                           marginBottom: 10,
                           backgroundColor: 'transparent',
                       }}>
                <AccordionSummary>
                    <div style={{fontSize: '.9rem', textAlign: 'center', width: '100%'}}>
                        <Box
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                color: '#333',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                border: '1px solid #000',
                                borderRadius: 5,
                                padding: '8px 12px',
                                cursor: 'pointer',
                                marginRight: 4,
                                marginBottom: 4
                            }}
                            sx={{
                                backgroundColor:'#d0770f',
                                '&:hover': {
                                    backgroundColor: '#e1810f'
                                }
                            }}
                        >
                            NEW ENTRY
                        </Box>


                    </div>
                </AccordionSummary>
                <AccordionDetails>

                    {!isLoggedIn &&
                        <React.Fragment>
                            <div style={{textAlign: 'center', alignItems: 'center'}}>
                                Please log in to submit a time<br/>
                                <div style={{
                                    width: 210,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 20,
                                    textAlign: 'center'
                                }}><SignInButton/></div>
                            </div>
                        </React.Fragment>
                    }
                    {noUsername && <EditProfilePage/>}
                    {editOK &&
                        <React.Fragment>
                            <EditEntry entry={null} toggleOpen={toggleOpen} entriesUpdate={entriesUpdate}
                                       endEdit={endEdit}/>
                        </React.Fragment>
                    }
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}

export default NewEntry