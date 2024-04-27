import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import DataContext from '../app/DataContext.jsx'
import Menu from '@mui/material/Menu'
import useWindowSize from '../util/useWindowSize.jsx'
import AuthContext from '../app/AuthContext.jsx'
import LoadingContext from '../context/LoadingContext.jsx'
import {enqueueSnackbar} from 'notistack'
import Backdrop from '@mui/material/Backdrop'
import EntryCommentAdd from './EntryCommentAdd.jsx'
import DBContextSP from './DBContextSP.jsx'

const EntryFunctions = ({entry, startEdit, entriesUpdate}) => {

    const {updateEntry} = useContext(DBContextSP)
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
        await updateEntry(entry)
        enqueueSnackbar(`Entry ${entry.status}.`)
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, refreshData, updateEntry, user?.uid])

    const deleteEntry = useCallback(async () => {
        entry.status = 'deleted'
        console.log('status', entry.status)
        entry.reviewerId = user?.uid
        await updateEntry(entry)
        enqueueSnackbar('Entry deleted.')
        refreshData()
        entriesUpdate(Math.random())
    }, [entriesUpdate, entry, refreshData, updateEntry, user?.uid])

    const {width} = useWindowSize()
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
                <div style={{fontSize: '1rem', textAlign: 'right', margin: '15px 25px 5px 0px', color: '#ccc'}}>
                    Last reviewed by {entry.reviewerName}
                </div>
            }
            <div style={{display: 'flex'}}>
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
                <div style={{
                    width: '100%',
                    textAlign: 'right',
                    padding: '0px 12px 8px 0px'
                }}>
                    <Button disabled style={{color: statusColor, fontWeight: 600}}>{statusString}</Button>
                    {(entry.status !== 'approved' || isMod) &&
                        <Button style={{color: '#ccc'}} onClick={startEdit}>Edit</Button>
                    }
                    {(entry.status === 'approved' && isMod) &&
                        <Button style={{marginRight: 0, color: functionColor}} onClick={toggleApprove}>Pend</Button>
                    }
                    {((entry.status === 'pending') && isMod) &&
                        <Button style={{marginRight: 10, color: '#e15c07'}} onClick={handleOpenComment}>Reject</Button>
                    }
                    {(entry.status !== 'approved' && isMod) &&
                        <Button style={{marginRight: 10, color: functionColor}} onClick={toggleApprove}>Approve</Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EntryFunctions