import React, {useCallback, useMemo, useState} from 'react'
import lockJson from '../data/data.json'
import belts, {uniqueBelts} from '../data/belts'
import speedPickData from './speedPicks.json'
import entryName from '../entries/entryName'
import formatTime from './formatTime'
import dayjs from 'dayjs'

const SPDataContext = React.createContext({})

export function DataProvider({children}) {

    const [updated, setUpdated] = useState(0)
    const DCUpdate = useCallback(value => {
        setUpdated(value)
    },[])

    const lockBelts = useMemo(() => belts, [])
    const [speedPicks, setSpeedPicks] = useState(speedPickData)

    const lockData = useMemo(() => lockJson, [])
    const bestTimes = useMemo(() => new Map(), [])

    const [isMod, setIsMod] = useState(true)
    const toggleMod = useCallback(value => {
        setIsMod(!isMod)
        setSpeedPicks(speedPickData)
        DCUpdate(Math.random())
    }, [DCUpdate, isMod])

    if (!isMod) {
        speedPicks.data = speedPicks.data.filter(entry =>
            entry.approved === true
        )
    }

    speedPicks.data.map(entry => {
        const lockId = entry.lockId
        const thisLock = lockData?.find(({id}) => id === lockId)
        entry.lock = entryName(thisLock, 'short')
        entry.version = thisLock.version

        entry.belt = thisLock.belt
        const beltLookup = thisLock.belt.startsWith('Black') ? 'Black' : thisLock.belt
        entry.beltIndex = uniqueBelts.indexOf(beltLookup)

        const totalTime = (dayjs(entry.open) - dayjs(entry.start)) / 1000
        entry.totalTime = totalTime
        entry.totalTimeString = formatTime(totalTime)

        if (bestTimes.get(lockId) && entry.approved) {
            const bestTime = totalTime > bestTimes.get(lockId) ? bestTimes.get(lockId) : totalTime
            bestTimes.set(lockId, bestTime)
        } else if (entry.approved) {
            bestTimes.set(lockId, totalTime)
        }
    })

    const [sort, setSort] = useState('lock')
    const handleSort = useCallback(newValue => {
        setSort(newValue)
    }, [])
    console.log(sort)

    const sorted = sort === 'belt'
        ? speedPicks?.data.sort((a, b) => {
            return a.beltIndex - b.beltIndex
                || a.lock.localeCompare(b.lock)
                || a.totalTime - b.totalTime
        })
        : sort === 'picker'
            ? speedPicks?.data.sort((a, b) => {
                return a.picker.localeCompare(b.picker)
                    || a.totalTime - b.totalTime
            })
            : speedPicks?.data.sort((a, b) => {
                return a.lock.localeCompare(b.lock)
                    || a.totalTime - b.totalTime
            })

    const getLockFromId = useCallback(lockId => {
        return lockData?.find(({id}) => id === lockId)
    }, [lockData])

    const getEntryFromId = useCallback(entryId => {
        return speedPicks?.data.find(({id}) => id === entryId)
    }, [speedPicks])

    const getNameFromId = useCallback(id => {

        const entry = getEntryFromId(id)
        const lock = getLockFromId(entry.lockId)

        if (lock) {
            const {makeModels} = lock
            const {make, model} = makeModels[0]
            const makeModel = make && make !== model ? `${make} ${model}` : model
            return makeModel.replace(/[\s/]/g, '_').replace(/\W/g, '')
        }
    }, [getEntryFromId, getLockFromId])

    const addEntry = useCallback(entry => {
        const foo = speedPickData.data.push(entry)
        console.log(entry)
    },[])

    const value = useMemo(() => ({
        lockBelts,
        speedPicks,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        addEntry,
        handleSort,
        DCUpdate,
        toggleMod,
        isMod
    }), [
        lockBelts,
        speedPicks,
        lockData,
        bestTimes,
        getLockFromId,
        getEntryFromId,
        getNameFromId,
        addEntry,
        handleSort,
        DCUpdate,
        toggleMod,
        isMod
    ])

    return (
        <SPDataContext.Provider value={value}>
            {children}
        </SPDataContext.Provider>
    )
}

export default SPDataContext
