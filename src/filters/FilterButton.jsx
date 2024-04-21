import React, {useCallback, useContext} from 'react'
import Tooltip from '@mui/material/Tooltip'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import AuthContext from '../app/AuthContext'
import FilterContext from '../context/FilterContext'
import FilterByField from './FilterByField'
import Stack from '@mui/material/Stack'
import ClearFiltersButton from './ClearFiltersButton'
import Button from '@mui/material/Button'
import AppContext from '../app/AppContext'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

function FilterButton({onFiltersChanged, extraFilters = []}) {
    const {isLoggedIn} = useContext(AuthContext)
    const {beta} = useContext(AppContext)
    const {filterCount, addFilters, filterFields} = useContext(FilterContext)
    //const [open, setOpen] = useState(false)

    //const openDrawer = useCallback(() => setOpen(true), [])
    //const closeDrawer = useCallback(() => setOpen(false), [])

    const handleAddFilter = useCallback((keyToAdd, valueToAdd) => {
        addFilters([
            {key: keyToAdd, value: valueToAdd},
            {key: 'id', value: undefined},
            {key: 'name', value: undefined},
            ...extraFilters
        ], true)
        onFiltersChanged && onFiltersChanged()
    }, [addFilters, onFiltersChanged, extraFilters])

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
            {filterCount > 0 &&
                <Tooltip title='Filter' arrow disableFocusListener>
                    <IconButton color='inherit' onClick={handleClick}>
                        <Badge
                            badgeContent={filterCount}
                            color='error'
                            overlap='circular'
                            anchorOrigin={{
                                vertical: 'top', horizontal: 'right'
                            }}
                            variant='dot'
                        >
                            <FilterAltIcon/>
                        </Badge>
                    </IconButton>
                </Tooltip>
            }
            {filterCount === 0 &&
                <Button variant='contained' size='small'
                        onClick={handleClick} endIcon={<FilterAltIcon/>} style={{margin: '8px 0px 3px 0px'}}>
                    filters
                </Button>
            }
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >

                <Stack direction='column' style={{minWidth: 250}}>
                    {filterFields
                        .filter(field => {
                            return (!field.beta || beta) && (!field.userBased || isLoggedIn)
                        })
                        .map((field, index) =>
                            <MenuItem key={index}>
                                <FilterByField
                                    key={index}
                                    {...field}
                                    onFilter={handleAddFilter}
                                />
                            </MenuItem>
                        )}
                </Stack>

                <MenuItem>
                    <ClearFiltersButton forceText style={{marginRight: 8}}/>
                    <Button
                        variant='outlined'
                        color='inherit'
                        onClick={handleClose}
                    >
                        Done
                    </Button>
                </MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default FilterButton
