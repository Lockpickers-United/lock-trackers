import express from 'express'
import cors from 'cors'
import fs from 'fs'
import http from 'http'
import https from 'https'
import EventEmitter from 'events'
import dayjs from 'dayjs'

import submitChallengeLock from './projects/challengeLocks/submitChallengeLock.js'
//import {localUser} from '../keys/users.js'

// pm2 start /home/dh_m5s5pf/explore-lpubelts-com-node/exploreLPUbeltsServer.js --watch
// https://explore.lpubelts.com:8443/rafl-stats


//import importRaflData from './projects/importRaflData/importRaflData.js'
//import {getCharities, raflUtils} from './projects/raflFormUtilities/raflFormUtils.js'

const prod = false
const ports = prod ? {http: 8080, https: 8443} : {http: 3080, https: 3443}
const envText = prod ? '' : ' (DEV)'

const keysDir = prod
    ? `/home/${process.env.USER}/explore-lpubelts-com-node/keys`
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
    req.body.prod = prod
    myEmitter.emit('myEvent', 'Challenge Lock Submitted' + envText)
    await submitChallengeLock(req, res).then()
})

/////////////

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)
httpServer.listen(ports.http, () => {
})
httpsServer.listen(ports.https, () => {
})

