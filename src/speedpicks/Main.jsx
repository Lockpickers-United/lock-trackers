import React, {useContext} from 'react'
import Entries from './Entries.jsx'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccordionDetails from '@mui/material/AccordionDetails'
import JsonDisplay from './JsonDisplay.jsx'
import DataContext from '../context/DataContext'

function Main() {

    const {allEntries = []} = useContext(DataContext)

    return (
            <Entries/>
    )
}

export default Main