import React, {useContext} from 'react'
import SPEntries from './SPEntries.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import JsonDisplay from './JsonDisplay.jsx'
import SPDataContext from './SPDataContext.jsx'

function SPMain() {

    const {speedPicks = []} = useContext(SPDataContext)

    return (
        <React.Fragment>

            <SPEntries/>

            <div style={{height: 20}}/>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} style={{fontSize: '1.0rem'}}>
                    SPEEDPICKS DATA
                </AccordionSummary>
                <AccordionDetails>
                    <JsonDisplay json={speedPicks.data} jsonName={'speedPicks'}/>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}

export default SPMain