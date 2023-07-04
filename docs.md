# Games API Docs

##### This is an API built for personal use only and is not approved for any commercial use.

###Contents:

- Structure
- Get request
  > - Id
  > - game-query
  > - Limit
  > - Genre
- Truncate and Populate Database
- Issues & Changelog

---

## Structure

###### Response:

    _id: 64a2bc17c8ecae58acc7cf16
    title: "Grand Theft Auto V"
    game_query: "grand-theft-auto-v"
    poster_img: "https://store-images.s-microsoft.com/image/apps.7814.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.b7e42789-b2bf-4b60-bf0a-f891f2f04226?q=90&w=177&h=177"
    game-info: {
        developer: "Rockstar Games
        category: [
            "action"
            "adventure"
        ]
        platform [
            "Xbox One"
            "Xbox Series X|S"
        ]
        age_limit_US: "MATURE 17+"
        description: "Experience Rockstar Games' critically acclaimed open world game, Grand Theft Auto V.  When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody, least of all each other.  Explore the stunning world of Los Santos and Blaine County in the ultimate Grand Theft Auto V experience, featuring a range of technical upgrades and enhancements for new and returning players. In addition to increased draw distances and higher resolution, players can expect a range of additions and improvements including:  • New weapons, vehicles and activities • Additional wildlife • Denser traffic • New foliage system • Enhanced damage and weather effects, and much more  Grand Theft Auto V also comes with Grand Theft Auto Online, the dynamic and ever-evolving Grand Theft Auto universe with online play now for up to 30 players on Xbox One. All existing gameplay upgrades and Rockstar-created content released since the launch of Grand Theft Auto Online is available for the Xbox One with much more to come.  SPECIAL CONTENT FOR RETURNING PLAYERS Players returning from the Xbox 360 version get special access to a host of content on Xbox One including rare versions of classic vehicles to collect from across the Grand Theft Auto series such as the Dukes, the Dodo Seaplane and a faster, more maneuverable Blimp; activities including wildlife photography and new shooting range challenges, new weapons and more.  Special access content requires Rockstar Games Social Club account. Visit rockstargames.com/v/bonuscontent for details.  You must accept the software license terms available at rockstargames.com/eula; online account terms at rockstargames.com/socialclub. Non-transferable access to special features such as exclusive/unlockable/downloadable/online content, services, or functions, such as multiplayer services or bonus content, may require single-use serial code, additional fee, and/or online account registration (13+). Access to special features may require internet connection, may not be available to all users or at all times, and may, upon 30 days notice, be terminated, modified, or offered under different terms. Violation of EULA, Code of Conduct, or other policies may result in restriction or termination of access to game or online account. For customer & tech support visit rockstargames.com/support. For information about online services, fees, restrictions, or software license terms that may apply to this game, please visit  www.rockstargames.com .   Certain limits apply to purchase, use, and redemption. See EULA www.rockstargames.com/eula and Terms of Service www.rockstargames.com/legal for details.  ©2008 - 2014 Rockstar Games, Inc. Rockstar Games, Grand Theft Auto, the GTA Five, and the Rockstar Games R* marks and logos are trademarks and/or registered trademarks of Take-Two Interactive Software, Inc. in the U.S.A. and/or foreign countries."
        screenshots: [
            "https://store-images.s-microsoft.com/image/apps.2499.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.095d516a-f787-4d3c-8dee-bb92b388b190?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.52182.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.0226b0f3-27d9-438e-bc44-76921ee9beee?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.42374.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.6c930589-2365-4248-b2fb-c12b68fee224?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.53045.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.b0fc9521-3c26-4d46-91a3-6a49919674a5?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.18345.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.03a8b471-ebc7-4a1c-a152-0c7e275c2f58?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.12183.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.62a3d88d-162b-46db-b11e-f6594f90a89d?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.22937.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.217e525e-b19f-4b3b-8e2a-bdec3bacd369?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.35295.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.d10ff5e4-561d-4539-946b-1a69092d5b22?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.16906.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.3eacb260-8396-47ee-8c63-750addb467d6?q=90&w=320&h=180"
            "https://store-images.s-microsoft.com/image/apps.17623.68565266983380288.0f5ef871-88c0-45f7-b108-6aacbc041fcf.411c7f64-6382-4128-95d9-89196afe4cde?q=90&w=320&h=180"
        ]
    }

---

## Get Request

##### To fetch all the content in the API

    https://games-api-ky9l.onrender.com/api/games

##### To fetch content by ID or game-query

    https://games-api-ky9l.onrender.com/api/games/{query}

##### To fetch content by genre

    https://games-api-ky9l.onrender.com/api/games?category={category}

##### To limit content fetched

    https://games-api-ky9l.onrender.com/api/games?limit={limit}

##### To limit content fetched

    https://games-api-ky9l.onrender.com/api/games?limit={limit}

---

## Truncate & Populate

This server is built on data which is being fed to it by a web-sraper.
The data is being fetched from and owned by Microsoft.
This data can either be automatically updated on intervals or as it is now
updated manually to avoid unnecessary storage and to make sure I dont store more than I want in the collection.

###### Web-Scraper to database:

The Web-Scraper that feeds this API is not apart of the same codebase as the server. Instead the Web-Scraper is another micro service that will work compleatly independently to the API. The Web-Scraper will instead format the data and insert it into a JSON file which is then can be accessed by the API to then read in the JSON file into the database. This is done through mongoose and not through a traditional POST request, which means that the load time is very fast, since all the information is already stringified and just needs to be parsed into mongoDB.

###### Populate:

Since the Population is not done automatically you need the manually run the script inorder to update the database to the latest JSON file produced by the Web-Scraper, this can be done with the following command:

    `npm run populate`

Which will run the node script that is in charge of populating the database.

**_Note:_**
The script will not exit automatically due to the server running and the script being asyncronus so remember to type:

`Ctrl + C`

To exit the script

###### Duplicates:

There is no need to worry about dublicates in the database since the population function excludes duplicates from and only adds data that doesnt already exist into the database

###### Truncate:

To truncate the database is very similar to populating it. To remove all current data from the database use the following command:

    `npm run truncate`

This will erase the contents of the collection but not delete the collection itself

**_Note:_**
The script will not exit automatically due to the server running and the script being asyncronus so remember to type:

`Ctrl + C`

To exit the script

## Issues & Changelog

##### Known Issues:

- If Web-Scraper times out on a web-page game info may get scrambled
- There is no release date for the games
- Populate & Truncate Scripts don't exit properly
- Missing Online tab

##### Changelog:

###### V 1.2.0

- Now fetches data from JSON from webscraper
- Removed image hosting, and instead fetches images from Xbox
- Removed form input
- Updated Schema
- Removed Dependencies: Multer, Body Parser
- Removed POST request for User
