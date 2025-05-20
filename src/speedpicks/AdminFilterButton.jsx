import React, {useCallback, useContext} from 'react'
import Tooltip from '@mui/material/Tooltip'
import FilterContext from '../context/FilterContext.jsx'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyIcon from '@mui/icons-material/Key'

function AdminFilterButton({onFiltersChanged, extraFilters = []}) {

    const {filters, addFilters, removeFilters} = useContext(FilterContext)
    const {status} = filters


    const handleAddFilter = useCallback((keyToAdd, valueToAdd) => {
        addFilters([
            {key: keyToAdd, value: valueToAdd},
            {key: 'id', value: undefined},
            {key: 'name', value: undefined},
            {key: 'rank', value: 'Show All'},
            ...extraFilters
        ], true)
        onFiltersChanged && onFiltersChanged()
        handleClose()
    }, [addFilters, onFiltersChanged, extraFilters])

    const handleRemoveFilters = useCallback(keyToDelete => {
        removeFilters([keyToDelete])
        handleClose()
    }, [removeFilters])


    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <React.Fragment>
            <Tooltip title='Admin' arrow disableFocusListener>
                <Button variant='contained' size='small' color='warning'
                        onClick={handleClick}
                        style={{margin: '8px 0px 3px 10px', padding: 0, height: 32, width: 32, minWidth: 32}}>
                    <KeyIcon/>
                </Button>


            </Tooltip>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >

                <Stack direction='column' style={{minWidth: 100}}>
                    <MenuItem selected={status === 'pending'} style={{width: 100, color:'#f1aa55'}} onClick={() => {
                        handleAddFilter('status', 'pending')
                    }}>
                        Pending
                    </MenuItem>
                    <MenuItem selected={status === 'rejected'} style={{width: 100, color:'#f1aa55'}} onClick={() => {
                        handleAddFilter('status', 'rejected')
                    }}>
                        Rejected
                    </MenuItem>
                    <MenuItem selected={status === 'lock' || !status} style={{width: 100, color:'#f1aa55'}} onClick={() => {
                        handleRemoveFilters('status')
                    }}>
                        All
                    </MenuItem>
                </Stack>
            </Menu>
        </React.Fragment>
    )
}

export default AdminFilterButton
