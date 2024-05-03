import React, {useCallback} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import SP_logo from '../assets/SP_logo.jsx'
import SpeedPicks from '../assets/SpeedPicks.jsx'
import Button from '@mui/material/Button'
import ChallengeLocks from '../assets/ChallengeLocks.jsx'
import Profile from '../assets/Profile.jsx'
import Nav_Contact from '../assets/Nav_Contact.jsx'
import Nav_PrivacyPolicy from '../assets/Nav_PrivacyPolicy.jsx'
import Nav_LockBazaar from '../assets/Nav_LockBazaar.jsx'
import LB_logo from '../assets/LB_logo.jsx'
import Nav_Reports from '../assets/Nav_Reports.jsx'

function TopNav(route) {

    const navigate = useNavigate()
    const location = useLocation()

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 30}

    const handleButtonClick = useCallback(newValue => () => {
        navigate(newValue)
    }, [navigate])

    const clFill = location.pathname === '/challengelocks' ? '#fff' : '#777'
    const lbFill = (location.pathname === '/lockbazaar' || location.pathname === '/import') ? '#fff' : '#777'
    const lbsFill = location.pathname === '/lockbazaar/sellers' ? '#fff' : '#777'
    const repFill = location.pathname === '/reports' ? '#fff' : '#777'
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
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SpeedPicks fill={spFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }
            {(route.route === 'lb') &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}
                            >
                                <Nav_LockBazaar fill={lbFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }
            {(route.route === 'lbs') &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}
                            >
                                <Nav_LockBazaar fill={lbsFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'rep' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <Nav_Reports fill={repFill} style={{height: 30}}/>
                            </Button>
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

            {route.route === 'pr' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <Button variant='text' style={buttonSyle}
                                onClick={handleButtonClick('/lockbazaar')}>
                            <LB_logo fill={lbFill} style={{height: 30}}/>
                        </Button>
                        <Button variant='text' style={buttonSyle}
                                onClick={handleButtonClick('/speedpicks')}>
                            <SP_logo fill={spFill} style={{height: 30}}/>
                        </Button>
                        <div style={{padding: 0}}>
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
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
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
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
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
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
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

            {!route.route &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
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