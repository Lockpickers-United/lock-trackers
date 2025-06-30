import sharp from 'sharp'

export default async function createThumbnails({inputFile, width = 400, square = false, outputFilePath = ''}) {

    const pathComponents = inputFile.split('/')
    const filename = pathComponents.pop()
    const filenameParts = filename.match(/(.*)\.(.\w*$)/)
    const suffix = square ? '-sq' : ''
    const outputFile = outputFilePath !== ''
        ? outputFilePath
        : `${pathComponents.join('/')}/${filenameParts[1]}-${width}${suffix}.${filenameParts[2]}`

    sharp.cache(false)
    sharp.concurrency(1) // Limit concurrency to 1 to avoid memory issues

    try {
        if (!square) {
            return await sharp(inputFile)
                .resize({width: width, withoutEnlargement: true})
                .autoOrient()
                .toFile(outputFile)
                .then(info => (outputFile)) // eslint-disable-line
        } else {
            return await sharp(inputFile)
                .resize({width: width, height: width, fit: sharp.fit.cover})
                .autoOrient()
                .toFile(outputFile)
                .then(info => (outputFile)) // eslint-disable-line
        }
    } catch (err) {
        console.error('Image processing failed, details:', err.message)
    }

}

