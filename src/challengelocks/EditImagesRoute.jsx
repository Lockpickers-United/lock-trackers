import React from 'react'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import EditImages from './EditImages.jsx'

export default function EditImagesRoute() {

    usePageTitle('Edit Images')

    return (
            <FilterProvider filterFields={CLFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <EditImages/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
    )

}
