import React from 'react'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LPU_logo from '../assets/LPU_logo.jsx'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

export default [
    {
        title: 'Lock Bazaar',
        icon: <ShoppingCartIcon fontSize='small'/>,
        path: '/lockbazaar'
    },
    {
        title: 'Your Watchlist',
        icon: <FavoriteBorderIcon fontSize='small'/>,
        path: '/lockbazaar?collection=Watchlist',
        indent: true
    },
    {
        title: 'Import from LPUbelts',
        icon: <SavingsOutlinedIcon fontSize='small'/>,
        path: '/import',
        indent: true
    },
    {
        title: 'Seller Info',
        icon: <InfoOutlinedIcon fontSize='small'/>,
        path: '/lockbazaar/sellers'
    },
    {
        title: 'Speed Picks',
        icon: <AlarmOnIcon fontSize='small'/>,
        path: '/speedpicks'
    },
    {
        title: 'Challenge Locks',
        icon: <LockPersonIcon fontSize='small'/>,
        path: '/challengelocks'
    },
    {
        admin: true,
        title: 'Site Report',
        icon: <InsertChartOutlinedIcon fontSize='small'/>,
        path: '/reports',
        separator: true
    },
    {
        admin: true,
        title: 'Watchlist Report',
        icon: <VisibilityOutlinedIcon fontSize='small'/>,
        path: '/reports/watchlist'
    },
    {
        title: 'More from LPU',
        icon: <LPU_logo style={{height:20}}/>,
        separator: true,
        expanded: true,
        children: [
            {
                title: 'LPUbelts.com',
                path: 'https://lpubelts.com/'
            },
            {
                title: '#lock-bazaar',
                path: 'https://discord.com/channels/140129091796992000/1109656237269860383'
            },
            {
                title: 'Reddit',
                path: 'https://www.reddit.com/r/lockpicking/'
            }
        ]
    }
]
