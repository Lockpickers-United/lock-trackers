import fs from 'fs/promises'
import path from 'path'
import {authenticate} from '@google-cloud/local-auth'
import {google} from 'googleapis'
import {localUser, prodUser} from '../keys/users.js'

const production = process.env.USER !== localUser

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const KEYS_DIR = production // eslint-disable-line
    ? `/home/${prodUser}/lpulocks-node/keys`
    : `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/keys`
const CREDENTIALS_PATH = path.join(KEYS_DIR, 'credentials.json') // downloaded from Google Cloud Console
const TOKEN_PATH      = path.join(KEYS_DIR, 'token.json')

// Try loading an existing token
async function loadSavedCredentialsIfExist() {
    try {
        const content     = await fs.readFile(TOKEN_PATH, 'utf8')
        const credentials = JSON.parse(content)
        return google.auth.fromJSON(credentials)
    } catch {
        return null
    }
}

// Save new credentials back to token.json
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8')
    const keys    = JSON.parse(content)
    const key     = keys.installed || keys.web
    const payload = {
        type:          'authorized_user',
        client_id:     key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    }
    await fs.writeFile(TOKEN_PATH, JSON.stringify(payload, null, 2))
}

// Main auth helper
export async function authorize() {
    console.log('Authorizing...')
    let client = await loadSavedCredentialsIfExist()
    if (client) return client

    client = await authenticate({
        scopes:     SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    })

    if (client.credentials) {
        await saveCredentials(client)
        console.log('New token.json saved.')
    }
    return client
}

async function main() {
    console.log('starting OAuth flow')
    const auth = await authorize()
    console.log('✅ authenticated')
    const sheets = google.sheets({version: 'v4', auth})
    // … now call your existing listing logic
}

main().catch(err => {
    console.error('fatal error:', err)
    process.exit(1)
})
