import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Backdrop from '@mui/material/Backdrop'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import {useSearchParams} from 'react-router-dom'
import {useDebounceValue} from 'usehooks-ts'
import FilterContext from '../context/FilterContext'
import useWindowSize from '../util/useWindowSize'
import {useHotkeys} from 'react-hotkeys-hook'

function SearchBox({label, extraFilters = []}) {
    const [searchParams] = useSearchParams()
    const {filters, addFilters, removeFilter} = useContext(FilterContext)
    const [text, setText] = useState(filters.search || '')
    const {isMobile} = useWindowSize()
    const inputEl = useRef()
    useHotkeys('s', () => inputEl?.current?.focus(), {preventDefault: true})

    const handleClear = useCallback(() => {
        window.scrollTo({top: 0})
        setText('')
        removeFilter('search', '')
        inputEl.current.focus()
    }, [removeFilter])

    const handleChange = useCallback(event => {
        const {value} = event.target
        setText(value)
    }, [])

    const [debounceText, setValue] = useDebounceValue(text, 250) //eslint-disable-line

    useEffect(() => {
        if (debounceText !== searchParams.get('search')) {
            if (debounceText) {
                window.scrollTo({top: 0})
                addFilters([
                    {key: 'search', value: debounceText},
                    {key: 'id', value: undefined},
                    {key: 'name', value: undefined},
                    ...extraFilters
                ], true)
            } else {
                addFilters([
                    {key: 'search', value: debounceText}
                ], true)
            }
        }
    }, [debounceText]) // eslint-disable-line

    const [open, setOpen] = useState(false)
    const handleBlur = useCallback(() => setTimeout(() => setOpen(false), 0), [])

    useEffect(() => {
        const newValue = searchParams.get('search')
        if (newValue !== text) {
            setText(newValue || '')
        }
    }, [searchParams]) // eslint-disable-line

    const endAdornment = text ? (
        <InputAdornment position='end'>
            <Tooltip title='Clear' arrow disableFocusListener>
                <IconButton color='inherit' onClick={handleClear} edge='end' size='small'>
                    <ClearIcon/>
                </IconButton>
            </Tooltip>
        </InputAdornment>
    ) : null

    const style = isMobile
        ? {maxWidth: 300}
        : {maxWidth: 350}

    const focusStyle = open && isMobile ? {
        width: 'auto',
        position: 'fixed',
        left: 60,
        right: 0,
        paddingRight: 16,
        maxWidth: 'unset',
        zIndex: 9999999,
        backgroundColor: '#272727'
    } : {}

    return (
        <div style={{marginBottom:0}}>
            <TextField
                placeholder={`Search ${label}`}
                variant='standard'
                color='secondary'
                onChange={handleChange}
                onBlur={handleBlur}
                value={text}
                style={{...style, ...focusStyle}}
                fullWidth
                slotProps={{
                    input: {
                        inputProps: {
                            ref: inputEl
                        },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        endAdornment
                    }
                }}
            />
            <Backdrop
                invisible
                open={open && isMobile}
                onClick={handleBlur}
            />
        </div>
    )
}

export default SearchBox
