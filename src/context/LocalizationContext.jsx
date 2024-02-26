import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const LocalizationContext = React.createContext({})

export function LocalizationProvider({children}) {
    return (
        <LocalizationContext.Provider value={'foo'} dateAdapter={AdapterDayjs}>
            {children}
        </LocalizationContext.Provider>
    )
}

export default LocalizationContext
