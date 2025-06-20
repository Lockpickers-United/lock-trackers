/**
 * @param {string} field       the name of the date-string field on each item
 * @param {'asc'|'desc'} order sort direction; 'asc' = oldest→newest, 'desc' = newest→oldest
 * @param {string} fallback    a string-field to compare when both dates are missing
 */
import dayjs from 'dayjs'

export default function createDateSorter(field, order = 'desc', fallback = 'name') {
    return (a, b) => {
        const dA = a[field] ? dayjs(a[field]).valueOf() : null
        const dB = b[field] ? dayjs(b[field]).valueOf() : null
        if (dA !== null && dB !== null) {
            return order === 'asc' ? dA - dB : dB - dA
        }
        if (dA !== null) return -1
        if (dB !== null) return 1
        return String(a[fallback]).localeCompare(String(b[fallback]))
    }
}