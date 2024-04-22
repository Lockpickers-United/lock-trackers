import React from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import SortFilterBarSP from './SortFilterBarSP.jsx'
import {useTheme} from '@mui/material/styles'
import SkeletonEntry from './SkeletonEntry.jsx'

function Entries() {

    let skeletons = []
    for (let i = 0; i < 15; i++) {
        skeletons.push(i)
    }

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const theme = useTheme()
    const background = theme.palette.mode === 'dark' ? '#223' : '#ffffff'

    return (
        <div style={{
            minWidth: '320px', maxWidth: 800, height: '100%',
            padding: pagePadding, backgroundColor: background,
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>
            <SortFilterBarSP/>


            <SkeletonEntry height={10}/>
            <div style={{height:10}}/>
            {skeletons.map((i) =>
                <SkeletonEntry key={i} height={30}/>
            )}

            <div style={{height: 40}}/>

        </div>
    )
}

export default Entries
