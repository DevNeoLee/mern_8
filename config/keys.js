if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod').DB_URI
} else {
    module.exports = require('./keys_dev').DB_URI
}