const url = import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true' //eslint-disable-line
    ? 'http://localhost:3000/data'
    : 'https://lpubelts.com'

if (import.meta.env && import.meta.env.VITE_LOCAL_DATA === 'true') {
    console.info('Attention: App is using LOCAL DATA.')
}

export const allLocks = 'https://lpubelts.com/data.json'
export const lockBazaarData = 'https://data.lpulocks.com/lockbazaar/lockBazaarData.json'
export const badListingData = 'https://data.lpulocks.com/lockbazaar/badListings.json'

// TODO switch to https://data.lpulocks.com/
export const jsonBackup = 'https://data.lpulocks.com/speedpicks/backup.json'

export const siteFull = '/reports/statsSiteFull.json'
export const siteSummary = '/reports/statsSiteSummary.json'
export const statsWatchlist = '/reports/statsWatchlist.json'

export const samelineViewsJson = '/reports/samelineViews.json'

export const wishlist = 'https://explore.lpubelts.com/wishlist/?token=81750a99&id=GGplAdctTfVDLVvYsfIADJmfp8f2'