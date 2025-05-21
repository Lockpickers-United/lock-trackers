import React, {useContext} from 'react'
import DBContext from '../app/DBContext.jsx'
import LoadingDisplay from '../util/LoadingDisplay.jsx'
import {badListingData} from '../data/dataUrls'
import useData from '../util/useData.jsx'

const urls = {badListingData}

function BadListingsMain() {

    const {data, loading} = useData({urls})
    const {badListingData = []} = data || {}

    const {adminFlags = {}} = useContext(DBContext)

    const listings = badListingData?.sort((a, b) => {
        return a.name.localeCompare(b.name)
            || a.rowNum - b.rowNum
    })


    return (

        <React.Fragment>

            {loading && <LoadingDisplay/>}

            {(!loading && adminFlags.isSeller) &&
                <div style={{
                    minWidth: '320px', maxWidth: 800, height: '100%',
                    padding: 20, backgroundColor: '#000',
                    marginLeft: 'auto', marginRight: 'auto',
                    justifyItems: 'center', fontSize: '0.9rem'
                }}>

                    <table>
                        <thead>
                        <tr>
                            <td style={{padding: 3, fontWeight: 700}}>Seller</td>
                            <td style={{padding: 3, fontWeight: 700}}>Row #</td>
                            <td style={{padding: 3, fontWeight: 700}}>Lock Name</td>
                            <td style={{padding: 3, fontWeight: 700}}>Samelines</td>
                        </tr>
                        </thead>
                        <tbody>
                        {listings.map((listing, index) =>
                            <tr key={index} style={{marginBottom: 10}}>
                                <td style={{padding: 3, verticalAlign: 'top'}}>{listing.name}</td>
                                <td style={{padding: 3, verticalAlign: 'top'}}>{listing.rowNum}</td>
                                <td style={{padding: 3, verticalAlign: 'top'}}>{listing.make} {listing.model}</td>
                                <td style={{padding: 3, verticalAlign: 'top'}}>
                                    {listing.entryMakeModels.map((entry, index) => {
                                        return <div key={index}
                                                    style={{marginBottom: 3, fontWeight: ((listing.make + listing.model).toLowerCase() === (entry.make + entry.model).toLowerCase()) ? 700 : 400}}>
                                            {index + 1} - {entry.make} {entry.model}
                                        </div>
                                    })}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

            }

        </React.Fragment>

    )
}

export default BadListingsMain
