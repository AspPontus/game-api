const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Game = require("../games-api/models/game")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));


require('dotenv').config()

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(err))
db.once('open', () => console.log("Database opened successfully!!"))

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.post("/api/games", async (req, res) => {
    console.log(req.body.game_title)
    const game = await Game.create({
        title: req.body.game_title,
        game_query: req.body.game_query
    }) 
    game.save()
    res.json(game)
})

app.listen(3000, () => {
    console.log("Server has started")
})