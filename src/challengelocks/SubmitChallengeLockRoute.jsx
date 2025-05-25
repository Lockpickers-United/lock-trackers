import React, {useMemo} from 'react'
import Nav from '../nav/Nav.jsx'
import Footer from '../nav/Footer.jsx'
import Tracker from '../app/Tracker.jsx'
import usePageTitle from '../util/usePageTitle.jsx'
import {lockFilterFields} from '../data/filterFields'
import {FilterProvider} from '../context/FilterContext.jsx'
import SubmitChallengeLock from './SubmitChallengeLock.jsx'
import useData from '../util/useData.jsx'
import {allLocks} from '../data/dataUrls.js'
import {setDeep, setDeepUnique} from '../util/setDeep.js'
import LoadingDisplay from '../misc/LoadingDisplay.jsx'
import {DataProvider} from './DataProviderCL.jsx'


function ToolsRoute() {
    usePageTitle('Submit Challenge Lock')

    const {data, loading, error} = useData({url: allLocks})

    const lockData = useMemo(() => {
        return data?.reduce((acc, entry) => {
            entry.makeModels.map(lock => {
                const make = lock.make ? lock.make : lock.model
                setDeepUnique(acc, ['allMakes'], make.trim())
            })
            acc.lockingMechanisms = acc.lockingMechanisms || []
            setDeep(acc, ['lockingMechanisms'], entry.lockingMechanisms
                ? [...new Set([...acc.lockingMechanisms, ...entry.lockingMechanisms, 'Multiple'])].sort()
                : acc.lockingMechanisms)
            return acc
        }, {})
    }, [data])


    return (
        <FilterProvider filterFields={lockFilterFields}>
            <DataProvider>

            <React.Fragment>
                <Nav title='Challenge Locks' route='cl'/>

                {loading &&
                    <LoadingDisplay/>
                }

                {!!data && !loading &&
                    <SubmitChallengeLock lockData={lockData}/>
                }

                {error &&
                    <div style={{padding: 20, textAlign: 'center'}}>
                        <h2>Error loading locks data</h2>
                        <p>{error.message}</p>
                    </div>
                }

                <Footer/>

                <Tracker feature='flickrInfo'/>
            </React.Fragment>
            </DataProvider>
        </FilterProvider>
    )
}

export default ToolsRoute