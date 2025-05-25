import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import {CardMedia} from '@mui/material'
import dayjs from 'dayjs'
import useWindowSize from '../util/useWindowSize.jsx'
import FieldValue from '../util/FieldValue.jsx'
import {useCallback, useContext} from 'react'
import DataContext from '../context/DataContext.jsx'

export default function ChallengeLockCard({entry, cardWidth, imageHeight}) {
    const {setOpenId} = useContext(DataContext)
    const [expanded, setExpanded] = React.useState(false)

    const handleExpandClick = useCallback(() => {
        setExpanded(!expanded)
    }, [expanded])

    const createdAt = dayjs(entry.createdAt).format('MM/DD/YY')

    const {width} = useWindowSize()
    const smallWindow = width <= 560

    const titleStyle = smallWindow
        ? {fontSize: '1.1rem', lineHeight:'1.3rem', fontWeight: 700}
        : {fontSize: '1.1rem', lineHeight:'1.3rem', fontWeight: 700}

    const fieldValueStyle = {margin: '15px 30px 0px 0px', fontSize: '1.0rem', lineHeight: '1.2rem'}
    const headerStyle = {color: '#ddd'}
    return (
        <div style={{ margin: 5 }}>
            <Card sx={{ width: '100%', maxWidth:cardWidth, backgroundColor: '#777', '.MuiCardContent-root': {
                    padding: '15px 10px 0px 10px'
                }}}>
                <CardMedia
                    component='img'
                    height={imageHeight}
                    image={entry.mainImage.thumbnailUrl}
                    alt={entry.title}
                    onClick={() => setOpenId(entry.id)}
                />

                <CardContent sx={{
                    '.MuiCardContent-root': {
                        padding: 0
                    }
                }}>
                    <div style={titleStyle}>
                        {entry.title}
                    </div>
                    <div style={{fontSize: '0.95rem', fontWeight: 600, marginTop: 8}}>
                        {entry.maker}
                    </div>
                    <div style={{fontSize: '0.8rem', fontWeight: 400, marginTop: 12}}>
                        Last seen {createdAt}
                    </div>
                    <div style={{fontSize: '0.8rem', fontWeight: 400, marginTop: 12}}>
                        LooseShirt
                    </div>
                </CardContent>
                <CardActions disableSpacing sx={{justifyContent: 'center'}}>
                    <Button
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='show more'
                    >
                        <ExpandMoreIcon sx={{transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'}}/>
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent style={{fontSize: '0.95rem', textAlign: 'left', padding: 15}}>
                        {!!entry.description &&
                        <div style={{fontSize: '1.0rem', lineHeight: '1.3rem', fontWeight: 400, marginBottom: 10}}>
                            {entry.description}
                        </div>
                        }

                        <FieldValue name='Mechanism' value={entry.lockingMechanism}
                                    style={fieldValueStyle} headerStyle={headerStyle}/>
                        <FieldValue name='Original Lock' value={entry.originalLock}
                                    style={fieldValueStyle} headerStyle={headerStyle}/>

                        <FieldValue name='Latest Picker' value='LooseShirt'
                                    style={fieldValueStyle} headerStyle={headerStyle}/>
                        <FieldValue name='Last Seen' value='5/20/25'
                                    style={fieldValueStyle} headerStyle={headerStyle}/>


                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}