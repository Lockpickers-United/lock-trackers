import React, {useCallback, useContext, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import ChallengeLockCard from './ChallengeLockCard.jsx'
import {Dialog} from '@mui/material'
import DataContext from '../context/DataContext.jsx'
import ChallengeLockCardsDetails from './ChallengeLockCardsDetails.jsx'
import IconButton from '@mui/material/IconButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

function ChallengeLocksCardsMain() {

    const {allEntries, getEntryFromId, openId, setOpenId} = useContext(DataContext)

    const [dialogOpen, setDialogOpen] = useState(false)
    const toggleDialog = useCallback(() => {
        setDialogOpen(!dialogOpen)
        if (openId) {
            setOpenId(null)
        }
    }, [dialogOpen, openId, setOpenId])

    const openEntry = getEntryFromId(openId)


    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const cardWidth = smallWindow ? 165 : 210
    const imageHeight = smallWindow ? 120 : 175

    return (
        <React.Fragment>
        <div style={{
            minWidth: 330, maxWidth: 1800, height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>
            <div style={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: `repeat(auto-fill, minmax(${cardWidth}px, 1fr))`,
                gap: 10,
                marginTop: 20
            }}>
                {allEntries.map((entry, index) => (
                    <ChallengeLockCard key={index} entry={entry} cardWidth={cardWidth} imageHeight={imageHeight}/>
                ))}
            </div>
            <Dialog open={!!openEntry} onClose={toggleDialog} >
                <div style={{textAlign: 'right', padding: '5px 5px 0px 0px'}}>
                    <IconButton onClick={toggleDialog} style={{padding: 0, margin: 0}}>
                        <HighlightOffIcon sx={{cursor: 'pointer'}}/>
                    </IconButton>
                </div>
                <div style={{padding: '0px 20px 20px 20px'}}>

                    <ChallengeLockCardsDetails entry={openEntry}/>

                </div>
            </Dialog>
        </div>
        </React.Fragment>
    )
}

export default ChallengeLocksCardsMain
