import React, {useState, useCallback, useContext} from 'react'
import CL_logo from '../assets/CL_logo.jsx'
import SP_logo from '../assets/SL_logo.jsx'
import LT_logo from '../assets/LT_logo.jsx'

import Button from '@mui/material/Button'
import {ToggleButtonGroup, ToggleButton} from '@mui/material'
import SPDataContext2 from '../speedpicks/DataContext.jsx'

function TopNav({handleChange, handleSort}) {

    const handleSortClick = useCallback(newValue => () => {
        handleSort(newValue)
    }, [])

    const buttonSyle = {border: 0, padding: 0, marginRight: 6, minWidth: 50}

    const [selected, setSelected] = useState('sp')

    const handleButtonClick = useCallback(newValue => () => {
        setSelected(newValue)
        //handleChange(newValue)
    }, [])

    const clFill = selected === 'cl' ? '#fff' : '#666'
    const spFill = selected === 'sp' ? '#fff' : '#666'

    return (
        <React.Fragment>
            <div style={{display: 'flex', marginTop:13, padding:0}}>
                <div style={{width: '80%', padding:0}}>
                    <Button variant='text' style={buttonSyle}
                            onClick={handleButtonClick('sp')}>
                        <SP_logo fill={spFill} style={{height: 50}}/>
                    </Button>
                    <Button variant='text' style={buttonSyle}
                            onClick={handleButtonClick('cl')}>
                        <CL_logo fill={clFill} style={{height: 50}}/>
                    </Button>
                </div>
                { 1===0 &&
                <div style={{textAlign: 'center'}}>
                    <span style={{fontSize: '.7rem'}}>SORT BY</span>
                    <ToggleButtonGroup style={{height: 24}}>
                        <ToggleButton style={{padding: 6}} value={'lock'} onClick={handleSortClick('lock')}>Lock</ToggleButton>
                        <ToggleButton style={{padding: 6}} value={'picker'} onClick={handleSortClick('picker')}>Picker</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                }
            </div>

            <div style={{height: 12}}/>
        </React.Fragment>
    )
}

export default TopNav