import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import DBContextCL from './DBContextCL.jsx'

export default function AdminActionsBar({entry}) {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const {refreshEntries, deleteEntry} = useContext(DBContextCL)

    const handleDelete = useCallback(async () => {
        await deleteEntry(entry.id)
        await refreshEntries()
    }, [deleteEntry, entry.id, refreshEntries])

    return (

        <div style={{display: 'flex', border: '1px solid #d98508', padding: 5, alignItems: 'center'}}>
            <div style={{fontSize: '1.1rem', fontWeight: 600, flexGrow: 1, marginLeft:10, color: '#fda21b'}}>
                ADMIN
            </div>
            <div style={{marginLeft: 30}}>
                <Button style={{marginRight: 10, color: '#f00'}} onClick={handleOpen} edge='start'>
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
                                onClick={handleDelete}
                                edge='start'
                                color='error'
                        >
                            Delete
                        </Button>
                    </div>
                </Menu>
            </div>

        </div>
    )
}