import { writeFile, readFile } from 'fs/promises'
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, terminate} from 'firebase/firestore'
import {firebaseConfig} from '../keys/firebaseConfig.js'
import {sendEmail} from './util/sendEmail.js'

import {localUser, prodUser} from '../keys/users.js'
const production = process.env.USER !== localUser

let workDir = `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/working`
let backupDir = `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/backups`
let archiveDir = `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/archives`
let serverDir = `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/server/speedpicks`

if (production) {
    workDir = `/home/${prodUser}/lpulocks-node/data/working`
    backupDir = `/home/${prodUser}/lpulocks-node/data/backups`
    archiveDir = `/home/${prodUser}/lpulocks-node/data/archives`
    serverDir = `/home/${prodUser}/lpulocks.com.data/speedpicks`
}
const currentDate = new Date().toISOString().substring(0, 10)
const currentDay = new Date().toDateString().substring(0, 3)
const currentHour = new Date().toString().substring(16, 18)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function getAllData() {
    const fullDb = new Map()
    const collections = new Map()

    let numProfiles = 0
    let numEntries = 0
    let approvedEntries = 0
    let pendingEntryCount = 0
    let deletedEntries = 0

    const outputV = new Map()
    const versions = await getDocs(collection(db, 'versions'))
    versions.forEach((doc) => {
        outputV[doc.id] = doc.data()
    })
    collections['versions'] = outputV

    const profiles = new Map()
    const dbProfiles = await getDocs(collection(db, 'profiles'))
    dbProfiles.forEach((doc) => {
        profiles[doc.id] = doc.data()
        numProfiles++
    })
    collections['profiles'] = profiles

    const speedpicks = new Map()
    const pendingEntries = []

    const dbSpeedpicks = await getDocs(collection(db, 'speedPicks'))
    dbSpeedpicks.forEach((doc) => {
        speedpicks[doc.id] = doc.data()
        numEntries++
        if (doc.data().status === 'approved') {
            approvedEntries++
        } else if (doc.data().status === 'pending') {
            if (!production) console.log('pending entry: ', doc.id, doc.data().pickerId)
            pendingEntries.push({id: doc.id, username: profiles[doc.data().pickerId].username})
            pendingEntryCount++
        } else if (doc.data().status === 'deleted') {
            deletedEntries++
        }
    })
    collections['speedPicks'] = speedpicks

    const priorPending = JSON.parse(await readFile(`${workDir}/pendingEntries.json`, 'utf8'))

    const newPendingEntries = []
    let newPending = 0
    pendingEntries.forEach(entry => {
        if (!priorPending.find(e => e.id === entry.id)) {
            newPendingEntries.push(entry)
            newPending++
        }
    })
    
    const newPendingCount = newPendingEntries.length
    if (newPendingCount > 0) {
        const entryText = newPendingCount > 1 ? 'new pending entries' : 'new pending entry'
        const testingText = !production ? ' (TESTING)' : ''

        const html = `<strong>${newPendingCount} ${entryText} found</strong><br/><br/>`
        let fieldsHtml = html + '<table style="border-width:1px">'
        newPendingEntries.forEach(entry => {
            fieldsHtml += `<tr><td><strong>${entry.username}</strong> - </td><td>https://lpulocks.com/#/speedpicks?id=${entry.id}&sort=dateDesc&status=pending&rank=Show+All</td></tr>`
        })
        fieldsHtml += '</table>'

        try {
            await sendEmail({
                emailConfig: 'pendingEntry',
                subject: `SpeedPicks: ${newPendingCount} ${entryText}${testingText}`,
                text: `SpeedPicks: ${newPendingCount} ${entryText}`,
                html: fieldsHtml,
            })
            //console.log('Message sent: %s', email.messageId)
        } catch (error) {
            console.error('Message send failure', error)
        }
    }

    const pendingEntriesJson = JSON.stringify(pendingEntries, null, 2)
    const newPendingEntriesJson = JSON.stringify(newPendingEntries, null, 2)

    fullDb['__collections__'] = collections
    const jsonString = JSON.stringify(fullDb, null, 2)

    const writes = [
        await writeFile(`${workDir}/pendingEntries.json`, pendingEntriesJson),
        await writeFile(`${workDir}/newPendingEntries.json`, newPendingEntriesJson),
        await writeFile(`${backupDir}/backup_${currentDay}_${currentHour}.json`, jsonString),
        await writeFile(`${archiveDir}/backup_${currentDate}.json`, jsonString),
        await writeFile(`${serverDir}/backup.json`, jsonString),
    ]
    try {
        await Promise.all(writes)
    } catch (err) {
        console.error('Error writing files:', err)
    }

    if (!production) {
        console.log('version: ', outputV.speedpicks.version)
        console.log(' ')
        console.log('profiles: ', numProfiles)
        console.log(' ')
        console.log('speedPicks: ', numEntries)
        console.log('  approved entries: ', approvedEntries)
        console.log('  pending entries: ', pendingEntryCount)
        newPending && console.log(`    (${newPending} new)`)
        console.log('  deleted entries: ', deletedEntries)
        console.log(' ')
        if (newPending) {
            console.log('new pending entries:')
            pendingEntries.forEach(entry => {
                console.log(entry.id, entry.username)
            })
        }
        console.log('Run time: ', new Date().toString())
    }

    return fullDb
}

async function main() {
    try {
        await getAllData()
    } catch (err) {
        try {
            if (production) await sendEmail({
                emailConfig: 'pendingEntry',
                subject: 'SpeedPicks export failed',
                text: `SpeedPicks export failed: ${err}`,
                html: `SpeedPicks export failed: ${err}`,
                error: true
            })
            if (!production) console.log('Error message sent if in production')
        } catch (error) {
            console.error('Message send failure', error)
        }

        console.error('Export failed:', err)
    } finally {
        // terminate the Firestore client (close HTTP sockets)
        await terminate(db)
        process.exit(0)
    }
}

main().then()




