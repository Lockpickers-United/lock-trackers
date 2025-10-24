import express from 'express'
import cors from 'cors'
import http from 'http'
import EventEmitter from 'events'
import dayjs from 'dayjs'

const prodServer = false
const prodDB = false //eslint-disable-line no-unused-vars

const port = prodServer ? 9080 : 9081
const envText = prodServer ? '' : ' (DEV)'

const app = express()
app.disable('etag')
app.disable('x-powered-by')
app.use(cors())
app.use(express.json({limit: '200kb'}))
app.use((req, _res, next) => {
    req.url = req.url.replace(/\/{2,}/g, '/')
    if (prodServer && req.body) req.body.prod = true
    next()
})

//const largeJson = express.json({ limit: '2mb' })

const myEmitter = new EventEmitter()
myEmitter.on('myEvent', (data) => {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss ZZ')
    console.log(timestamp, '-', data)
})

app.post('/submit-challenge-lock', async (req, res) => {
    myEmitter.emit('myEvent', 'Challenge Lock Submitted' + envText)
    const {default: submitChallengeLock} = await import('./projects/challengeLocks/challengeLockFunctionsNew.js')
    await submitChallengeLock(req, res)
})

app.post('/update-lock-media', async (req, res) => {
    myEmitter.emit('myEvent', 'Lock Media Update' + envText)
    const {updateLockMedia} = await import('./projects/challengeLocks/challengeLockFunctionsNew.js')
    await updateLockMedia(req, res)
})

app.post('/check-in-challenge-lock', async (req, res) => {
    myEmitter.emit('myEvent', 'Check-in Submitted' + envText)
    const {submitCheckIn} = await import('./projects/challengeLocks/challengeLockFunctionsNew.js')
    await submitCheckIn(req, res)
})

app.post('/report-problem', async (req, res) => {
    myEmitter.emit('myEvent', 'Problem Reported' + envText)
    const {reportProblem} = await import('./projects/challengeLocks/challengeLockFunctionsNew.js')
    await reportProblem(req, res).then()
})

app.post('/clear-problems', async (req, res) => {
    myEmitter.emit('myEvent', 'Clear Problems requested' + envText)
    const {clearProblems} = await import('./projects/challengeLocks/challengeLockFunctionsNew.js')
    await clearProblems(req, res).then()
})

app.get('/test', async (req, res) => {
    myEmitter.emit('myEvent', 'Test')
    res.send({test: 'true'})
})

app.get('/', (req, res) => {
    res.send('LPU Locks Server is running' + envText)
})

///////

const httpServer = http.createServer(app)
httpServer.keepAliveTimeout = 5000
httpServer.headersTimeout = 6000
httpServer.requestTimeout = 10000
httpServer.listen(port, () => {
})
