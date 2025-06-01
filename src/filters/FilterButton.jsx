import React, {useCallback, useContext, useState} from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Badge from '@mui/material/Badge'
import AuthContext from '../app/AuthContext'
import FilterContext from '../context/FilterContext'
import FilterByField from './FilterByField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AppContext from '../app/AppContext'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import useWindowSize from '../util/useWindowSize.jsx'

function FilterButton({onFiltersChanged, extraFilters = [], speedpicks = false}) {
    const {isLoggedIn} = useContext(AuthContext)
    const {beta} = useContext(AppContext)
    const {
        filters,
        filterCount,
        addFilter,
        addFilters,
        removeFilter,
        filterFields,
        clearFilters
    } = useContext(FilterContext)
    const {rank} = filters
    const [showAll, setShowAll] = useState(rank === 'Show All')

    const handleAddFilter = useCallback((keyToAdd, valueToAdd) => {
        addFilters([
            {key: keyToAdd, value: valueToAdd},
            {key: 'id', value: undefined},
            {key: 'name', value: undefined},
            ...extraFilters
        ], true)
        onFiltersChanged && onFiltersChanged()
        handleClose()
    }, [addFilters, extraFilters, onFiltersChanged])

    const handleShowAll = useCallback(() => {
        if (!showAll) {
            addFilter('rank', 'Show All', true)
            setShowAll(true)
        } else {
            removeFilter('rank', 'Show All')
            setShowAll(false)
        }
        onFiltersChanged && onFiltersChanged()
    }, [showAll, onFiltersChanged, addFilter, removeFilter])

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }


    const handleClearFilters = useCallback(() => {
        clearFilters()
        handleClose()
    }, [clearFilters])

    const {isMobile} = useWindowSize()
    const forceText = false // force clear button to show text instead of icon

    return (
        <React.Fragment>
            {filterCount === 0
                ? <Button variant='contained' size='small'
                          onClick={handleClick} endIcon={<FilterAltIcon/>}
                          style={{margin: '8px 0px 3px 0px', height: 32}}>
                    FILTERS
                </Button>
                : <Tooltip title='Filters' arrow disableFocusListener>
                    <Button variant='contained' size='small'
                            onClick={handleClick} style={{margin: '8px 0px 3px 0px', height: 32, minWidth: 32}}>
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
                    </Button>
                </Tooltip>
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {speedpicks &&
                    <MenuItem>
                        <div style={{width: '100%', justifyItems: 'center'}}>
                            <ToggleButtonGroup style={{height: 38, margin: '12px 0px'}}>
                                <ToggleButton
                                    selected={!showAll}
                                    disabled={!showAll}
                                    value={'Fastest'}
                                    variant='outlined'
                                    style={{padding: 7}}
                                    onClick={handleShowAll}
                                >Fastest</ToggleButton>
                                <ToggleButton
                                    selected={showAll}
                                    disabled={showAll}
                                    value={'Show All'}
                                    variant='outlined'
                                    style={{padding: 7}}
                                    onClick={handleShowAll}
                                >Show All</ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </MenuItem>
                }
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
                    {(isMobile && !forceText)
                        ? <Button variant='outlined' color='inherit' onClick={handleClearFilters}
                                  style={{minWidth: 75, marginRight: 10}}>
                            Clear
                        </Button>
                        : <Button variant='outlined' color='inherit' onClick={handleClearFilters}
                                  style={{minWidth: 120, marginRight: 10}}>
                            Clear&nbsp;Filters
                        </Button>
                    }

                    <Button variant='outlined' color='inherit' onClick={handleClose}>
                        Done
                    </Button>
                </MenuItem>

            </Menu>
        </React.Fragment>
    )
}

export default FilterButton
