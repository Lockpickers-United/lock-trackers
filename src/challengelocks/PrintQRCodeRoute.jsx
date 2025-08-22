import React from 'react'
import {CLFilterFields} from '../data/filterFields.js'
import {FilterProvider} from '../context/FilterContext.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import PrintQRCode from './PrintQRCode.jsx'

export default function PrintQRCodeRoute() {

    usePageTitle('Print Challenge Lock')

    return (
        <FilterProvider filterFields={CLFilterFields}>
            <PrintQRCode/>
        </FilterProvider>
    )

}
