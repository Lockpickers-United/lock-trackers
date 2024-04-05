import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
            paddingLeft:0
        },
    },
}

const options = [
    'Africa',
    'Asia',
    'Australia & Oceania',
    'Europe',
    'North America',
    'South America'
]

function getStyles(name, optionName, theme) {
    return {
        fontWeight:
            optionName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelect({parentChange, currentValue}) {
    const theme = useTheme()
    const [optionName, setOptionName] = React.useState([])

    const handleChange = (event) => {
        parentChange(event)
        const {
            target: { value },
        } = event
        setOptionName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    return (
        <div>
            <FormControl sx={{ marginTop: '10px', width: '100%'}}>
                <InputLabel style={{padding:0}}>Ships To</InputLabel>
                <Select
                    multiple
                    size='small'
                    fullWidth
                    name={'sellerShipsTo'}
                    value={currentValue || optionName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Ships To" />}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, optionName, theme)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
