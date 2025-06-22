
export function parseForm(req, form) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({fields, files})
        })
    })
}

export function flattenFields(fields) {
    const flatFields = {}
    for (const key in fields) {
        if (Array.isArray(fields[key])) {
            flatFields[key] = fields[key].length > 0 ? fields[key][0] : ''
        } else {
            flatFields[key] = fields[key] || ''
        }
    }
    return flatFields
}
