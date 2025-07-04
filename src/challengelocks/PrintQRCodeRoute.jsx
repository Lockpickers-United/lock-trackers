import React, {useContext} from 'react'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import PrintQRCode from './PrintQRCode.jsx'
import {useOutletContext} from 'react-router-dom'
import DBContext from '../app/DBContext.jsx'

export default function PrintQRCodeRoute() {

    usePageTitle('LPU Locks - Print Challenge Lock')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
            <FilterProvider filterFields={CLFilterFields}>
                <DataProvider>
                        <PrintQRCode profile={profile} user={user}/>
                </DataProvider>
            </FilterProvider>
    )

}
