const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_stars: {
        type: Array,
    },
    user_saved: {
        type: Array,
    },
    created: {
        type: Date
    }
});

module.exports = mongoose.model("Users", userSchema);