import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import React, {useCallback, useContext, useState} from 'react'
import Chip from '@mui/material/Chip'
import FilterContext from '../context/FilterContext'

function FilterChip({field, value, label = value, ...props}) {
    const [open, setOpen] = useState(false)
    const {addFilter} = useContext(FilterContext)

    const handleClose = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
    }, [])

    const handleFilter = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        setOpen(false)
        addFilter(field, value)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [addFilter, field, value])

    const handleOpen = useCallback(event => {
        event.preventDefault()
        event.stopPropagation()
        setOpen(event.target)
    }, [])

    return (
        <React.Fragment>
            <Chip
                clickable
                variant='outlined'
                label={label}
                style={{marginRight: 4, marginBottom: 4}}
                onClick={handleOpen}
                {...props}
            />
            <Menu
                open={!!open}
                anchorEl={open}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                onClose={handleClose}
            >
                <MenuItem disabled>Term: {value}</MenuItem>
                <Divider/>
                <MenuItem onClick={handleFilter}>Add Filter</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default FilterChip
