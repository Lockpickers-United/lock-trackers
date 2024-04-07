import React from 'react'
import AlarmOnIcon from '@mui/icons-material/AlarmOn'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export default [
    {
        title: 'Lock Bazaar',
        icon: <ShoppingCartIcon fontSize='small'/>,
        path: '/lockbazaar'
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
    }
]
