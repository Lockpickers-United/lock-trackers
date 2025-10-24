import express from 'express'
import cors from 'cors'
import fs from 'fs'
import http from 'http'
import EventEmitter from 'events'
import dayjs from 'dayjs'

import {localUser} from '../keys/users.js'
import submitChallengeLock, {submitCheckIn, updateLockMedia, reportProblem, clearProblems} from './projects/challengeLocks/challengeLockFunctionsNew.js'

const prodServer = true
const prodDB = true

const ports = prodServer ? {http: 9080, https: 9443} : {http: 9080, https: 9443}
const envText = prodServer ? '' : ' (DEV)'

const local = localUser === process.env.USER
const keysDir = !local
    ? `/home/${process.env.USER}/lpulocks-node/keys`
    : `/Users/${process.env.USER}/Documents/GitHub/lpulocks/lpulocks-node/keys`

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

app.post('//submit-challenge-lock', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Challenge Lock Submitted' + envText)
    await submitChallengeLock(req, res).then()
})

app.post('//update-lock-media', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Lock Media Update' + envText)
    await updateLockMedia(req, res).then()
})

app.post('//check-in-challenge-lock', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Check-in Submitted' + envText)
    await submitCheckIn(req, res).then()
})

app.post('//report-problem', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Problem Reported' + envText)
    await reportProblem(req, res).then()
})

app.post('//clear-problems', async (req, res) => {
    req.body = req.body || {}
    req.body.prod = prodDB
    myEmitter.emit('myEvent', 'Clear Problems requested' + envText)
    await clearProblems(req, res).then()
})

app.get('//test', async (req, res) => {
    myEmitter.emit('myEvent', 'Test')
    res.send({test: 'true'})
})

app.get('/', (req, res) => {
    res.send('LPU Locks Server is running' + envText)
})

/////////////

const httpServer = http.createServer(app)
httpServer.listen(ports.http, () => {
})
