import React from 'react'
import dayjs from 'dayjs'
import Link from '@mui/material/Link'
import useWindowSize from '../util/useWindowSize.jsx'
import RatingTable from './RatingTable.jsx'
import validator from 'validator'

export default function ChallengeLockCheckInDisplay({checkIn, latest = false}) {

    const urlError = checkIn.videoUrl?.length > 0 && !validator.isURL(checkIn.videoUrl)
    const urlDisplay = checkIn.videoUrl && !urlError
    ? <Link onClick={() => openInNewTab(checkIn.videoUrl)} style={{color: '#cfcff1'}}>{checkIn.videoUrl}</Link>
        : '(invalid video URL)'

    const ratings = checkIn
        ? Object.keys(checkIn)
            .filter(key => (key.startsWith('rating') && !key.startsWith('rating-')))
            .reduce((acc, key) => {
                acc[key.replace('rating', '')] = parseInt(checkIn[key])
                return acc
            }, {})
        : {}

    const {flexStyle} = useWindowSize()
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const style = latest
        ? {padding: '0px 15px 15px 15px', margin: '0px 20px', borderBottom: '0px'}
        : {padding: '5px 15px 15px 15px', margin: '0px 20px'}

    return (
        <React.Fragment>
            <div>
                <div style={{display: flexStyle, borderBottom: '1px solid #aaa', ...style}}>
                    <div style={{
                        fontSize: '0.95rem',
                        lineHeight: '1.5rem',
                        fontWeight: 400,
                        marginRight: 15,
                        width: 300
                    }}>
                        <div style={{
                            fontSize: '0.96rem',
                            lineHeight: '1.3rem',
                            fontWeight: 600,
                            width: 300,
                            margin: '15px 0px 5px 0px'
                        }}>
                            {dayjs(checkIn.pickdate).format('MMM DD, YYYY')} <span
                            style={{fontWeight: 400, color: '#ddd'}}>by</span> {checkIn.username}
                        </div>

                        <ul style={{paddingLeft: 20, margin: 0}}>
                            {checkIn.country && <li>{checkIn.country}</li>}
                            <li>Succesful pick? {checkIn.successfulPick}</li>
                            {checkIn.videoUrl && <li>
                                {urlDisplay}
                            </li>}
                            {checkIn.notes && <li>Notes: {checkIn.notes}</li>}
                        </ul>
                    </div>

                    {Object.keys(ratings).length > 0 &&
                        <RatingTable ratings={ratings}
                                     readonly={true}
                                     size={16}
                                     fontSize={'0.9rem'}
                                     fontWeight={400}
                                     paddingData={0}
                                     backgroundColor={'#333'}
                                     emptyColor={'#555'}
                                     fillColor={'#ddd'}
                        />
                    }
                </div>
            </div>
        </React.Fragment>
    )
}