import React from 'react'
import Tracker from '../app/Tracker'
import Footer from '../nav/Footer'
import Nav from '../nav/Nav'
import {LoadingProvider} from '../youtubeContext/LoadingContextYT.jsx'
import {FilterProvider} from '../context/FilterContext.jsx'
import {DataProvider} from '../youtubeContext/DataProviderYT.jsx'
import {ListProvider} from '../context/ListContext.jsx'
import {ytFilterFields} from '../data/filterFields'
import YouTubeMain from './YouTubeMain.jsx'


function YoutTubeRoute() {

    document.title = 'LPU Locks - YouTube Directory'

    return (
        <LoadingProvider>
            <FilterProvider filterFields={ytFilterFields}>
                <DataProvider>
                    <ListProvider>
                        <Nav title='YouTube Directory' route='yt'/>

                        <YouTubeMain/>

                        <Footer/>
                        <Tracker feature='youtube'/>
                    </ListProvider>
                </DataProvider>
            </FilterProvider>
        </LoadingProvider>
    )
}

export default YoutTubeRoute
