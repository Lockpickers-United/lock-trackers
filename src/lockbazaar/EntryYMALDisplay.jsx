import React, {useCallback, useContext, useState} from 'react'
import FilterContext from '../context/FilterContext.jsx'
import entryName from '../util/entryName'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import Link from '@mui/material/Link'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton.jsx'

function EntryYMALDisplay({otherIds}) {

    const {clearFilters, setFilters} = useContext(FilterContext)
    const {getLockLineFromId} = useContext(LoadingContextLB)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(null)
    }, [])
    const handleOpen = useCallback((event) => {
        event.preventDefault()
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }, [])
    const handleClick = useCallback((event, id) => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setFilters({'id': id})
    }, [clearFilters, setFilters])

    return (
        <React.Fragment>
            <div style={{
                margin: '8px 0px 0px 30px',
                display: 'flex',
                fontSize: '1rem',
                lineHeight: '1.2rem',
                color: '#aaa'
            }}>
                <span style={{marginTop: 0}}>You might also like:&nbsp;</span>
                {otherIds.map((id, index) =>
                    <span key={index}>
                    <Link
                        style={{
                            fontSize: '.9rem',
                            fontWeight: 600,
                            minWidth: 40,
                            textAlign: 'left',
                            marginTop: 3
                        }}
                        color='primary'
                        value={id}
                        onClick={(event) => handleClick(event, id)}
                    >
                        {entryName(getLockLineFromId(id), 'short')}
                    </Link>
                        {index < otherIds.length - 1 && <span style={{margin: '0 4px'}}>/</span>}
                        </span>
                )}
                &nbsp;
                <Link onClick={handleOpen} style={{color: '#aaa'}}>
                    <HelpOutlineIcon fontSize='small'/>
                </Link>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <div style={{padding: 20}}>
                        Other locks that are grouped<br/>
                        for LPU belt requirements.<br/>
                        <SignInButton onClick={handleClose}/>
                    </div>
                </Popover>

            </div>

        </React.Fragment>
    )
}

export default EntryYMALDisplay