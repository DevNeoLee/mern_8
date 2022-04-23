const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    users: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Game = mongoose.model('Game', GameSchema);