import React, {createContext, useMemo, useState} from 'react'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export function ColorModeProvider({children}) {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            secondary: {
                main: '#2d49bc',
            }
        },
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecoration: 'none',
                        cursor: 'pointer',
                    },
                },
            },
        }
    })

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        textDecoration: 'none',
                        cursor: 'pointer',
                    },
                },
            },
        }
    })

    const [mode, setMode] = useState('dark')
    const colorMode = React.useMemo(() => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            }
        }),
        []
    )

    const theme = useMemo(() =>
        mode === 'light'
            ? lightTheme
            : darkTheme,
        [darkTheme, lightTheme, mode]
    )

    const style = getRootStyle(theme)

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme/>
                <style>{style}</style>

                {children}

            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default ColorModeContext

const getRootStyle = styleTheme => {
    const linkTextColor = styleTheme.palette.text.icon
    const backgroundColor = styleTheme.palette.background.default

    return `
            body {
                background-color: ${backgroundColor};
                margin: 0;
                padding: 0;
            }
            
            a {
                color: ${linkTextColor};
            }
            
            pre{ 
                white-space: pre-wrap; 
                word-break: break-word;
            }
            
            :root {
              color-scheme: dark;
              overflow-y: scroll;
            }
        `
}
