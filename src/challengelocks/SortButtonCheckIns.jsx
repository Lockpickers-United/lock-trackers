import React, {useCallback, useContext} from 'react'
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

    const handleSort = useCallback(value => () => {
        if (value === 'pickDate') {
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
                <MenuItem selected={sort === 'pickDate' || !sort} value={'pickDate'}
                          onClick={handleSort('pickDate')} style={{padding: '10px 16px'}}>
                    Pick Date
                </MenuItem>
                <MenuItem selected={sort === 'name'} value={'name'}
                          onClick={handleSort('name')} style={{padding: '10px 16px'}}>
                    Lock Name
                </MenuItem>
                <MenuItem selected={sort === 'maker'} value={'maker'}
                          onClick={handleSort('maker')} style={{padding: '10px 16px'}}>
                    Lock Maker
                </MenuItem>
                {Object.keys(ratingDimensions).map((dimension, index) => {
                    const aveDimension = `rating${dimension.charAt(0).toUpperCase() + dimension.slice(1)}`
                    return (<MenuItem key={index} selected={sort === aveDimension} value={aveDimension}
                              onClick={handleSort(aveDimension)} style={{padding: '10px 16px'}}>
                        {ratingDimensions[dimension]} Rating
                    </MenuItem>
                    )}
                )}
            </Menu>
        </React.Fragment>
    )
}

export default SortButtonCL
