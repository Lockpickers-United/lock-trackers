import React, {useCallback, useContext, useState} from 'react'
import dayjs from 'dayjs'
import Link from '@mui/material/Link'
import useWindowSize from '../util/useWindowSize.jsx'
import RatingTable from './RatingTable.jsx'
import validator from 'validator'
import DataContext from '../context/DataContext.jsx'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import DBContextCL from './DBContextCL.jsx'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'

export default function ChallengeLockCheckInDisplay({checkIn, latest = false, refreshCheckIns}) {
    const {adminEnabled} = useContext(DataContext)
    const {deleteCheckIn} = useContext(DBContextCL)

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

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])
    const [deleting, setDeleting] = useState(false)
    const handleDelete = useCallback(async () => {
        setDeleting(true)
        await deleteCheckIn(checkIn)
        await refreshCheckIns()
        setDeleting(false)
        handleClose()
    }, [deleteCheckIn, checkIn, refreshCheckIns, handleClose])


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
                            {dayjs(checkIn.pickDate).format('MMM DD, YYYY')} <span
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

                        {adminEnabled &&
                            <div style={{
                                textAlign: 'left',
                                fontSize: '0.9rem',
                                lineHeight: '1.1rem',
                                fontWeight: 400,
                                marginTop: 20
                            }}>
                                <Link onClick={handleOpen}
                                      style={{color: '#f00', textDecoration: 'none'}}>DELETE</Link>
                                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                    <div style={{padding: 20, textAlign: 'center'}}>
                                        You cannot undo delete.<br/>
                                        Are you sure?
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        {deleting
                                            ? <LoadingDisplayWhite color={'#fda21b'}/>
                                            : <Button style={{marginBottom: 10, color: '#000'}}
                                                      variant='contained'
                                                      onClick={handleDelete}
                                                      edge='start'
                                                      color='error'
                                            >
                                                Delete
                                            </Button>
                                        }
                                    </div>
                                </Menu>

                                &nbsp;•&nbsp;
                                <Link
                                    onClick={() => openInNewTab(checkIn.videoUrl)}
                                    style={{color: '#fda21b', textDecoration: 'none'}}>EDIT</Link>
                                &nbsp;•&nbsp;
                                <Link
                                    onClick={() => console.log('checkIn', checkIn)}
                                    style={{color: '#fda21b', textDecoration: 'none'}}>LOG</Link>
                            </div>
                        }

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