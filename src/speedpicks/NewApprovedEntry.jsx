import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import ListItemText from '@mui/material/ListItemText'
import formatTime from '../util/formatTime.jsx'
import BeltStripe from './BeltStripe.jsx'
import {useTheme} from '@mui/material/styles'
import useWindowSize from '../util/useWindowSize.jsx'

const Entry = ({entry, bestTimes}) => {

    const theme = useTheme()

    entry.bestTime = formatTime(bestTimes.get(entry.lockId))
    const isBestTime = entry.totalTime === bestTimes.get(entry.lockId)
    const entryColor = entry.status !== 'approved'
        ? theme.palette.error.light
        : isBestTime ? theme.palette.text.primary : theme.palette.text.disabled
    const entryWeight = entry.status !== 'approved'
        ? 400
        : isBestTime ? 600 : 400

    const style = {maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', borderBottom:'1px solid #444' }

    const divStyle = {
        margin: '0px 15px 0px 15px',
        fontSize: '0.9rem',
        color: entryColor,
        fontWeight: entryWeight,
        display: 'flex',
        placeItems: 'center'
    }

    const {width} = useWindowSize()
    const breakSize = width <= 427
    const nameDivStyle = {
        minWidth: 110,
        textAlign:'right'
    }
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...nameDivStyle,
        ...divFlexStyle
    }

    return (
        <Accordion expanded={true} onChange={null} style={style} disableGutters>
            <AccordionSummary expandIcon={null} style={{fontSize: '1.0rem'}}>
                <BeltStripe value={entry.belt}/>
                <ListItemText
                    primary={entry.lock}
                    primaryTypographyProps={{fontWeight: 600, color: entryColor, fontSize:'0.9rem'}}
                    secondary={entry.version}
                    secondaryTypographyProps={{color: entryColor}}
                    style={{padding: '0px 0px 0px 10px'}}
                />
                <div style={combinedDivStyle}>
                    <div style={divStyle}>{entry.totalTimeString}</div>
                </div>
            </AccordionSummary>
        </Accordion>
    )
}

export default Entry
