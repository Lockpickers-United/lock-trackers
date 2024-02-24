import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const LocalizationContext = React.createContext({})

export function SPLocalizationProvider({children}) {
    return (
        <LocalizationContext.Provider value={'foo'} dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationContext.Provider>
    )
}

export default LocalizationContext
