import React, {useContext, useEffect, useState} from 'react'
import useWindowSize from '../util/useWindowSize.jsx'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import FilterContext from '../context/FilterContext.jsx'
import JsonDisplay from '../util/JsonDisplay.jsx'
import DBContext from '../app/DBContext.jsx'

export default function UserInfoMain({user}) {

    const {filters, addFilters} = useContext(FilterContext)
    const {uid} = filters
    const {getProfile} = useContext(DBContext)
    const [profile, setProfile] = useState({})

    // NT jC4XyU3KaKM7wCPkHQgulralMEE3

    useEffect(() => {
        if (user && !uid) {
            addFilters([{key: 'uid', value: user.uid}], true)
        }
        async function fetchData() {
            setProfile(await getProfile(uid || user.uid))
        }
        fetchData().then()
    }, [addFilters, filters, getProfile, uid, user])

    let userJson = {json: {userId: uid, ...profile}}

    const {width} = useWindowSize()
    const smallWindow = width <= 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    return (
        <div style={{
            minWidth: '320px', height: '100%',
            padding: pagePadding, backgroundColor: '#223',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8, textAlign: 'center'
        }}>

            <Card style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 26,
                marginBottom: 16
            }}>

                <CardHeader title={`Hey! It's ${uid} !!`} action={null} style={{paddingBottom: 0, textAlign: 'left'}}/>
                <CardContent>
                    <div style={{
                        fontSize: '1.2rem',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: 20,
                        marginBottom: 15
                    }}>

                        <JsonDisplay json={userJson} abc={true}/>

                    </div>
                </CardContent>
            </Card>


        </div>
    )
}
