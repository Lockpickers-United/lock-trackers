import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/front')
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
            const {default: ChallengeLocksRoute} = await import('../challengelocks/ChallengeLocksRoute')
            return {element: <ChallengeLocksRoute/>}
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
        path: '*',
        loader: () => redirect('/front')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

