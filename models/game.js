const { default: mongoose } = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    query_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Game", gameSchema);