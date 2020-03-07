module.exports = function parseArrayAsString (arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim())
}