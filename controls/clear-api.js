const Games = require("../game.js");
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const trunc = async () => {
    await Games.deleteMany({})
  };

trunc();


/* process.exit() */