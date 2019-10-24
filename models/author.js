const mongooose = require('mongoose');

const authorSchema = mongooose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongooose.model('Author', authorSchema)