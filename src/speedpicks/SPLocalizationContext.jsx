import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const SPLocalizationContext = React.createContext({})

export function SPLocalizationProvider({children}) {
    return (
        <SPLocalizationContext.Provider value={'foo'} dateAdapter={AdapterDayjs}>
            {children}
        </SPLocalizationContext.Provider>
    )
}

export default SPLocalizationContext
