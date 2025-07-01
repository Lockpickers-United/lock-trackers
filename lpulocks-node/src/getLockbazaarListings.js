import fs, {readFile, writeFile} from 'fs/promises'
import {parse} from 'csv-parse/sync'
import validator from 'validator'

import {localUser, prodUser} from '../keys/users.js'
import {firebaseConfig} from '../keys/firebaseConfig.js'

const production = process.env.USER !== localUser

const serverDir = production
    ? `/home/${prodUser}/lpulocks.com.data/lockbazaar`
    : `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/data/server`

const keysDir = production // eslint-disable-line
    ? `/home/${prodUser}/lpulocks-node/keys`
    : `/Users/${localUser}/Documents/GitHub/lpulocks/lpulocks-node/keys`

// MAIN DATA OBJECT
let jsonData = new Map()
let error = false

const requestMode = 'csv'
const debug = false

// GET SELLER PROFILES
import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs, doc, getDoc, query, where, terminate} from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function getAdmins() {
    const output = []
    const q = query(collection(db, 'admins'), where('isSeller', '==', true))
    const profiles = await getDocs(q)
    profiles.forEach((doc) => {
        const profile = doc.data()
        profile.sellerId = doc.id
        if (profile.spreadsheetId) {
            output.push(profile)
        }
    })
    return output
}

async function getSellers(admins) {
    const sellers = admins.map(async (admin) => {
            const docRef = doc(db, 'profiles', admin.sellerId)
            const docSnap = await getDoc(docRef)
            const seller = docSnap.data()
            seller.userId = admin.sellerId
            if (admin.spreadsheetId) {
                seller.spreadsheetId = admin.spreadsheetId
                return seller
            } else {
                return null
            }
        }
    )
    return (await Promise.all(sellers))
}


// GET LISTINGS FROM SELLER SHEETS

import {authenticate} from '@google-cloud/local-auth'
import {google} from 'googleapis'
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = `${keysDir}/token.json`
const CREDENTIALS_PATH = `${keysDir}/credentials.json`

//Reads previously authorized credentials from the save file.
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH)
        const credentials = JSON.parse(content)
        return google.auth.fromJSON(credentials)
    } catch (err) {
        error = true
        console.error(err)
        return null
    }
}

//Serializes credentials to a file compatible with GoogleAuth.fromJSON.
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH)
    const keys = JSON.parse(content)
    const key = keys.installed || keys.web
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token
    })
    await fs.writeFile(TOKEN_PATH, payload)
}

//Load or request or authorization to call APIs.
async function authorize() {
    let client = await loadSavedCredentialsIfExist()
    if (client) {
        return client
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH
    })
    if (client.credentials) {
        await saveCredentials(client)
    }
    return client
}

async function getLockURLs(auth, sellers) {
    const sellerLists = sellers.map(async (seller) => {
        try {
            return await getSellerListings(auth, seller)
        } catch (err) {
            error = true
            console.error('getLockURLs error', err)
            return null
        }
    })
    return (await Promise.all(sellerLists)).flat(1)
}

async function getSellerListings(auth, seller) {

    let rows = []

    // https://docs.google.com/spreadsheets/d/${seller.spreadsheetId}/export?format=csv
    // https://docs.google.com/spreadsheets/d/${seller.spreadsheetId}/gviz/tq?tqx=out:csv


    const url = seller.csvUrl
        ? seller.csvUrl
        : `https://docs.google.com/spreadsheets/d/${seller.spreadsheetId}/export?format=csv`

    const delimiter = seller.csvDelimiter
        ? seller.csvDelimiter
        : ','

    const csvData = await (await fetch(url)).text()

    if (debug && seller.username === 'Dig') {
        //console.log('csvData', csvData)
    }

    if ((requestMode === 'api' && !seller.csvUrl) || csvData.includes('<!DOCTYPE html>') || seller.importMode === 'api') {
        if (debug) {
            console.log('API mode', seller.username)
        }
        const sheets = google.sheets({version: 'v4', auth})
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: seller.spreadsheetId,
            range: 'A:Z'
        })

        rows = res.data.values

    } else {
        if (debug) {
            //console.log('CSV mode', seller.username)
        }
        rows = parse(csvData, {
            columns: false,
            skip_empty_lines: true,
            trim: true,
            delimiter: delimiter
        })

        //console.log('rows', rows)

        if (debug && seller.username === 'mgsecure') {
            rows.map(row => {
                console.log('qty, parse int qty', row[7], parseInt(row[7]))
                let availableInt = parseInt(row[7])
                if (isNaN(availableInt) || availableInt === 0) {
                    return
                }
                console.log(row.join(','))
            })
        }
    }

    if (!rows || rows.length === 0) {
        console.error('No data found.')
        return
    }

    const lockList = rows.map((row, index) => {
            let availableInt = parseInt(row[7])
            if (isNaN(availableInt) || availableInt === 0) {
                return
            }
            let thisMake = sanitize(row[0])
            thisMake = canonize(thisMake, 'American Lock', ['american'])
            thisMake = canonize(thisMake, 'Master Lock', ['master', 'masterlock'])
            thisMake = canonize(thisMake, 'PACLOCK', ['packlock', 'pac lock'])
            thisMake = canonize(thisMake, 'Schlage', ['schalage'])

            makeList.map((make) => {
                if (thisMake.toLowerCase() === make.toLowerCase()) {
                    thisMake = make
                }
            })

            //console.log(sanitize(row[15]))

            return ({
                rowNum: index,
                name: seller.username,
                sellerId: seller.userId,
                raflSeller: seller.raflSeller,
                shipsTo: seller.sellerShipsTo,
                country: seller.country,
                make: thisMake,
                model: sanitize(row[1]),
                belt: sanitize(row[2]),
                mechanism: sanitize(row[3]),
                format: sanitize(row[4]),
                condition: sanitize(row[5]),
                keys: sanitize(row[6]),
                available: sanitize(row[7]),
                price: sanitize(row[8]),
                photo: sanitize(row[9]),
                notes: sanitize(row[10]),
                url: sanitize(row[11]),
                samelineIndex: sanitize(row[12]),
                otherInfo: sanitize(row[13]) || undefined,
                listingType: ['Lock', 'Package', 'Tools', 'Gift Certificate'].includes(capitalizeFirstLetter(sanitize(row[14])))
                    ? capitalizeFirstLetter(sanitize(row[14]))
                    : 'Lock',
                packageContents: sanitize(row[15])
            })
        }
    ).filter(x => x)

    const sellerList = new Map()
    sellerList[seller.name] = lockList
    return lockList
}

const isDeepEqual = (object1, object2) => {
    const objKeys1 = Object.keys(object1)
    const objKeys2 = Object.keys(object2)
    if (objKeys1.length !== objKeys2.length) return false
    for (let key of objKeys1) {
        const value1 = object1[key]
        const value2 = object2[key]
        const isObjects = isObject(value1) && isObject(value2)
        if ((isObjects && !isDeepEqual(value1, value2)) ||
            (!isObjects && value1 !== value2)
        ) {
            return false
        }
    }
    return true
}

const isObject = (object) => {
    return object !== null && typeof object === 'object'
}

async function copyDataJson() {
    await fetch('https://lpubelts.com/data.json')
        .then(
            res => res.json()
        )
        .then(async out =>
            await fs.writeFile(`${serverDir}/data.json`, JSON.stringify(out), function (err) {
                if (err) {
                    console.error('save data.json error:', err)
                }
            })
        )
        .catch(err => {
            console.error(err)
            error = true
            throw err
        })
}

///////////////////////////////////////
//              MAIN                 //
///////////////////////////////////////

async function getAllListings() {
    const admins = await getAdmins()
    const sellers = await getSellers(admins)

    const auth = await authorize()
    const sellerLockURLs = await getLockURLs(auth, sellers)

    const sellerIdMap = sellers.reduce((acc, profile) => {
        acc[profile.username] = profile.userId
        return acc
    }, {})

    jsonData.sellerProfiles = sellers
    jsonData.sellerIdMap = sellerIdMap
    jsonData.listings = sellerLockURLs

    const previousJson = JSON.parse(await readFile(`${serverDir}/lockBazaarData.json`, 'utf8'))
    const prevListings = JSON.stringify(previousJson.listings, null, 2)
    const prevAllEntries = previousJson.allEntries
    const currentListings = JSON.stringify(sellerLockURLs, null, 2)

    await copyDataJson()

    const lockData = JSON.parse(await readFile(`${serverDir}/data.json`, 'utf8'))
    const localLockData = [...lockData]

    const isLPUbeltsLock = lockId => {
        return !!lockData.find(({id}) => id === lockId) || false
    }

    const getLockFromId = lockId => {
        return localLockData.find(({id}) => id === lockId) || null
    }

    let badListings = []

    const allListings = sellerLockURLs.map((listing) => {

            let availableInt = parseInt(listing?.available)
            if (isNaN(availableInt) || availableInt === 0) {
                return false
            }

            let samelineInt = !isNaN(parseInt(listing.samelineIndex))
                ? parseInt(listing.samelineIndex)
                : null

            let thisId = lockRegex.test(listing.url)
                ? listing.url.match(lockRegex)[1]
                : null

            const makeModelCount = isLPUbeltsLock(thisId)
                ? getLockFromId(thisId).makeModels.length
                : 1

            if (makeModelCount === 1) {
                samelineInt = null
            }

            const isLPUListing = (availableInt > 0 && isLPUbeltsLock(thisId))
                && !(makeModelCount > 1 && !samelineInt)
                && !(samelineInt > makeModelCount)

            let badListing = ''

            if (isLPUbeltsLock(thisId) && ((makeModelCount > 1 && !samelineInt) || (samelineInt > makeModelCount))) {

                const entryMakeModels = getLockFromId(thisId).makeModels

                badListings.push({...listing, entryMakeModels})
                badListing = 'X'
            }

            if (isNaN(samelineInt) || !isLPUListing) {
                samelineInt = null
            }

            let thisLock

            if (isLPUListing) {
                thisLock = getLockFromId(thisId)
                if (!thisLock) {
                    return false
                }
            }

            if (!isLPUListing) {
                thisLock = {}
                thisId = 'lb_' + genHexString(8)
                thisLock.id = thisId
                thisLock.belt = 'Unranked'

                const thisMake = /\w+/.test(listing.make) ? listing.make : ''
                const thisModel = /\w+/.test(listing.model) ? listing.model : ''
                thisLock.makeModels = [{make: thisMake, model: thisModel}]

                const lockingMechanisms = listing.mechanism
                    ? listing.mechanism.split(',')
                    : null
                thisLock.lockingMechanisms = lockingMechanisms && !(typeof lockingMechanisms === 'string')
                    ? lockingMechanisms.map((mechanism) => {
                        return mechanism.charAt(0).toUpperCase() + mechanism.slice(1)
                    })
                    : lockingMechanisms
                thisLock.views = 0
                if (!localLockData.find(({id}) => id === thisId)) {
                    localLockData.push(thisLock)
                }
            }


            if (!thisLock || !thisLock.makeModels) {
                console.warn('no lock or makeModels', thisLock)
                return false
            }

            if (!thisLock.makeModels[0].make && !thisLock.makeModels[0].model) {
                console.warn('neither make nor model', thisLock)
                return false
            }

            const lpubeltsName = isLPUListing
                ? entryName(thisLock, 'any', true)
                : ''
            const sheetMake = listing.make
            const sheetModel = listing.model

            const samelineInfo = samelineInt ? '-' + samelineInt : ''
            const newId = thisId + samelineInfo

            const photo = (listing.photo && validator.isURL(listing.photo)) ? listing.photo : null

            const isValid = !!thisLock && !!thisLock.makeModels

            return {
                id: newId,
                lpubeltsName: lpubeltsName,
                sheetMake: sheetMake,
                sheetModel: sheetModel,
                badListing: badListing,
                //TODO get from sellerId
                sellerName: listing.name,
                shipsTo: listing.shipsTo,
                country: listing.country,
                sellerId: listing.sellerId,
                raflSeller: listing.raflSeller,
                avail: listing.available,
                format: listing.format,
                samelineIndex: listing.samelineIndex,
                isValid: isValid,
                isLPUListing: isLPUListing,
                keys: listing.keys,
                condition: listing.condition,
                lockingMechanism: [listing.mechanism],
                photo: photo,
                price: listing.price.replace('.00', ''),
                rowNum: listing.rowNum,
                notes: listing.notes,
                lockBelt: thisLock.belt.replace(/\s\d/g, ''),
                listingType: listing.listingType,
                otherInfo: listing.otherInfo || undefined,
                packageContents: listing.packageContents
            };
        }
    )

    const validListings = allListings.filter(listing => listing.isValid)
    //const LPUListings = validListings.filter(listing => listing.isLPUListing)

    jsonData.validListings = validListings
    //jsonData.LPUListings = LPUListings

    const validLockIds = validListings
        .filter(listing => listing.isValid)
        .map((listing) => {
            return listing.id
        })

    const uniqueLockIds = [...new Set(validLockIds)]

    const lockbazzarEntryIds = uniqueLockIds
        .filter(id => !id.includes('lb_'))
        .reduce((acc, id) => {
            if (id.includes('lb_')) return acc
            const [lockId, samelineIndex] = id.split('-') //eslint-disable-line
            acc.push(lockId)
            return acc
        },[])

    const allEntries = uniqueLockIds.map((id) => {
        const [lockId, samelineIndex] = id.split('-')
        const lock = getLockFromId(lockId)
        let entry = {...lock}

        const lockListings = validListings.filter(listing => listing.id === id)

        const sellers = lockListings
            .map((listing) => {
                return listing.sellerId
            })

        const sellerNames = lockListings
            .map((listing) => {
                return listing.sellerName
            })

        const isRaflSellers = lockListings
            .reduce((acc, listing) => {
                acc = !!listing.raflSeller || !!acc
                return acc
            }, false)

        const listings = lockListings
            .map((listing) => {
                return listing
            })

        const shipsToFull = lockListings
            .filter(listing => !!listing.shipsTo)
            .map((listing) => {
                return listing.shipsTo ? listing.shipsTo : null
            }).flat()
        const shipsToUnique = [...new Set(shipsToFull)]

        const countriesFull = lockListings
            .map((listing) => {
                let terse = listing?.country?.replace('United States of America', 'United States')
                terse = terse?.replace('Netherlands (Kingdom of the)', 'Netherlands')
                return listing.country ? terse : null
            }).flat()
        const countryUnique = [...new Set(countriesFull)]

        if (samelineIndex) {
            entry.makeModels = [lock?.makeModels[samelineIndex - 1]]
            entry.id = id
        }

        const listingType = lockListings
            .map((listing) => {
                return listing.listingType || 'Lock'
            })

        //TODO roll up shipTos

        const prevEntry = prevAllEntries.find(entry => entry.id === id)

        entry.media = null
        entry.links = null
        entry.shipsTo = shipsToUnique
        entry.country = countryUnique
        entry.seller = sellers
        entry.sellerName = sellerNames
        entry.isRaflSellers = isRaflSellers
        entry.listings = listings
        entry.isLPUbeltsLock = isLPUbeltsLock(lockId)
        entry.newListingsDate = !isLPUbeltsLock(lockId)
            ? new Date('1970-01-01')
            : prevEntry ? prevEntry.newListingsDate : new Date()
        entry.listingType = listingType
        return entry
    })

    const prevListingCounts = prevAllEntries.filter(entry => entry.isLPUbeltsLock)
        .reduce((acc, entry) => {
            acc[entry.id] = entry.listings.length
            return acc
        }, {})

    // TODO: ignore my listings?

    allEntries.filter(entry => entry.isLPUbeltsLock)
        .map((entry) => {
            if (entry.listings.length > prevListingCounts[entry.id]) {
                entry.newListingsDate = new Date()
                console.log('New Listings:', entryName(entry, 'any', true), entry.id, prevListingCounts[entry.id], entry.listings.length, entry.newListingsDate)
            }
        }, {})

    jsonData.allEntries = allEntries
    //jsonData.badListings = badListings
    jsonData.requestMode = requestMode

    //console.log('Listing count:', validListings.length)

    // update version file if new listing data
    let version = previousJson.version
    if (!isDeepEqual(prevListings, currentListings)) {
        version = new Date().toString()
        !production && console.log('updated listings or profiles found')
        !production && console.log('Listing count:', validListings.length)
        !production && console.log('  new version: ', version)
    }
    jsonData.version = version

    const versionObj = {'version': version}
    const versionString = JSON.stringify(versionObj, null, 2)

    if (!error) {

        const writes = [
            await writeFile(`${serverDir}/version.json`, versionString),
            await writeFile(`${serverDir}/lockBazaarData.json`, JSON.stringify(jsonData, null, 2)),
            await writeFile(`${serverDir}/lockbazzarEntryIds.json`, JSON.stringify(lockbazzarEntryIds, null, 2)),
            await writeFile(`${serverDir}/badListings.json`, JSON.stringify(badListings, null, 2)),
        ]
        try {
            await Promise.all(writes)
        } catch (err) {
            console.error('Error writing files:', err)
        }

    } else {
        console.error('ERRORS - JSON NOT SAVED')
    }

    // save ID list for lpubelts linking

}


async function main() {
    try {
        await getAllListings()
    } catch (err) {
        console.log('Error:', err)
    } finally {
        // terminate the Firestore client (close HTTP sockets)
        await terminate(db)
        !production && console.log('done')

        process.exit(0)
    }
}

main().then()


///// helper functions  /////

const lockRegex = /id=(\w{8})/

function genHexString(len) {
    const hex = '0123456789ABCDEF'
    let output = ''
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length))
    }
    return output.toLowerCase()
}

function sanitize(string) {
    if (string) {
        // remove HTML
        let cleaned = string.replace(/(<([^>]+)>)/gi, '')
        cleaned = cleaned.replace(/javascript:*\/*/gi, '')

        //chomp leading & trailing spaces
        cleaned = cleaned.replace(/(^\s*|\s*$)/g, '')

        //common misspellings
        cleaned = canonize(cleaned, 'Pin-tumbler', ['pin tumbler', 'pintumbler'])
        cleaned = canonize(cleaned, 'Disc detainer', ['disk detainer'])
        cleaned = canonize(cleaned, 'Magnet', ['magnetic'])
        cleaned = canonize(cleaned, 'Pump/push', ['pump', 'push'])

        //makes

        //Abus / ABUS


        // make sure there's a string left
        cleaned = /\w+/.test(cleaned)
            ? cleaned
            : ''

        return cleaned

    } else return ''
}

function canonize(string, proper, variants) {
    if (!!string && !!proper && !!variants) {
        return variants.includes(string.toLowerCase()) ? proper : string
    }
    return string
}

const makeList = ['A.S.I. Inc.',
    'ABA',
    'Abloy',
    'ABUS',
    'ACE',
    'Agent',
    'Aldon Corporation',
    'Alfa',
    'ALPHA',
    'American Lock',
    'An Jia Bao',
    'Anbo',
    'Anchor Las',
    'Ankerslot',
    'Antoniolini',
    'Any',
    'Apec',
    'Arrow',
    'ASEC',
    'ASSA',
    'Australian Lock Co.',
    'Avocet',
    'AXA',
    'Bab IKON',
    'Banham',
    'BASI',
    'Baton',
    'BHP',
    'BKS',
    'Bowley',
    'Brady',
    'Bramah',
    'Bricard',
    'Brinks',
    'Brüder Mannesmann',
    'Burg Wächter',
    'Cantol',
    'Capitol',
    'CATU',
    'CAVEO',
    'Cavers',
    'CAWI',
    'CCL',
    'CEI',
    'CES',
    'Chateau',
    'Chubb',
    'CISA',
    'CISM',
    'Clavis',
    'Clover',
    'Cobra',
    'Cocraft',
    'Codkey',
    'Commando',
    'CompX Chicago',
    'Corbin',
    'Corbin Russwin',
    'Corona',
    'Crown',
    'DAlembert Métal',
    'DAF Kilit',
    'DeGuard',
    'Dejo',
    'Dény',
    'Dierre',
    'Digby Lock and Tool',
    'DOM',
    'Dorma',
    'Dulimex',
    'Eagle',
    'Eclipse',
    'Egret',
    'Elite',
    'Elzett',
    'ERA',
    'Eurospec (E*S)',
    'EVVA',
    'Ezcurra',
    'FAB',
    'Fanal',
    'Federal Lock',
    'Federal Locks',
    'Fichet',
    'Fichet-Bauche',
    'FJM',
    'Folger Adam',
    'Fontaine',
    'Forte',
    'FTH Thirard',
    'Fuki',
    'Garrison',
    'Gege',
    'Generic/Unknown',
    'Gera',
    'Gerda',
    'GLK',
    'GOAL',
    'Godrej',
    'GTV',
    'Guard',
    'Heracles',
    'Hobbs',
    'Hong Dun',
    'Hori',
    'HPP',
    'HQ',
    'IFAM',
    'IKON',
    'Illinois',
    'iNAHO',
    'Inceca',
    'Ingersoll',
    'ISEO',
    'JPM',
    'Kaba',
    'Kaken',
    'Kale Kilit',
    'Kasp',
    'Kawaha',
    'Keiden',
    'Kenaurd',
    'Keso',
    'Kibb',
    'Kromer',
    'Kryptonite',
    'Kwikset',
    'La Gard',
    'Laperche',
    'Legge',
    'Lex',
    'Lince',
    'LIPS',
    'Liquidonics',
    'Lockman',
    'Locksys',
    'Lockwood',
    'Lowe and Fletcher',
    'Lucznik',
    'M&C',
    'Magmaus',
    'Magnum',
    'Mailboss',
    'Make',
    'MAKO',
    'Marks',
    'Master Lock',
    'Mauer',
    'MCM',
    'Medeco',
    'Metal',
    'MG Serrature',
    'Mila',
    'Milencio',
    'Mindy',
    'Ming Gao',
    'MIWA',
    'MIWA/Anker',
    'Morgan',
    'Mottura',
    'Mul-T-Lock',
    'Nagasawa',
    'NATO',
    'Nemef',
    'Omellow',
    'Opnus',
    'PACLOCK',
    'Picard',
    'Picard CR Serrature',
    'Pisla',
    'Pollux',
    'Rav Bariach',
    'Ri-Key',
    'Rielda',
    'Robur',
    'Rosengrens',
    'Ross',
    'Ruko',
    'S&G',
    'SAG',
    'Sargent',
    'Schlage',
    'Scorpion',
    'SEA',
    'Securemme',
    'Securit',
    'Segal',
    'Sémag',
    'Sepa',
    'Smith and Locke',
    'SOL',
    'Solon Super-Lock Company',
    'Squire',
    'Stanley',
    'STUV',
    'Takigen',
    'Tann',
    'TESA',
    'Thirard',
    'Timpson',
    'Titan',
    'Tokoz',
    'Tostem',
    'Trelock',
    'TrioVing',
    'U-Shin',
    'UCEM',
    'Union',
    'Unity',
    'UrbanAlps',
    'US Star Tech',
    'Vachette',
    'Viro',
    'Voga',
    'VSR',
    'Walsall Locks',
    'WEST',
    'Western Electric',
    'Wetzel',
    'Wilka',
    'Wilson',
    'Winkhaus',
    'Yale',
    'Yanai',
    'Yardeni',
    'Yuema',
    'Zarker']

/*
    Usage:
    entryName(entry,'anything', 1) -> ASSA Twin Combi, Triton, Neptun 4900 / TrioVing System 10, Twin Control (6 pin with 5 finger pins)
    entryName(entry, 'short') -> ASSA Twin Combi, Triton, Neptun 4900 / TrioVing System 10, Twin Control
    entryName(entry, 'long')  -> ASSA Twin Combi / ASSA Triton / ASSA Neptun 4900 / TrioVing System 10 / TrioVing Twin Control
    entryName(entry, 'data')  -> ASSA,ASSA,ASSA,TrioVing,TrioVing	Twin Combi,Triton,Neptun 4900,System 10,Twin Control
    entryName(entry, 'array') -> ['ASSA,ASSA,ASSA,TrioVing,TrioVing', 'Twin Combi,Triton,Neptun 4900,System 10,Twin Control']
*/

function entryName(entry, nameType = 'short', includeVersion = false) {

    if (!entry) return false

    const versionString = includeVersion && entry.version ? ' (' + entry.version + ')' : ''

    if (nameType === 'long') {
        const lockName = entry.makeModels.map((makeModel) => {
            return makeModel.make + ' ' + makeModel.model
        }).join(' / ')
        return lockName + versionString
    } else if (nameType === 'data') {
        const makes = entry.makeModels.map(e => e.make).join(',')
        const models = entry.makeModels.map(e => e.model).join(',')
        return `${makes}\t${models}` + versionString
    } else if (nameType === 'array') {
        return [
            entry.makeModels.map(e => e.make).join(','),
            entry.makeModels.map(e => e.model).join(',')
        ]
    } else {
        // TODO: Clean up to be a bit more functional style
        let lockName = ''
        let prevMake = ''
        entry.makeModels.forEach((makeModel) => {
            let thisMake = makeModel.make
            let thisModel = makeModel.model
            if (!thisMake) {
                thisMake = thisModel
                thisModel = ''
            }
            if (prevMake === '') {
                lockName = `${thisMake} ${thisModel}`
            } else if (thisMake === prevMake) {
                lockName += `, ${thisModel}`
            } else {
                lockName += ` / ${thisMake} ${thisModel}`
            }
            prevMake = thisMake
        })
        return lockName + versionString
    }
}

function capitalizeFirstLetter(val) {
    return String(val).trim().charAt(0).toUpperCase() + String(val).slice(1)
}
