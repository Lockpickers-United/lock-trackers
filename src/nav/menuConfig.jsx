import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import FeedIcon from '@mui/icons-material/Feed'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import BuildIcon from '@mui/icons-material/Build'
import AvTimerIcon from '@mui/icons-material/AvTimer'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'

export default [
    {
        title: 'Speed Picks',
        icon: <AlarmOnIcon fontSize='small'/>,
        path: '/speedpicks'
    },
    {
        title: 'Challenge Locks',
        icon: <AlarmOnIcon fontSize='small'/>,
        path: '/challengelocks'
    },
    {
        admin: true,
        title: 'Admin Tools',
        icon: <BuildIcon fontSize='small'/>,
        path: '/admin',
        children: [
            {
                admin: true,
                title: 'Site Report',
                path: '/admin/siteReport'
            }, {
                admin: true,
                title: 'Collections Report',
                path: '/admin/collectionsReport'
            }
        ]
    }
]
