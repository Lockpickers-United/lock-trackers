import React, {useCallback, useContext, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import EditEntry from './EditEntry.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import EditProfilePage from '../profile/EditProfilePage.jsx'
import SignInButton from '../auth/SignInButton.jsx'
import RulesInfo from './RulesInfo.jsx'

const NewEntry = ({entriesUpdate}) => {

    const [open, setOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])

    const [openRules, setOpenRules] = useState(false)
    const toggleOpenRules = useCallback(() => {
        setOpenRules(!openRules)
    }, [openRules])

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
                       style={{maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
                <AccordionSummary expandIcon={<AddCircleIcon style={{fontSize: 'large'}}/>}>
                    <div style={{fontSize: '1.0rem', textAlign: 'right', width: '100%', paddingRight: 10}}>
                        New Entry
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

                            <Accordion expanded={openRules} onChange={toggleOpenRules}
                                       style={{maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom: 0, boxShadow:'none'}}
                                       disableGutters
                            >
                                <AccordionSummary>
                                    <div style={{fontSize: '1rem', lineHeight:'1.2rem'}}>
                                        <a href='javascript:void(0)'>Click here</a> for
                                        submission rules and information.
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <RulesInfo/>
                                </AccordionDetails>
                            </Accordion>

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