const defaultInitializer = index => index

export function createRange(length, initializer = defaultInitializer) {
    return Array.from({ length }, (_, index) => initializer(index))
}
