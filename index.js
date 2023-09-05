const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Games = require("./models/game.js");
const Review = require("./models/review.js");
const Users = require("./models/user.js");
const cors = require("cors");

const corsOptions ={
    origin:'*', 
    credentials:true, 
    optionSuccessStatus:200,
 }

require('dotenv').config();
app.use(express.json());
app.use(cors(corsOptions));

  //Todo!
  //Remove version from db.............................[]
  //Clean up formatting................................[]
  //Write tests? (long term)...........................[]
  //Refine Endpoints...................................[]

//connect to DB
mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Database opened successfully!!"));

//fetch all the games
app.get("/api/games", async (req, res) => {
    let { limit, category, search_query } = req.query;
    let filter;
    console.log(req.query)

    if(!limit) {
        limit = 25
    }
    if(category) {
        filter = {'game_info.category': category}
    }
    if(search_query) {
        filter = {search_queries: search_query}
    }
    console.log(filter)

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

app.post('/api/users/:id/stars', async (req, res) => {
    const user = await Users.findById(req.params.id);
    const exists = user.user_stars.filter(id => id.game_id === req.body.game_id);

    try{
       if (exists.length < 1){
        console.log('new game')
        user.user_stars.push({game_id: req.body.game_id, stars: req.body.value})
        user.save()
        } else {
            console.log('comp: ', exists.map(x => x.game_id).toString())
            await Users.findOneAndUpdate({_id: req.params.id, "user_stars.game_id": req.body.game_id}, {$set: {"user_stars.$": {game_id: req.body.game_id, stars: req.body.value}}})
            console.log('exists in db', exists)
        }
        res.json(req.body.value) 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'server error please try again later',
            message: err
        })
    }
});

app.get('/api/users/:id/stars/:game', async (req, res) => {

    try {
        const user = await Users.findOne({_id: req.params.id, 'user_stars.game_id': req.params.game});
        const currentGameStatus = user.user_stars.filter(x => x.game_id === req.params.game);
        const currentGameStars = parseInt(currentGameStatus.map(game => game.stars));

        res.json({
            user: req.params.id, 
            game: req.params.game,
            stars: currentGameStars
        });  
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'server error please try again later',
            message: err
        });
    };
});

app.post('/api/users/:id/favorite', async (req, res) => {
    const user = await Users.findById(req.params.id);
    const game = await Users.findOne({user_saved: req.body.game_id}, 'user_saved.$')

    try {
        if (game && req.body.currentState) {
            await Users.updateOne({_id: req.params.id, "user_saved": req.body.game_id}, {$pull: {"user_saved": req.body.game_id}})
        } else {
            user.user_saved.push(req.body.game_id)
            user.save()
        }
        res.json(req.body.game_id)   
    } catch (err) {
        console.error(err)
        res.status(500).json({
            error: 'server error please try again later',
            message: err
        });
    }
})

app.get('/api/users/:id/favorite/:game', async (req, res) => {
    const game = await Users.findOne({_id: req.params.id})

    if(game.user_saved.includes(req.params.game)) {
        res.json({saved: true})
    } else {
        res.json({saved: false})
    }
})

app.get('/api/users/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)

    res.json({
        id: user._id,
        username: user.username,
        staredGames: user.user_stars,
        createdAt: user.created,
    })
});

app.get('/api/game/:game_id/reviews', async (req, res) => {
    const reviews = await Review.find({game_ref: req.params.game_id})
    res.json(reviews)
})

//fetch games by query
app.get("/api/games/query/:query", async (req, res) => {
    try{
        const games = await Games.find({game_query: req.params.query.toString()})
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