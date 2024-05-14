import React from 'react'
import LoadingDisplay from '../util/LoadingDisplay'
import useData from '../util/useData'
import usePageTitle from '../util/usePageTitle'
import useWindowSize from '../util/useWindowSize'
import dayjs from 'dayjs'
import {statsWatchlist} from '../data/dataUrls'
import WatchlistSummaryTable from './watchlistReport/WatchlistSummaryTable.jsx'
import WatchlistUsersSavesLine from './watchlistReport/WatchlistUsersSavesLine.jsx'
import WatchlistDailyTable from './watchlistReport/WatchlistDailyTable.jsx'
import WatchlistLocksTable from './watchlistReport/WatchlistLocksTable.jsx'
import WatchlistSavesByBeltBar from './watchlistReport/WatchlistSavesByBeltBar.jsx'


function SiteReportMain() {
    usePageTitle('Watchlist Report')
    const {data, loading, error} = useData({urls})
    const {statsWatchlist} = data || {}
    const jsonLoaded = (!loading && !error && !!data)

    const {width} = useWindowSize()
    const smallWindow = width < 560
    const pagePadding = !smallWindow
        ? '24px 24px 32px 24px'
        : '8px 8px 32px 8px'

    const firstHeaderStyle = {margin: '20px 0px 36px 0px', width: '100%', textAlign: 'center', color: '#fff'}
    const headerStyle = {margin: '46px 0px 18px 0px', width: '100%', textAlign: 'center', color: '#fff'}

    const updateTime = loading ? '--'
        : '(updated: ' + dayjs(statsWatchlist?.metadata.updatedDateTime).format('MM/DD/YY hh:mm') + ` ${statsWatchlist?.metadata.timezone})`


    if (loading) return <LoadingDisplay/>
    else if (error) return null
    else if (jsonLoaded) return (
        <div style={{
            minWidth: '320px', maxWidth: 900, height: '100%',
            padding: pagePadding, backgroundColor: '#292929',
            marginLeft: 'auto', marginRight: 'auto',
            fontSize: '1.5rem', lineHeight: 0.8
        }}>

            <div style={firstHeaderStyle}>
                Summary
                <div style={{fontSize: '0.85rem', marginTop:10}}>{updateTime}</div>
            </div>
            <WatchlistSummaryTable data={statsWatchlist}/>

            <div style={headerStyle}>Users & Saves</div>
            <WatchlistUsersSavesLine data={statsWatchlist}/>

            <div style={headerStyle}>Last 28 Days</div>
            <WatchlistDailyTable data={statsWatchlist}/>

            <div style={headerStyle}>Belt Breakdown</div>
            <WatchlistSavesByBeltBar data={statsWatchlist}/>

            <div style={headerStyle}>Top Locks</div>
            <WatchlistLocksTable data={statsWatchlist}/>

        </div>
    )
}

const urls = {
    statsWatchlist
}

export default SiteReportMain
