import React, {useCallback, useContext, useState} from 'react'
import Button from '@mui/material/Button'
import FilterContext from '../context/FilterContext.jsx'
import entryName from '../util/entryName'
import LoadingContextLB from '../lockbazaarContext/LoadingContextLB.jsx'
import IconButton from '@mui/material/IconButton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Popover from '@mui/material/Popover'
import SignInButton from '../auth/SignInButton.jsx'

function EntryYMALDisplay({otherIds}) {

    const {clearFilters, setFilters} = useContext(FilterContext)
    const {getLockLineFromId} = useContext(LoadingContextLB)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClose = useCallback(() => setAnchorEl(null), [])

    const handleOpen = useCallback((event) => {
        setAnchorEl(event.currentTarget)

    }, [])


    const handleClick = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        clearFilters()
        setFilters({'id': event.target.value})
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
                <span style={{marginTop: 9}}>You might also like:</span>
                {otherIds.map((id, index) =>
                    <Button variant='text' size='large'
                            key={index}
                            style={{
                                textTransform: 'none',
                                lineHeight: '.9rem',
                                minWidth: 40,
                                textAlign: 'left',
                                marginTop:3
                            }}
                            color='primary'
                            value={id}
                            onClick={handleClick}
                    >
                        {entryName(getLockLineFromId(id), 'short')}
                    </Button>
                )}
                <IconButton onClick={handleOpen} style={{color:'#aaa'}}>
                    <HelpOutlineIcon fontSize='small' />
                </IconButton>
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