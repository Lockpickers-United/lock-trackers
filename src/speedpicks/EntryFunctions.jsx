import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import DataContext from '../context/DataContext'
import Menu from '@mui/material/Menu'

const EntryFunctions = ({entry, startEdit, entriesUpdate}) => {

    const {DCUpdate, isMod = []} = useContext(DataContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const toggleApprove = useCallback(() => {
        entry.status = entry.status === 'approved' ? 'pending' : 'approved'
        console.log(entry.status)
        DCUpdate(Math.random())
        entriesUpdate(Math.random())
    }, [DCUpdate, entriesUpdate, entry])

    const deleteEntry = useCallback(() => {
        entry.status = 'deleted'
        console.log(entry.status)
        DCUpdate(Math.random())
        entriesUpdate(Math.random())
    }, [DCUpdate, entriesUpdate, entry])

    const status = entry.status === 'approved' ? 'APPROVED' : 'PENDING'
    const statusColor = entry.status === 'approved' ? '#fff' : '#ca6060'
    const functionColor = entry.status === 'approved' ? '#ca6060' : '#0a0'
    const statusString = `ENTRY IS ${status}:`

    return (

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
                <Button style={{color: '#ccc'}} onClick={startEdit}>Edit</Button>
                {(entry.status === 'approved' && isMod) &&
                    <Button style={{marginRight: 10, color: functionColor}} onClick={toggleApprove}>Pend</Button>
                }
                {(entry.status !== 'approved' && isMod) &&
                    <Button style={{marginRight: 10, color: functionColor}} onClick={toggleApprove}>Approve</Button>
                }
            </div>
        </div>
    )
}

export default EntryFunctions