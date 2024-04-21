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
    {label: 'Belt', fieldName: 'lockBelt', sort: beltSort},
    {label: 'Seller Name', fieldName: 'sellerName'},
    {label: 'Location', fieldName: 'country'},
    {label: 'Ships To', fieldName: 'shipsTo'},
    {label: 'Collection', fieldName: 'collection', userBased: true}

]

export const spFilterFields = [
    {label: 'Picker ID', fieldName: 'pickerId'},
    {label: 'Approved', fieldName: 'approved'},
    {label: 'Belt', fieldName: 'belt', sort: beltSort}
]
