// utils/sanitizeText.js
import DOMPurify from 'dompurify'

export function sanitizeText(input) {
    if (/^\d+(?:\.\d+)?$/.test(input)) {
        return input
    }
    const cleaned = stripExtras(input)
        .replace(/<script[\s\S]*?<\/script>/gi, '')
    return DOMPurify.sanitize(cleaned, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: []
    })
}

// remove all Unicode combining marks (the “Zalgo” bits) and zero-width controls
function stripExtras(str) {
    return str
        ? str.toString()
            .normalize('NFC')
            // 1) remove combining marks (Zalgo)
            .replace(/[\p{M}]/gu, '')
            // 2) remove control/format chars (incl. bidi overrides)
            .replace(/[\p{Cc}\p{Cf}]/gu, '')
            // 3) remove zero-widths
            .replace(/[\u200B-\u200F\u2060-\u206F\uFEFF]/g, '')
            // 4) collapse spaces/tabs, normalize line breaks, trim
            .replace(/[ \t]{2,}/g, ' ')
            .replace(/\r\n?/g, '\n')
            .trim()
        : ''
}

export default function sanitizeValues(object) {
    if (typeof object !== 'object' || object === null) {
        return sanitizeText(object)
    }

    if (Array.isArray(object)) {
        return object.map(sanitizeValues)
    }

    const sanitizedObject = {}
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            sanitizedObject[key] = sanitizeValues(object[key])
        }
    }
    return sanitizedObject
}