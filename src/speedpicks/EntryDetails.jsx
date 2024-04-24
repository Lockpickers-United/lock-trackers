import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FieldValue from '../util/FieldValue.jsx'
import EntryFunctions from './EntryFunctions.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DataContext from '../app/DataContext.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import EntryComments from './EntryComments.jsx'

const EntryDetails = ({entry, startEdit, entriesUpdate}) => {

    const {isMod = []} = useContext(DataContext)
    const {user, isLoggedIn} = useContext(AuthContext)
    const isUser = (isLoggedIn && entry.pickerId === user.uid)

    const lockLink = 'https://share.lpubelts.com/?id=' + entry.lockId

    const videoLink = httpRegex.test(entry.videoUrl)
        ? entry.videoUrl
        : null

    const videoLinkText = entry.videoUrl.length > 50
        ? entry.videoUrl?.substring(0, 65) + '...'
        : entry.videoUrl

    const bestTime = entry.bestTime === 'aN:aN' ? 'pending' : entry.bestTime

    const {width} = useWindowSize()
    const mobileLarge428 = width <= 428
    const divStyle = {
        fontSize: '1rem', lineHeight: '1.3rem', margin: '20px 0px 10px 0px'
    }
    const divFlexStyle = !mobileLarge428 ? {display: 'flex'} : {}
    const combinedDivStyle = {
        ...divStyle,
        ...divFlexStyle
    }

    const fieldValueStyle = {marginLeft: 28, marginRight: 0, fontSize: '1rem', lineHeight: '1.9rem'}

    return (
        <React.Fragment>

            {entry.comments &&
                <div>
                    <EntryComments entry={entry}/>
                </div>
            }
            <div style={{
                textOverflow: 'ellipsis',
                margin: '15px 0px 6px 28px',
                fontSize: '1rem',
                lineHeight: '1.3rem'
            }}>
                lock: <a href={lockLink} target='_blank' rel='noopener, noreferrer'>{lockLink}</a><br/>
            </div>
            <div style={{
                textOverflow: 'ellipsis',
                margin: '0px 0px 10px 28px',
                fontSize: '1rem',
                lineHeight: '1.3rem'
            }}>
                { videoLink &&
                    <span>video: <a href={entry.videoUrl} target='_blank' rel='noopener, noreferrer'>{videoLinkText}</a></span>
                }
                { !videoLink &&
                    <span>video: {videoLinkText}</span>
                }
            </div>
            <div style={combinedDivStyle}>
                <div style={{}}>
                    <FieldValue name='Date' value={dayjs(entry.date).format('MM/DD/YY')}
                                style={fieldValueStyle}/>
                </div>
                <div style={{display: 'flex'}}>
                    <FieldValue name='Picking starts' value={dayjs(entry.startTime).format('mm:ss')}
                                style={fieldValueStyle}/>
                    <FieldValue name='Lock open' value={dayjs(entry.openTime).format('mm:ss')}
                                style={fieldValueStyle}/>
                    <FieldValue name='Total time' value={entry.totalTimeString}
                                style={fieldValueStyle}/>
                    <FieldValue name='Best time' value={`(${bestTime})`}
                                style={fieldValueStyle}/>
                </div>
            </div>
            {(isUser || isMod) &&
                <EntryFunctions entry={entry} startEdit={startEdit} entriesUpdate={entriesUpdate}/>
            }
        </React.Fragment>
    )
}

const httpRegex = /^https*:\/\//

export default EntryDetails