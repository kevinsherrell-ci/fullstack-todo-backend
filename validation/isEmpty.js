const isEmpty = (input) => {
    return (
        typeof input === 'string' && input.length === 0 ||
        typeof input === 'string' && input === "" ||
        Array.isArray(input) && input.length === 0 ||
        typeof input === 'object' && Object.keys.length === 0 ||
        input === undefined || input === null
    )
}

module.exports = {
    isEmpty
}