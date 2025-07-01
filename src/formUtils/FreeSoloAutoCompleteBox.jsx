import Backdrop from '@mui/material/Backdrop'
import React, {useCallback, useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import useWindowSize from '../util/useWindowSize.jsx'

export default function FreeSoloAutoCompleteBox({name, changeHandler, options, value = null, maxLength = 32, style, placeholder = ''}) {
    const [open, setOpen] = useState(false)
    const handleBlur = useCallback(() => setOpen(false), [])
    const {isMobile} = useWindowSize()

    return (
        <React.Fragment>
            <Autocomplete
                id='freeSolo'
                freeSolo
                options={options}
                name={name}
                value={value}
                onChange={(event, newValue) => {
                    const update = {target: {name: name, value: newValue}}
                    changeHandler(update)
                }}
                autoHighlight
                fullWidth
                style={style}
                selectOnFocus
                blurOnSelect
                clearOnBlur
                clearOnEscape
                handleHomeEndKeys
                disablePortal
                sx={{
                    '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
                        backgroundColor: '#777', color: '#fff', fontWeight: 500
                    },
                    '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
                        backgroundColor: '#86a7e3', fontWeight: 600
                    },
                }}

                renderInput={(params) =>
                    <TextField
                        {...params}
                        onChange={changeHandler}
                        name={name}
                        placeholder={placeholder}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                            },
                            htmlInput: {
                                ...params.inputProps,
                                maxLength: maxLength
                            }
                        }} />}
            />
            <Backdrop
                invisible
                open={open && isMobile}
                onClick={handleBlur}
                style={{backgroundColor: '#0b0'}}
            />
        </React.Fragment>
    )
}
