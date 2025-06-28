import React, {useCallback, useState} from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import useWindowSize from '../util/useWindowSize.jsx'

function SubNav({options, onChange, defaultValue}) {
    const [value, setValue] = useState(defaultValue || options ? options[0].label : '')

    const handleButtonClick = useCallback(newValue => () => {
        const selected = options.find(option => option.label === newValue)
        setValue(newValue)
        onChange && onChange(selected)
    }, [onChange, options])

    const {isMobile} = useWindowSize()

    const fontOptions = isMobile ? {fontSize: '0.95rem', lineHeight:'1.1rem'} : {fontSize: '1.0rem', fontWeight: 500}

    return (
        <ToggleButtonGroup
            variant='outlined'
        >
            {options.map(option =>
                <ToggleButton
                    key={option.label}
                    onClick={handleButtonClick(option.label)}
                    style={{
                        color: value === option.label ? '#eee' : '#aaa',
                        backgroundColor: value === option.label ? '#292929' : '#111',
                        padding: '6px 12px', borderColor: '#000', borderRadius: 0,
                        ...fontOptions
                    }}
                    value={value}
                >{option.label}</ToggleButton>
            )}
        </ToggleButtonGroup>
    )
}

export default SubNav
