import Checkbox from '@mui/material/Checkbox'
import React, {useContext} from 'react'
import SPDataContext from './SPDataContext.jsx'

function ModModeCheckbox() {
    const {isMod, toggleMod = []} = useContext(SPDataContext)
    return (
        <div style={{fontSize: '1.0rem', textAlign: 'right', width: '50%', paddingRight: 10}}>
            moderator mode: <Checkbox value={isMod} onChange={toggleMod} defaultChecked style={{color: '#7272d7'}}/>
        </div>
    )
}

export default ModModeCheckbox