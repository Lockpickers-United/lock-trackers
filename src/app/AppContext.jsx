import React, {useCallback, useContext, useMemo} from 'react'
import {useLocalStorage} from 'usehooks-ts'
import AuthContext from './AuthContext.jsx'

const AppContext = React.createContext({})

export function AppProvider({children}) {

    const {authLoaded, isLoggedIn} = useContext(AuthContext)
    const notLoggedIn = authLoaded && !isLoggedIn

    const [beta, setBeta] = useLocalStorage('beta', !notLoggedIn)

    const handleSetBeta = useCallback(value => {
        setBeta(value)
    }, [setBeta])

    const verbose = false

    const value = useMemo(() => ({
        beta,
        setBeta: handleSetBeta,
        verbose
    }), [beta, handleSetBeta, verbose])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
