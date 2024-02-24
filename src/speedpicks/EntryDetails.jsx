import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FieldValue from '../entries/FieldValue.jsx'
import EntryFunctions from './EntryFunctions.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DataContext from './DataContext.jsx'

const EntryDetails = ({entry, startEdit, entriesUpdate}) => {

    const {isMod = []} = useContext(DataContext)
    const {user, isLoggedIn} = useContext(AuthContext)
    const isUser = (isLoggedIn && entry.picker === user.uid)

    const videoLinkText = entry.videoUrl.length > 50
        ? entry.videoUrl.substring(0, 50) + '...'
        : entry.videoUrl

    return (

        <React.Fragment>
            <div style={{textOverflow: 'ellipsis', marginLeft: 28, marginBottom: 10, fontSize: '1rem'}}>
                <a href={entry.videoUrl} target='_blank' rel='noreferrer'>{videoLinkText}</a>
            </div>
            <div style={{display: 'flex', marginBottom: '14px', fontSize: '1rem', lineHeight: '1.3rem'}}>
                <FieldValue name='Belt' value={entry.beltIndex} style={{marginLeft: 44}}/>
                <FieldValue name='Picking starts' value={dayjs(entry.start).format('mm:ss')} style={{marginLeft: 44}}/>
                <FieldValue name='Lock open' value={dayjs(entry.open).format('mm:ss')} style={{marginLeft: 44}}/>
                <FieldValue name='Total time' value={entry.totalTimeString} style={{marginLeft: 44}}/>
                <FieldValue name='Best time' value={`(${entry.bestTime})`} style={{marginLeft: 44}}/>
            </div>
            { (isUser || isMod) &&
            <EntryFunctions entry={entry} startEdit={startEdit} entriesUpdate={entriesUpdate}/>
            }
        </React.Fragment>
    )
}

export default EntryDetails