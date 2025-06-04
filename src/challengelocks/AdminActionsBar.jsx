import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import DBContextCL from './DBContextCL.jsx'
import {useNavigate} from 'react-router-dom'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'

export default function AdminActionsBar({entry}) {

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleOpen = useCallback(event => setAnchorEl(event.currentTarget), [])
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const {refreshEntries, deleteChallengeLock} = useContext(DBContextCL)
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)

    const handleDelete = useCallback(async () => {
        setDeleting(true)
        await deleteChallengeLock({entryId: entry.id, collection: 'challenge-locks', parentId: null})
        await refreshEntries()
        setDeleting(false)
    }, [deleteChallengeLock, entry.id, refreshEntries])

    const handleEdit = useCallback(() => {
        const safeName = entry.name?.replace(/[\s/]/g, '_').replace(/\W/g, '')
        navigate(`/challengelocks/edit?id=${entry.id}&name=${safeName}`)
    }, [entry.id, entry.name, navigate])

    return (

        <div style={{display: 'flex', border: '1px solid #d98508', padding: 5, alignItems: 'center'}}>
            <div style={{fontSize: '1.1rem', fontWeight: 600, flexGrow: 1, marginLeft: 10, color: '#fda21b'}}>
                ADMIN
            </div>
            <div style={{marginLeft: 10}}>
                <Button style={{marginRight: 0, color: '#f00'}} onClick={handleOpen} edge='start'>
                    Delete
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <div style={{padding: 20, textAlign: 'center'}}>
                        You cannot undo delete.<br/>
                        Are you sure?
                    </div>
                    <div style={{display:'flex', justifyContent: 'center'}}>
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
            </div>

            <Button style={{marginRight: 0, color: '#fda21b'}} onClick={() => console.log('entry', entry)} edge='start'>
                LOG
            </Button>

            <div style={{marginRight: 10}}>
                <Button style={{marginRight: 0, color: '#fda21b'}} onClick={handleEdit} edge='start'>
                    Edit
                </Button>
            </div>

        </div>
    )
}