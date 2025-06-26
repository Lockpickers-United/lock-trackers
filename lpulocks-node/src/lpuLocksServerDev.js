import express from 'express'
import cors from 'cors'
import fs from 'fs'
import http from 'http'
import https from 'https'
import EventEmitter from 'events'
import dayjs from 'dayjs'

import {localUser} from '../keys/users.js'
import submitChallengeLock, {submitCheckIn, updateLockMedia, reportProblem, clearProblems} from './projects/challengeLocks/challengeLockFunctions.js'

// pm2 start /home/dh_m5s5pf/explore-lpubelts-com-node/exploreLPUbeltsServer.js --watch
// https://explore.lpubelts.com:8443/rafl-stats

//import importRaflData from './projects/importRaflData/importRaflData.js'
//import {getCharities, raflUtils} from './projects/raflFormUtilities/raflFormUtils.js'

const prodServer = false
const prodDB = false

const ports = prodServer ? {http: 7080, https: 7443} : {http: 2080, https: 2443}
const envText = prodServer ? '' : ' (DEV)'

const local = localUser === process.env.USER
const keysDir = !local
    ? `/home/${process.env.USER}/lpulocks-node/keys`
    : `/Users/${process.env.USER}/Documents/GitHub/lpulocks/lpulocks-node/keys`


//  /home/dh_m5s5pf/explore-lpubelts-com-node/keys

const privateKey = fs.readFileSync(`${keysDir}/server.key`, 'utf8')
const certificate = fs.readFileSync(`${keysDir}/server.crt`, 'utf8')
const credentials = {key: privateKey, cert: certificate}

const app = express()
app.use(cors())
app.use(express.json())

const myEmitter = new EventEmitter()
myEmitter.on('myEvent', (data) => {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss ZZ')
    console.log(timestamp, '-', data)
})

app.post('/submit-challenge-lock', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Challenge Lock Submitted' + envText)
    await submitChallengeLock(req, res).then()
})

app.post('/update-lock-media', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Challenge Lock Submitted' + envText)
    await updateLockMedia(req, res).then()
})

app.post('/check-in-challenge-lock', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Check-in Submitted' + envText)
    await submitCheckIn(req, res).then()
})

app.post('/report-problem', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Problem Reported' + envText)
    await reportProblem(req, res).then()
})

app.post('/clear-problems', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Clear Problems requested' + envText)
    await clearProblems(req, res).then()
})


/////////////

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)
httpServer.listen(ports.http, () => {
})
httpsServer.listen(ports.https, () => {
})

