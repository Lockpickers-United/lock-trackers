import React from 'react'
import querystring from 'query-string'

function Tracker({feature, ...extraParams}) {
    if (import.meta.env.DEV) return null
    const randomStuff = (Math.random()).toString(36).substring(2, 10)
    const file = files[feature] || 'lt.gif'
    const ref = document.referrer || 'none'
    const page = window.location.href.replace(/.*\/#\/(\w+)\?*.*/,'$1')
    const query = querystring.stringify({trk: feature, r: randomStuff, w: screen.width, ref, page, ...extraParams})
    const url = `https://data.lpulocks.com/i/${file}?${query}`
    return <img alt='LPU Locks' src={url} width={0} height={0}/>
}

const files = {
    nav: 'welcome.gif',
    lock: 'clear.gif'
}

export default React.memo(Tracker)
