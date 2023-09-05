const Games = require("../models/game.js");
const Review = require("../models/review.js");
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const trunc = async () => {
    await Games.deleteMany({})
    await Review.deleteMany({})
  };

trunc();


/* process.exit() */