import {useMemo} from 'react'

export default function useWindowSize() {
    let width = undefined,
        timeout = false,
        delay = 250
    function getDimensions() {
        width = window.innerWidth
    }
    window.addEventListener('resize', function() {
        clearTimeout(timeout)
        timeout = setTimeout(getDimensions, delay)
    })

    getDimensions()

    const isMobile = width < 650
    return useMemo(() => ({
        width,
        isMobile,
        flexStyle: isMobile ? 'block' : 'flex',
        flexDirection: isMobile ? 'column' : 'row'
    }), [isMobile, width])
}