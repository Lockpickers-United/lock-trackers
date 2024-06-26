import React, {useCallback, useMemo} from 'react'
import {useLocalStorage} from 'usehooks-ts'

const AppContext = React.createContext({})

export function AppProvider({children}) {
    const [beta, setBeta] = useLocalStorage('beta', true)

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
