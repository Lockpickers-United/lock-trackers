import React, {useCallback, useContext, useState} from 'react'
import FilterContext from '../context/FilterContext'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort'
import Badge from '@mui/material/Badge'
import ratingDimensions from '../data/clRatingDimensions.json'

function SortButtonCL() {
    const {
        filters,
        addFilter,
        removeFilter
    } = useContext(FilterContext)
    const {sort} = filters

    const [checkInSort, setCheckInSort] = useState('')
    const checkInSortText = sort === 'checkInAsc'
        ? 'Check In Date ⬆'
        : 'Check In Date ⬇'
    const handleCheckInSort = useCallback(value => () => {
        const newSort = value === 'checkInDesc' ? 'checkInAsc' : 'checkInDesc'
        setCheckInSort(newSort)
        setTimeout(() => addFilter('sort', newSort, true), 0)
        setAnchorEl(null)
    }, [addFilter])

    const [createdSort, setCreatedSort] = useState('')
    const createdSortText = sort === 'createdAsc'
        ? 'Created ⬆'
        : sort === 'createdDesc'
            ? 'Created ⬇'
            : 'Created ⬇'
    const handleCreatedSort = useCallback(value => () => {
        const newSort = value === 'createdDesc' ? 'createdAsc' : 'createdDesc'
        setCreatedSort(newSort)
        setTimeout(() => addFilter('sort', newSort, true), 0)
        setAnchorEl(null)
    }, [addFilter])

    const handleSort = useCallback(value => () => {
        if (value === 'name') {
            setTimeout(() => removeFilter('sort'), 0)
        } else {
            setTimeout(() => addFilter('sort', value, true), 0)
        }
        setAnchorEl(null)
    }, [addFilter, removeFilter])

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
            {!sort &&
                <Button variant='contained' size='small'
                        onClick={handleClick} endIcon={<SortIcon/>}
                        style={{margin: '8px 10px 3px 10px', height: 32}}>
                    sort
                </Button>
            }
            {!!sort &&
                <Button variant='contained' size='small'
                        onClick={handleClick} style={{margin: '8px 10px 3px 10px', height: 32, minWidth: 32}}>
                    <Badge
                        badgeContent={1}
                        color='error'
                        overlap='circular'
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'right'
                        }}
                        variant='dot'
                    >
                        <SortIcon/>
                    </Badge>
                </Button>
            }
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <MenuItem selected={sort === 'name' || !sort} value={'name'}
                          onClick={handleSort('name')} style={{padding: '10px 16px'}}>
                    Name
                </MenuItem>
                <MenuItem selected={sort === 'createdAsc' || sort === 'createdDesc'} value={'createdAt'}
                          onClick={handleCreatedSort(createdSort)} style={{padding: '10px 16px'}}>
                    {createdSortText}
                </MenuItem>
                <MenuItem selected={sort === 'checkInAsc' || sort === 'checkInDesc'} value={'checkIn'}
                          onClick={handleCheckInSort(checkInSort)} style={{padding: '10px 16px'}}>
                    {checkInSortText}
                </MenuItem>
                <MenuItem selected={sort === 'checkInCount' || !sort} value={'checkInCount'}
                          onClick={handleSort('checkInCount')} style={{padding: '10px 16px'}}>
                    Check-in Count
                </MenuItem>
                {Object.keys(ratingDimensions).map((dimension, index) => {
                    const aveDimension = `ratingAve${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`
                    return (<MenuItem key={index} selected={sort === aveDimension} value={aveDimension}
                              onClick={handleSort(aveDimension)} style={{padding: '10px 16px'}}>
                        {ratingDimensions[dimension]} Rating
                    </MenuItem>
                    )}
                )}
                <MenuItem selected={sort === 'submittedAt' || !sort} value={'submittedAt'}
                          onClick={handleSort('submittedAt')} style={{padding: '10px 16px'}}>
                    Date Submitted
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default SortButtonCL
