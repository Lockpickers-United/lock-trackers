import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import DBContextCL from './DBProviderCL.jsx'
import {useLocation, useNavigate} from 'react-router-dom'
import LoadingDisplayWhite from '../misc/LoadingDisplayWhite.jsx'
import useWindowSize from '../util/useWindowSize.jsx'
import queryString from 'query-string'

export default function AdminActionsBar({entry}) {

    const location = useLocation()
    const searchParams = queryString.parse(location.search)
    searchParams.id = entry.id

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

    const handleEdit = useCallback((dir = '') => {
        navigate(`/challengelocks/edit${dir}?${queryString.stringify(searchParams)}`)
    }, [navigate, searchParams])

    const {flexStyle} = useWindowSize()
    return (

        <div style={{display: flexStyle, border: '1px solid #fda21b', padding: 5, alignItems: 'center'}}>
            <div style={{
                display: 'flex',
                fontSize: '1.1rem',
                fontWeight: 600,
                flexGrow: 1,
                marginLeft: 10,
                color: '#ffed1f'
            }}>
                <div style={{alignContent: 'center'}}>ADMIN</div>
                <Button style={{marginRight: 0, color: '#666'}} onClick={() => console.log('entry', entry)}
                        edge='start'>
                    LOG
                </Button>
            </div>
            <div style={{display: 'flex', textAlign: 'right'}}>
                <div style={{display: 'flex', flexGrow: 1}}>
                </div>
                <div style={{marginRight: 20}}>
                    <Button style={{marginRight: 0, color: '#ff3434'}} onClick={handleOpen} edge='start'>
                        Delete
                    </Button>
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
                </div>


                <div style={{marginRight: 10}}>
                    <Button style={{marginRight: 0, color: '#ffed1f'}} onClick={() => handleEdit('/images')}
                            edge='start'>
                        Images
                    </Button>
                </div>

                <div style={{marginRight: 10}}>
                    <Button style={{marginRight: 0, color: '#ffed1f'}} onClick={() => handleEdit()} edge='start'>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}