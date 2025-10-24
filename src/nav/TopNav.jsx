import React, {useCallback, useContext} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import SpeedPicks from '../assets/SpeedPicks.jsx'
import Button from '@mui/material/Button'
import ChallengeLocks from '../assets/ChallengeLocks.jsx'
import Profile from '../assets/Profile.jsx'
import Nav_Contact from '../assets/Nav_Contact.jsx'
import Nav_PrivacyPolicy from '../assets/Nav_PrivacyPolicy.jsx'
import Nav_LockBazaar from '../assets/Nav_LockBazaar.jsx'
import SP_logo from '../assets/SP_logo.jsx'
import LB_logo from '../assets/LB_logo.jsx'
import CL_logo from '../assets/CL_logo.jsx'
import RAFL_logo from '../assets/RAFL_logo.jsx'
import Nav_Reports from '../assets/Nav_Reports.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import AppContext from '../app/AppContext.jsx'

function TopNav(route) {
    const {beta} = useContext(AppContext)

    const navigate = useNavigate()
    const location = useLocation()
    const {VITE_RAFL_STATE: raflState} = import.meta.env

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 30}

    const handleButtonClick = useCallback(newValue => () => {
        navigate(newValue)
    }, [navigate])

    const clFill = location.pathname.includes('/challengelocks') ? '#fff' : '#777'
    const lbFill = (location.pathname === '/lockbazaar' || location.pathname === '/import') ? '#fff' : '#777'
    const lbsFill = location.pathname === '/lockbazaar/sellers' ? '#fff' : '#777'
    const raflFill = location.pathname === '/rafl' ? '#fff' : '#777'
    const repFill = location.pathname === '/reports' ? '#fff' : '#777'
    const spFill = (location.pathname === '/speedpicks' || route.route === 'sp') ? '#fff' : '#777'
    const prFill = location.pathname === '/profile/edit' ? '#fff' : '#777'
    const coFill = location.pathname === '/contact' ? '#fff' : '#777'
    const privFill = location.pathname === '/privacy' ? '#fff' : '#777'

    const {isMobile} = useWindowSize()
    const iconSize = isMobile ? 28 : 30
    return (

        <React.Fragment>

            {route.route === 'sp' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/lockbazaar')}>
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SpeedPicks fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                            {raflState !== 'hidden' &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/rafl')}>
                                    <RAFL_logo fill={raflFill} style={{height: iconSize}}/>
                                </Button>
                            }
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
                                <Nav_LockBazaar fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                            {raflState !== 'hidden' &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/rafl')}>
                                    <RAFL_logo fill={raflFill} style={{height: iconSize}}/>
                                </Button>
                            }
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
                                <Nav_LockBazaar fill={lbsFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                            {raflState !== 'hidden' &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/rafl')}>
                                    <RAFL_logo fill={raflFill} style={{height: iconSize}}/>
                                </Button>
                            }
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
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/challengelocks')}>
                                <CL_logo fill={clFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}>
                                <Nav_Reports fill={repFill} style={{height: iconSize}}/>
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
                            <LB_logo fill={lbFill} style={{height: iconSize}}/>
                        </Button>
                        <Button variant='text' style={buttonSyle}
                                onClick={handleButtonClick('/speedpicks')}>
                            <SP_logo fill={spFill} style={{height: iconSize}}/>
                        </Button>
                        {beta &&
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/challengelocks')}>
                                <CL_logo fill={clFill} style={{height: iconSize}}/>
                            </Button>
                        }
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}>
                                <Profile fill={prFill} style={{height: iconSize}}/>
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
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/challengelocks')}>
                                <ChallengeLocks fill={clFill} style={{height: iconSize}}/>
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
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                            <Button variant='text' style={buttonSyle}>
                                <Nav_Contact fill={coFill} style={{height: iconSize}}/>
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
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                            <Button variant='text' style={buttonSyle}>
                                <Nav_PrivacyPolicy fill={privFill} style={{height: iconSize}}/>
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
                                <LB_logo fill={lbFill} style={{height: iconSize}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: iconSize}}/>
                            </Button>
                            {beta &&
                                <Button variant='text' style={buttonSyle}
                                        onClick={handleButtonClick('/challengelocks')}>
                                    <CL_logo fill={clFill} style={{height: iconSize}}/>
                                </Button>
                            }
                        </div>
                    </div>
                    <div style={{height: 12}}/>
                </div>
            }

        </React.Fragment>

    )
}

export default TopNav