const { default: mongoose } = require('mongoose');
 
const reviewSchema = new mongoose.Schema({
    game_ref: {
        type: String,
        required: true,
    },
    game_title: {
        type: String,
        required: true,
    },
    game_reviews: {
        type: Object
    }
})

module.exports = mongoose.model('Reviews', reviewSchema);