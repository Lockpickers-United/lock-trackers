import {beltSort} from './belts'

export const lockFilterFields = [
    {label: 'Make', fieldName: 'makes'},
    {label: 'Locking Mechanism', fieldName: 'lockingMechanisms'},
    {label: 'Belt', fieldName: 'belt', sort: beltSort},
    {label: 'Features', fieldName: 'features'},
    {label: 'Content', fieldName: 'content'},
    {label: 'Collection', fieldName: 'collection', userBased: true}
]

export const LBFilterFields = [
    {label: 'Listing Type', fieldName: 'listingType'},
    {label: 'Make', fieldName: 'makes'},
    {label: 'Locking Mechanism', fieldName: 'lockingMechanisms'},
    {label: 'Belt', fieldName: 'lockBelt', sort: beltSort},
    {label: 'Seller Name', fieldName: 'sellerName'},
    {label: 'Location', fieldName: 'country'},
    {label: 'Ships To', fieldName: 'shipsTo'},
    {label: 'Collection', fieldName: 'collection', userBased: true}
]

export const spFilterFields = [
    {label: 'Make', fieldName: 'make'},
    {label: 'Belt', fieldName: 'belt', sort: beltSort},
    {label: 'Picker', fieldName: 'pickerName'},
]
