import React, {useCallback} from 'react'
import SP_logo from '../assets/SP_logo.jsx'
import SpeedPicks from '../assets/SpeedPicks.jsx'
import Button from '@mui/material/Button'
import {useLocation, useNavigate} from 'react-router-dom'
import ChallengeLocks from '../assets/ChallengeLocks.jsx'
import Profile from '../assets/Profile.jsx'
function TopNav(route) {

    const navigate = useNavigate()
    const location = useLocation()

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 30}

    const handleButtonClick = useCallback(newValue => () => {
        navigate(newValue)
    }, [navigate])

    const clFill = location.pathname === '/challengelocks' ? '#fff' : '#777'
    const spFill = location.pathname === '/speedpicks' ? '#fff' : '#777'
    const prFill = location.pathname === '/profile/edit' ? '#fff' : '#777'

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

            {route.route === 'pr' &&
                <div>
                    <div style={{display: 'flex', marginTop: 9, padding: 0}}>
                        <div style={{padding: 0}}>
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/speedpicks')}>
                                <SP_logo fill={spFill} style={{height: 30}}/>
                            </Button>
                            <Button variant='text' style={buttonSyle} disabled>
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
                            <Button variant='text' style={buttonSyle}
                                    onClick={handleButtonClick('/challengelocks')}>
                                <ChallengeLocks fill={clFill} style={{height: 30}}/>
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