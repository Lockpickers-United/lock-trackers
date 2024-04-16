const url = import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true' //eslint-disable-line
    ? 'http://localhost:3000/data'
    : 'https://lpubelts.com'

if (import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true') {
    console.info('Attention: App is using LOCAL DATA.')
}

export const locksData = '/data.json'
export const jsonBackup = 'https://data.locktrackers.com/firebase/backup.json'
export const lockListings = '/listings.json'
