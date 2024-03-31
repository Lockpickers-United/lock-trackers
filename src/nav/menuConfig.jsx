import React from 'react'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default [
    {
        title: 'Speed Picks',
        icon: <AlarmOnIcon fontSize='small'/>,
        path: '/speedpicks'
    },
    {
        title: 'Lock Bazaar Browser',
        icon: <ShoppingCartIcon fontSize='small'/>,
        path: '/lockbazaar'
    },
    {
        title: 'Challenge Locks',
        icon: <LockPersonIcon fontSize='small'/>,
        path: '/challengelocks'
    }
]
