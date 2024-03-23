import React, {useCallback} from 'react'
import SP_logo from '../assets/SP_logo.jsx'
import SpeedPicks from '../assets/SpeedPicks.jsx'
import Button from '@mui/material/Button'
import {useLocation, useNavigate} from 'react-router-dom'
import ChallengeLocks from '../assets/ChallengeLocks.jsx'
import Profile from '../assets/Profile.jsx'
import Nav_Contact from '../assets/Nav_Contact.jsx'
import Nav_PrivacyPolicy from '../assets/Nav_PrivacyPolicy.jsx'
import Nav_LockBazaar from '../assets/Nav_LockBazaar.jsx'

function TopNav(route) {

    const navigate = useNavigate()
    const location = useLocation()

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 30}

    const handleButtonClick = useCallback(newValue => () => {
        navigate(newValue)
    }, [navigate])

    const clFill = location.pathname === '/challengelocks' ? '#fff' : '#777'
    const lbFill = location.pathname === '/lockbazaar' ? '#fff' : '#777'
    const spFill = location.pathname === '/speedpicks' ? '#fff' : '#777'
    const prFill = location.pathname === '/profile/edit' ? '#fff' : '#777'
    const coFill = location.pathname === '/contact' ? '#fff' : '#777'
    const privFill = location.pathname === '/privacy' ? '#fff' : '#777'

    //console.log(location.pathname)

    return (

        <React.Fragment>

            {route.route === 'sp' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SpeedPicks fill={spFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'lb' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}
                            >
                                <Nav_LockBazaar fill={lbFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'pr' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <Profile fill={prFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'cl' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <ChallengeLocks fill={clFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'co' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <Nav_Contact fill={coFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'priv' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <Nav_PrivacyPolicy fill={privFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

        </React.Fragment>

    )
}

export default TopNav