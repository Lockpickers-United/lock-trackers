import React from 'react'
import {redirect} from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'

export default [
    {
        path: '/',
        loader: () => redirect('/speedpicks')
    },
    {
        admin: true,
        path: '/admin',
        lazy: async () => {
            const {default: AdminRoute} = await import('../admin/AdminRoute')
            return {element: <AdminRoute/>}
        },
        children: [
            {
                path: '/admin/collectionsReport',
                lazy: async () => {
                    const {default: CollectionsReportMain} = await import('../admin/CollectionsReportMain')
                    return {element: <CollectionsReportMain/>}
                }
            }, {
                path: '/admin/siteReport',
                lazy: async () => {
                    const {default: SiteReportMain} = await import('../admin/SiteReportMain')
                    return {element: <SiteReportMain/>}
                }
            }
        ]
    },
    {
        path: '/profile/edit',
        lazy: async () => {
            const {default: EditProfileRoute} = await import('../profile/EditProfileRoute')
            return {element: <EditProfileRoute/>}
        }
    },
    {
        path: '/profile/:userId',
        lazy: async () => {
            const {default: ProfileRoute} = await import('../profile/ProfileRoute')
            return {element: <ProfileRoute/>}
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
        path: '*',
        loader: () => redirect('/speedpicks')
    },
].map(route => ({...route, errorElement: <ErrorBoundary/>}))

