import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import DataContext from '../context/DataContext.jsx'
import Menu from '@mui/material/Menu'
import useWindowSize from '../util/useWindowSize.jsx'
import AuthContext from '../app/AuthContext.jsx'
import LoadingContext from '../context/LoadingContext.jsx'
import {enqueueSnackbar} from 'notistack'
import Backdrop from '@mui/material/Backdrop'
import EntryCommentAdd from './EntryCommentAdd.jsx'
import DBContextSP from './DBContextSP.jsx'
import dayjs from 'dayjs'
import DBContext from '../app/DBContext.jsx'
import relativeTime from 'dayjs/plugin/relativeTime'


const EntryFunctions = ({entry, startEdit, entriesUpdate}) => {
    dayjs.extend(relativeTime)

    const {updateEntry} = useContext(DBContextSP)
    const {profile} = useContext(DBContext)

    const {user} = useContext(AuthContext)
    const {refreshData} = useContext(LoadingContext)

    const {isMod = []} = useContext(DataContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const toggleApprove = useCallback(async () => {
        console.log('status', entry.status)
        entry.status = entry.status === 'approved' ? 'pending' : 'approved'
        entry.reviewerId = user?.uid ? user?.uid : 'unknown'
        if (entry.status === 'approved') entry.checkOut = {}
        await updateEntry(entry)
        enqueueSnackbar(`Entry ${entry.status}.`)
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, refreshData, updateEntry, user?.uid])

    const checkOut = useCallback(async () => {
        const checkoutAt = dayjs().format()
        const reviewerId = user?.uid ? user?.uid : 'unknown'
        const reviewerName = profile?.username ? profile?.username : 'unknown'
        entry.checkOut = {reviewerId, reviewerName, checkoutAt}
        entry.reviewerId = user?.uid ? user?.uid : 'unknown'
        await updateEntry(entry)
        enqueueSnackbar(`Entry checked out by ${reviewerName}.`)
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, profile, refreshData, updateEntry, user?.uid])

    const cancelCheckOut = useCallback(async () => {
        entry.checkOut = {}
        await updateEntry(entry)
        enqueueSnackbar('Entry check-out cancelled.')
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, refreshData, updateEntry])

    const deleteEntry = useCallback(async () => {
        entry.status = 'deleted'
        console.log('status', entry.status)
        entry.reviewerId = user?.uid
        await updateEntry(entry)
        enqueueSnackbar('Entry deleted.')
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, refreshData, updateEntry, user?.uid])

    const {flexStyle, width} = useWindowSize()
    const mobileLarge428 = width <= 428
    const mobileSmall360 = width <= 360

    const status = entry.status === 'approved'
        ? 'APPROVED'
        : entry.status === 'rejected'
            ? 'REJECTED'
            : 'PENDING'

    const statusColor = entry.status === 'approved'
        ? '#fff'
        : entry.status === 'rejected'
            ? '#E15C07FF'
            : '#ca6060'

    const functionColor = entry.status === 'approved' ? '#ca6060' : '#0a0'
    const statusString = mobileSmall360 ? `${status}`
        : mobileLarge428 ? `IS ${status}`
            : `ENTRY IS ${status}`

    const [commentOpen, setCommentOpen] = useState(false)
    const handleOpenComment = useCallback(() => setCommentOpen(true), [])
    const handleCloseComment = useCallback(() => setCommentOpen(false), [])
    const targetStatus = 'rejected'

    const addCommentAction = useCallback(async (commentText, status) => {
        entry.status = status
        if (entry.comments) {
            entry.comments?.push(commentText)
        } else {
            entry.comments = [commentText]
        }
        await updateEntry(entry)
        enqueueSnackbar('Entry updated')
        refreshData()
    }, [entry, refreshData, updateEntry])

    const isCheckedOut = entry.checkOut?.checkoutAt && dayjs().diff(dayjs(entry.checkOut?.checkoutAt), 'day') < 1

    return (

        <div>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={commentOpen} onClick={null}>
                <EntryCommentAdd handleCloseComment={handleCloseComment}
                                 addCommentAction={addCommentAction}
                                 targetStatus={targetStatus}
                                 commenter={'Mod'}
                />
            </Backdrop>

            {isMod &&
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'center',
                    alignItems: 'center',
                    fontSize: '1rem',
                    fontWeight: 500,
                    marginTop: 20
                }}>
                    {isCheckedOut &&
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            Checked out
                            by {entry.checkOut?.reviewerName ? entry.checkOut?.reviewerName : 'unknown'} {' '}
                            {entry.checkOut?.checkoutAt ? dayjs(entry.checkOut?.checkoutAt).fromNow() : 'unknown'}
                            <Button style={{marginTop: 15, backgroundColor: '#6a86d9', padding: '2px 10px'}}
                                    onClick={cancelCheckOut}
                                    variant='contained' size='small'>
                                Cancel
                            </Button>
                        </div>
                    }
                    {!isCheckedOut && entry.reviewerName && entry.reviewerName !== 'unknown' &&
                        <div style={{
                            fontSize: '1rem',
                            textAlign: 'right',
                            margin: '0px 0px 5px 0px',
                            color: '#ccc'
                        }}>
                            Last reviewed by {entry.reviewerName}
                        </div>
                    }
                </div>
            }
            <div style={{display: flexStyle, alignItems: 'center', margin: '20px 0'}}>
                <div style={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>
                    <div style={{marginLeft: 30}}>
                        <Button style={{marginRight: 10, color: '#d00'}} onClick={handleOpen} edge='start'>
                            Delete
                        </Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <div style={{padding: 20, textAlign: 'center'}}>
                                You cannot undo delete.<br/>
                                Are you sure?
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <Button style={{marginBottom: 10, color: '#000'}}
                                        variant='contained'
                                        onClick={deleteEntry}
                                        edge='start'
                                        color='error'
                                >
                                    Delete
                                </Button>
                            </div>
                        </Menu>
                    </div>
                    <div style={{flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button disabled style={{
                            color: statusColor,
                            fontWeight: 600,
                            whiteSpace: 'nowrap'
                        }}>{statusString}</Button>
                    </div>
                </div>
                <div style={{
                    flexGrow: 1, alignItems: 'center', display: 'flex', justifyContent: 'flex-end'
                }}>
                    {isMod &&
                        <Button style={{marginRight: 0, color: '#6a86d9'}} onClick={checkOut}>
                            Check-Out
                        </Button>
                    }
                    {(entry.status !== 'approved' || isMod) &&
                        <Button style={{color: '#ccc'}} onClick={startEdit}>Edit</Button>
                    }
                    {(entry.status === 'approved' && isMod) &&
                        <Button style={{marginRight: 0, color: functionColor}} onClick={toggleApprove}>Pend</Button>
                    }
                    {((entry.status === 'pending') && isMod) &&
                        <Button style={{marginRight: 0, color: '#e15c07'}} onClick={handleOpenComment}>Reject</Button>
                    }
                    {(entry.status !== 'approved' && isMod) &&
                        <Button style={{marginRight: 20, color: functionColor}} onClick={toggleApprove}>Approve</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EntryFunctions