const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Game = require("../games-api/models/game")
const bodyParser = require('body-parser')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({storage})

app.use(bodyParser.urlencoded({extended: false}));


require('dotenv').config()

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(err))
db.once('open', () => console.log("Database opened successfully!!"))


app.use(express.json())
app.use('/images', express.static('images'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})


app.post("/api/games", upload.single('poster_img'), async (req, res) => {
    console.log(req.body.game_title)
    const game = await Game.create({
        title: req.body.game_title,
        game_query: req.body.game_query,
        poster_img: req.file.path
    }) 
    game.save()
    res.json(game)
})

app.get

app.listen(3000, () => {
    console.log("Server has started")
})