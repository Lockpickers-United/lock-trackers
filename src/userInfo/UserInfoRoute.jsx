import React, {useContext} from 'react'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'

import UserInfoMain from './UserInfoMain.jsx'
import AuthContext from '../app/AuthContext.jsx'
import DBContext from '../app/DBContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import MustBeLoggedIn from './MustBeLoggedIn.jsx'

function UserInfoRoute() {
    const {authLoaded, isLoggedIn, user} = useContext(AuthContext)
    const {dbLoaded} = useContext(DBContext)

    document.title = 'LPU Locks - User Info'

    return (
        <FilterProvider filterFields={[]}>

            <Nav title='User Info' route='co'/>

            {(!authLoaded || !dbLoaded) &&
                <LoadingDisplay/>
            }
            {authLoaded && !isLoggedIn && <MustBeLoggedIn/>}

            {authLoaded && isLoggedIn && dbLoaded &&
                <UserInfoMain user={user}/>
            }
            <Footer/>
        </FilterProvider>
    )
}

export default UserInfoRoute
