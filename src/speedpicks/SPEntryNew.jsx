import React, {useCallback, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SPEntryEdit from './SPEntryEdit.jsx'

const SPEntryNew = ({entriesUpdate}) => {

    const [open,setOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setOpen(!open)
    }, [open])

    return (

        <Accordion expanded={open} onChange={toggleOpen} style={{maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', marginBottom:10}}>
            <AccordionSummary expandIcon={<AddCircleIcon style={{fontSize: 'large'}}/>}>
                <div style={{fontSize: '1.0rem', textAlign: 'right', width: '100%', paddingRight: 10}}>
                    New Entry
                </div>
            </AccordionSummary>
            <AccordionDetails>

                <SPEntryEdit entry={null} toggleOpen={toggleOpen} entriesUpdate={entriesUpdate}/>

            </AccordionDetails>
        </Accordion>
    )
}

export default SPEntryNew