import Checkbox from '@mui/material/Checkbox'
import React, {useContext} from 'react'
import DataContext from '../context/DataContext'

function ModModeCheckbox() {

    const {isMod, toggleMod = []} = useContext(DataContext)

    return (
        <div style={{
            fontSize: '1.0rem',
            textAlign: 'right',
            width: '50%',
            paddingRight: 10,
            color: '#ccc'
        }}>

            moderator mode: <Checkbox value={isMod} onChange={toggleMod} defaultChecked
                                      style={{color: '#ccc'}}/>

        </div>
    )
}

export default ModModeCheckbox