const { default: mongoose } = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: {
        type: String
    },
    game_query: {
        type: String
    },
    poster_img: {
        type: String
    }
});

module.exports = mongoose.model("Game", gameSchema);