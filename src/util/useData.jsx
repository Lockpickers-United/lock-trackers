import Button from '@mui/material/Button'
import {enqueueSnackbar} from 'notistack'
import React, {useCallback, useEffect, useMemo, useState} from 'react'

function useData({url, urls, loadFn}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const loadData = useCallback(async () => {
        try {
            setLoading(true)

            let value
            if (url) {
                const response = await fetch(url, {cache: 'no-store'})
                value = await response.json()
            } else if (urls) {
                value = {}
                const promises = Object.keys(urls)
                    .map(async key => {
                        const response = await fetch(urls[key], {cache: 'no-store'})
                        value[key] = await response.json()
                    })
                await Promise.all(promises)
            } else if (loadFn) {
                value = await loadFn()
            }

            setData(value)
            setLoading(false)
            setError(false)
        } catch (ex) {
            console.error('Error loading data.', ex)
            enqueueSnackbar('Error loading data. Please reload the page.', {
                autoHideDuration: null,
                action: <Button color='secondary' onClick={() => window.location.reload()}>Refresh</Button>
            })
            setLoading(false)
            setError(true)
        }
    }, [url, urls, loadFn])

    useEffect(() => {
        loadData()
    }, [loadData])

    return useMemo(() => ({
        loading,
        data,
        error,
        refresh: loadData
    }), [data, error, loadData, loading])
}

export default useData
