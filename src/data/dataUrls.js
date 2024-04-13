let lpuUrl = 'https://lpubelts.com';
let dataUrl = 'https://data.locktrackers.com/lockbazaar';

if (import.meta.env?.VITE_LOCAL_DATA === 'true') {
    console.info('Attention: App is using LOCAL DATA.')
	dataUrl = lpuUrl = 'http://localhost:3000/data';
}

export const locksData = `${lpuUrl}/data.json`
export const jsonBackup = 'https://data.locktrackers.com/firebase/backup.json'
export const lockListings = `${dataUrl}/lockListings.json`
