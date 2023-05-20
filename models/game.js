const { default: mongoose } = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    game_query: {
        type: String,
        required: true
    },
    poster_img: {
        type: String,
        required: true
    },
    multiplayer: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    },
    release_date: {
        type: Date
    },
    pg_rating: {
        type: Number
    },
    developed_by: {
        type: String
    }
});

module.exports = mongoose.model("Game", gameSchema);