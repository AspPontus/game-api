const Games = require("../game.js");
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const uploadToAPI = async () => {
        
        const fullPath = path.resolve('/Users/pontusasp/desktop/games-scraper/Game.json');
        
        await fs.readFile(fullPath, 'utf8',  (err, data) => {
           JSON.parse(data).map(async (item) => {
            const foundUser = await Games.findOne({title: item.title});
            if(foundUser) return;
             try{
               const game = await Games.create({
                    title: item.title,
                    game_query: item.game_query,
                    poster_img: item.poster,
                    game_info: item.gameInfo,
                    game_reviews: item.gameReviews,
                });  
                game.save();
            } catch (err) {
                console.error(err)
            }
           })
    })
};
uploadToAPI();


/* process.exit(); */