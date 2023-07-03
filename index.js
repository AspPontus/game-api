const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Games = require("./game.js");
const bodyParser = require('body-parser');

require('dotenv').config();

//body parser config, set images as public folder
app.use(express.json());
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({extended: false}));

//connect to DB
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Database opened successfully!!"));


//fetch all the games
app.get("/api/games", async (req, res) => {
    let { limit, category, search_query } = req.query;
    let filter;

    if(!limit) {
        limit = 25
    }
    if(category) {
        filter = {category}
    }
    if(search_query) {
        filter = {search_queries: search_query}
    }

    try{
        const games = await Games.find(filter).limit(parseInt(limit))
        res.json(games)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            err: "500: Server Error"
        })
    }
});

//fetch games by id
app.get("/api/games/:id", async (req, res) => {
    const game = await Games.findById(req.params.id)
    res.json(game)
});

//fetch games by query
app.get("/api/games/query/:query", async (req, res) => {
    try{
        const games = await Games.find({game_query: req.params.query})
        res.json(games)
    } catch (err) {
        console.error(err)
        res.status(400).json({
            err: "400: Bad Request"
        })
    }      
});


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  })