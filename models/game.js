const { default: mongoose } = require('mongoose');

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
    game_info: {
        type: Object
    },
    game_reviews: {
        type: Object
    }
});

module.exports = mongoose.model("Games", gameSchema);