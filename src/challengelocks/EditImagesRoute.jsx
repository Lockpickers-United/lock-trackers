import React, {useContext} from 'react'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import EditImages from './EditImages.jsx'
import {useOutletContext} from 'react-router-dom'
import DBContext from '../app/DBContext.jsx'
import Tracker from '../app/Tracker.jsx'

export default function EditImagesRoute() {

    usePageTitle('LPU Locks - Edit CL Images')

    const {profile} = useContext(DBContext)
    const {user} = useOutletContext()

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <DataProvider>
                <ListProvider>
                    <EditImages profile={profile} user={user}/>
                    <Tracker feature='clEditImages'/>
                </ListProvider>
            </DataProvider>
        </FilterProvider>
    )

}
