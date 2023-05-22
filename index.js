const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Games = require("../games-api/models/game");
const bodyParser = require('body-parser');
const multer = require('multer');

require('dotenv').config();

//set image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const upload = multer({storage});

//body parser config, set images as public folder
app.use(express.json());
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({extended: false}));

//connect to DB
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(err));
db.once('open', () => console.log("Database opened successfully!!"));

//default form input page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


//post form to database
app.post("/api/games", upload.single('poster_img'), async (req, res) => {


    console.log(req.body.game_title);
    const game = await Games.create({
        title: req.body.game_title,
        game_query: req.body.game_query,
        poster_img: req.file.path,
        multiplayer: req.body.multiplayer,
        online: req.body.online,
        date: req.body.date,
        pg_rating: req.body.pg_rating,
        developed_by: req.body.developed_by,
        category: req.body.category.toLowerCase().split(',')
    });
    game.save();
    res.json(game);
});

//fetch all the games
app.get("/games", async (req, res) => {
    let { limit, category } = req.query;
    let filter;

    if(!limit) {
        limit = 25
    }
    if(category) {
        filter = {category}
    }

    const games = await Games.find(filter).limit(parseInt(limit))
    res.json(games)
});

app.get("/games/:id", async (req, res) => {
    const game = await Games.findById(req.params.id)
    res.json(game)
});

//fetch games by query
app.get("/games/:query", async (req, res) => {
    const games = await Games.find({game_query: req.params.query})
    res.json(games)
});

app.listen(3000, () => {
    console.log("Server has started")
});