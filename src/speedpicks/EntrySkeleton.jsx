import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import useWindowSize from '../util/useWindowSize.jsx'
import {Skeleton} from '@mui/material'

const EntrySkeleton = () => {

    const style = {maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', placeItems: 'center'}

    const divStyle = {
        margin: '10px 15px 10px 15px',
        fontSize: '1.1rem',
        display: 'flex',
        placeItems: 'center'
    }

    const {width} = useWindowSize()
    const breakSize = width <= 427
    const divFlexStyle = !breakSize ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    return (
        <Accordion style={style} disableGutters>
            <AccordionSummary style={{fontSize: '1.1rem'}}>
                <Skeleton variant='rounded' animation='wave' height={30}
                          style={{margin: '10px 40px 10px 0px', width: '65%', opacity: 0.3}}/>
                <div style={combinedDivStyle}>
                    <Skeleton variant='rounded' animation='wave' width={100} height={15}
                              style={{marginRight: 30, opacity: 0.4}}/>
                    <Skeleton variant='rounded' animation='wave' width={50} height={15} style={{opacity: 0.4}}/>
                </div>
            </AccordionSummary>
        </Accordion>
    )
}

export default EntrySkeleton
