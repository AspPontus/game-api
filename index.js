const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Games = require("./game.js");
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

console.log(typeof(process.env.MONGOOSE_URI))
//connect to DB
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Database opened successfully!!"));

//default form input page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


//post form to database
app.post("/api/games", upload.single('poster_img'), async (req, res) => {

    try{
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
            category: req.body.category.toLowerCase().split(', '),
            search_queries: req.body.search_queries.toLowerCase().split(', ')
        });  
        game.save();
        res.status(201).json(game);
    } catch (err) {
        console.error(err)
        res.status(400).json({
            err: "400: Bad Request"
        })
    }
    
});

//fetch all the games
app.get("/api/games", async (req, res) => {
    let { limit, category, search_query } = req.query;
    let filter;

    console.log(search_query)

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

app.get("/api/games/:id", async (req, res) => {
    const game = await Games.findById(req.params.id)
    res.json(game)
});

//fetch games by query
app.get("/api/games/:query", async (req, res) => {
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