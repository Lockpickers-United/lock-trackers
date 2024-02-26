import React from 'react'
import {SnackbarProvider} from 'notistack'
import {AppProvider} from './AppContext'
import AppRoutes from './AppRoutes'
import {AuthProvider} from './AuthContext'
import {DBProvider} from './DBContext'
import {ColorModeProvider} from './ColorModeContext.jsx'

function App() {

    return (
        <ColorModeProvider>
                <SnackbarProvider>
                    <AuthProvider>
                        <DBProvider>
                            <AppProvider>
                                <AppRoutes/>
                            </AppProvider>
                        </DBProvider>
                    </AuthProvider>
                </SnackbarProvider>
        </ColorModeProvider>
    )
}

export default App
