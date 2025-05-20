import React, {useCallback, useContext, useState} from 'react'
import FilterContext from '../context/FilterContext'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SortIcon from '@mui/icons-material/Sort'
import Badge from '@mui/material/Badge'

function SortButtonLB() {
    const {
        filters,
        addFilter,
        removeFilter
    } = useContext(FilterContext)
    const {sort} = filters

    const [beltSort, setBeltSort] = useState('')
    const beltSortText = sort === 'belt'
        ? 'Belt ⬆'
        : sort === 'beltDesc'
            ? 'Belt ⬇'
            : 'Belt'

    const handleBeltSort = useCallback(value => () => {
        const newSort = value === 'belt' ? 'beltDesc' : 'belt'
        setBeltSort(newSort)
        setTimeout(() => addFilter('sort', newSort, true), 0)
        setAnchorEl(null)
    }, [addFilter])


    const handleSort = useCallback(value => () => {
        if (value === 'lock') {
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
                <MenuItem selected={sort === 'lock' || !sort} value={'lock'}
                          onClick={handleSort('lock')} style={{padding: '10px 16px', width: 150}}>
                    Default
                </MenuItem>
                <MenuItem selected={sort === 'belt' || sort === 'beltDesc'} value={'belt'}
                          onClick={handleBeltSort(beltSort)} style={{padding: '10px 16px'}}>
                    {beltSortText}
                </MenuItem>
                <MenuItem selected={sort === 'popularity'} style={{padding: 7}} value={'lock'}
                          onClick={handleSort('popularity')}>
                    Popular
                </MenuItem>
                <MenuItem selected={sort === 'newListings'} style={{padding: 7}} value={'lock'}
                          onClick={handleSort('newListings')}>
                    New&nbsp;Listings
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default SortButtonLB
