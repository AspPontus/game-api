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
  
    age_rating_US: {
        type: Number
    },
    developed_by: {
        type: String
    },
    category: {
        type: Array
    },
    screenshots: {
        type: Array
    }
    /* search_queries: {
        type: Array
    }  */
});

module.exports = mongoose.model("Games", gameSchema);