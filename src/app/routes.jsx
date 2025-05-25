import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/lockbazaar')
    },
    {
        path: '/profile/edit',
        lazy: async () => {
            const {default: EditProfileRoute} = await import('../profile/EditProfileRoute')
            return {element: <EditProfileRoute/>}
        }
    },
    {
        path: '/speedpicks',
        lazy: async () => {
            const {default: SpeedPicksRoute} = await import('../speedpicks/SpeedPicksRoute')
            return {element: <SpeedPicksRoute/>}
        }
    },
    {
        path: '/challengelocks',
        lazy: async () => {
            const {default: ChallengeLocksParentRoute} = await import('../challengelocks/ChallengeLocksParentRoute')
            return {element: <ChallengeLocksParentRoute/>}
        },
        children: [
            {
                path: '/challengelocks',
                lazy: async () => {
                    const {default: ChallengeLocksRoute} = await import('../challengelocks/ChallengeLocksRoute')
                    return {element: <ChallengeLocksRoute/>}
                }
            },
            {
                path: '/challengelocks/submit',
                lazy: async () => {
                    const {default: SubmitChallengeLockRoute} = await import('../challengelocks/SubmitChallengeLockRoute')
                    return {element: <SubmitChallengeLockRoute/>}
                }
            }
        ]
    },
    {
        path: '/lockbazaar',
        lazy: async () => {
            const {default: LockBazaarRoute} = await import('../lockbazaar/LockBazaarRoute')
            return {element: <LockBazaarRoute/>}
        }
    },
    {
        path: '/import',
        lazy: async () => {
            const {default: ImportRoute} = await import('../lockbazaar/ImportRoute')
            return {element: <ImportRoute/>}
        }
    },
    {
        path: '/lockbazaar/sellers',
        lazy: async () => {
            const {default: LockBazaarSellersRoute} = await import('../lockbazaarSellers/LockBazaarSellersRoute')
            return {element: <LockBazaarSellersRoute/>}
        }
    },
    {
        path: '/lockbazaar/badlistings',
        lazy: async () => {
            const {default: BadListingsRoute} = await import('../lockbazaarSellers/BadListingsRoute')
            return {element: <BadListingsRoute/>}
        }
    },
    {
        path: '/privacy',
        lazy: async () => {
            const {default: PrivacyRoute} = await import('../privacy/PrivacyRoute')
            return {element: <PrivacyRoute/>}
        }
    },
    {
        path: '/contact',
        lazy: async () => {
            const {default: ContactRoute} = await import('../contact/ContactRoute')
            return {element: <ContactRoute/>}
        }
    },
    {
        path: '/front',
        lazy: async () => {
            const {default: FrontRoute} = await import('../front/FrontRoute')
            return {element: <FrontRoute/>}
        }
    },
    {
        path: '/rafl',
        lazy: async () => {
            const {default: RaflRoute} = await import('../lockbazaar/RaflRoute')
            return {element: <RaflRoute/>}
        }
    },
    {
        path: '/reports',
        lazy: async () => {
            const {default: ReportsRoute} = await import('../reports/ReportsRoute')
            return {element: <ReportsRoute/>}
        }
    },
    {
        path: '/reports/watchlist',
        lazy: async () => {
            const {default: WatchlistReportRoute} = await import('../reports/WatchlistReportRoute')
            return {element: <WatchlistReportRoute/>}
        }
    },
    {
        path: '*',
        loader: () => redirect('/lockbazaar')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

