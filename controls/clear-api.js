const Games = require("../models/game");
const Review = require("../models/review");
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const trunc = async () => {
    await Games.deleteMany({})
    await Review.deleteMany({})
  };

trunc();


/* process.exit() */