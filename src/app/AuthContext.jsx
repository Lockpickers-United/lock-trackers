import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import {auth} from '../auth/firebase'
import AppContext from './AppContext.jsx'

const AuthContext = React.createContext({})

export function AuthProvider({children}) {
    const {verbose} = useContext(AppContext)
    const [user, setUser] = useState({})
    const [authLoaded, setAuthLoaded] = useState(false)

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged(user => {
            setAuthLoaded(true)
            setUser(user)
            verbose && console.log('user', user)

        })
        return () => unregisterAuthObserver()
    }, [verbose])

    useEffect(() => {
        const foo = auth?.currentUser?.getIdTokenResult() // eslint-disable-line
            .then((idTokenResult) => {
                // Confirm the user is an Admin.
                verbose && console.log('token', idTokenResult.claims)
            })
            .catch((error) => {
                console.error(error)
            })
    })


    const login = useCallback(() => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})
        return signInWithPopup(auth, provider)
    }, [])

    const logout = useCallback(() => {
        return signOut(auth)
    }, [])

    const value = useMemo(() => ({
        authLoaded,
        isLoggedIn: !!user?.uid,
        user,
        login,
        logout
    }), [authLoaded, login, logout, user])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
