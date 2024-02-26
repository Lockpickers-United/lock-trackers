import React, {useState} from 'react'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const ColorModeContext = React.createContext({
    toggleColorMode: () => {}
})

export function ColorModeProvider({children}) {


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#000000',
                light: '#2c2c2c',
                dark: '#000000',
                contrastText: '#ffffff'
            },
            secondary: {
                main: '#18aa18',
                light: '#23d523',
                dark: '#117e11',
                contrastText: '#000000'
            }
        }
    })

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            text: {
                primary: '#333',
                secondary: '#555555'
            }
        }
    })

    const style = getRootStyle(darkTheme)

    const [mode, setMode] = useState('dark')
    const colorMode = React.useMemo(() => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            }
        }),
        []
    )

    const theme = React.useMemo(() =>
        mode === 'light'
            ? lightTheme
            : darkTheme,
        [darkTheme, lightTheme, mode]

    )

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
