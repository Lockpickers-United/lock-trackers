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
    {label: 'Make', fieldName: 'makes'},
    {label: 'Locking Mechanism', fieldName: 'lockingMechanisms'},
    {label: 'Belt', fieldName: 'simpleBelt', sort: beltSort},
    {label: 'Seller Name', fieldName: 'sellerName'},
    {label: 'Ships To', fieldName: 'shipsTo'}
]

export const spFilterFields = [
    {label: 'Picker ID', fieldName: 'pickerId'},
    {label: 'Approved', fieldName: 'approved'},
    {label: 'Belt', fieldName: 'belt', sort: beltSort}
]

export const dialFilterFields = [
    {label: 'Make', fieldName: 'make'},
    {label: 'Fence Type', fieldName: 'fence'},
    {label: 'UL Group', fieldName: 'group'},
    {label: 'Wheels', fieldName: 'wheels'},
    {label: 'Digits', fieldName: 'digits'},
    {label: 'Features', fieldName: 'features'},
    {label: 'Content', fieldName: 'content'}
]
