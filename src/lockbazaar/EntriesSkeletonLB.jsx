import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import Skeleton from '@mui/material/Skeleton'

function EntriesSkeleton() {

    let skeletons = []
    for (let i = 0; i < 25; i++) {
        skeletons.push(i)
    }

    const style = {maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', placeItems: 'center'}

    return (
        <div>
            {skeletons.map((i) =>
                <Accordion style={style} disableGutters key={i}>
                    <AccordionSummary style={{fontSize: '1.1rem'}}>
                        <Skeleton variant='rounded' animation='wave' height={30}
                                  style={{margin: '10px 30px 10px 0px', width: '55%', opacity: 0.3}}/>
                        <Skeleton variant='rounded' animation='wave' height={30}
                                  style={{margin: '10px 40px 10px 0px', width: '25%', opacity: 0.4}}/>
                        <Skeleton variant='rounded' animation='wave' height={30}
                                  style={{margin: '10px 40px 10px 0px', width: '20%', opacity: 0.4}}/>
                    </AccordionSummary>
                </Accordion>
            )}
        </div>
    )
}

export default EntriesSkeleton
