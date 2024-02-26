import React, {useCallback} from 'react'
import CL_logo from '../assets/CL_logo.jsx'
import SP_logo from '../assets/SL_logo.jsx'
import Button from '@mui/material/Button'
import {useLocation, useNavigate} from 'react-router-dom'

function TopNav() {

    const navigate = useNavigate()
    const location = useLocation()

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 50}

    const handleButtonClick = useCallback(newValue => () => {
        navigate(newValue)
    }, [navigate])

    const clFill = location.pathname === '/challengelocks' ? '#fff' : '#666'
    const spFill = location.pathname === '/speedpicks' ? '#fff' : '#666'

    return (
        <React.Fragment>
            <div style={{display: 'flex', marginTop:13, padding:0}}>
                <div style={{width: '80%', padding:0}}>
                    <Button variant='text' style={buttonSyle}
                            onClick={handleButtonClick('/speedpicks')}>
                        <SP_logo fill={spFill} style={{height: 50}}/>
                    </Button>
                    <Button variant='text' style={buttonSyle}
                            onClick={handleButtonClick('/challengelocks')}>
                        <CL_logo fill={clFill} style={{height: 50}}/>
                    </Button>
                </div>
            </div>
            <div style={{height: 12}}/>
        </React.Fragment>
    )
}

export default TopNav