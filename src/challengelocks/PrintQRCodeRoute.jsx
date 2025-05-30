import React from 'react'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from './DataProviderCL.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import PrintQRCode from './PrintQRCode.jsx'

export default function PrintQRCodeRoute() {

    usePageTitle('Print Challenge Lock')

    return (
            <FilterProvider filterFields={CLFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <PrintQRCode/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
    )

}
