import React, {useCallback, useContext} from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import FilterContext from '../context/FilterContext'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyIcon from '@mui/icons-material/Key'

function FilterButton({onFiltersChanged, extraFilters = []}) {
    const {addFilters, removeFilters} = useContext(FilterContext)

    const handleAddFilter = useCallback((keyToAdd, valueToAdd) => {
        addFilters([
            {key: keyToAdd, value: valueToAdd},
            {key: 'id', value: undefined},
            {key: 'name', value: undefined},
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
            <Tooltip title='Filter' arrow disableFocusListener>
                <IconButton color='inherit' onClick={handleClick}  style={{height: 40, width: 40, marginTop: 4}}>
                    <KeyIcon/>
                </IconButton>
            </Tooltip>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >

                <Stack direction='column' style={{minWidth: 100}}>
                    <MenuItem>
                        <Button style={{width:100}} onClick={() => {
                            handleAddFilter('status', 'rejected')
                        }}>Rejected</Button>
                    </MenuItem>
                    <MenuItem>
                        <Button style={{width:100}} onClick={() => {
                            handleAddFilter('status', 'pending')
                        }}>Pending</Button>
                    </MenuItem>
                    <MenuItem>
                        <Button style={{width:100}} onClick={() => {
                            handleRemoveFilters('status')
                        }}>All</Button>
                    </MenuItem>
                </Stack>
            </Menu>
        </React.Fragment>
    )
}

export default FilterButton
