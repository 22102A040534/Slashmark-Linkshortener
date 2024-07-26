const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.port;
const host = process.env.host;
const bodyParser = require("body-parser"); //use to parse incoming request bodies
const services = require("./routes/service");
const db = require("./data/db");
const urlDb = require("./data/url");
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, () => console.log("listening port " + port));
app.post("/url", async (req, res) => {
    try {
        if (!!services.validateUrl(req.body.url))
            return res.status(400).send({ msg: "Invalid URL." });
        const urlKey = services.generateUrlKey();
        const shortUrl = `http://${host}:${port}/${urlKey}`
        await urlDb.save(req.body.url, shortUrl, urlKey)
        return res.status(200).send({ shortUrl });
    } catch (error) {
        return res.status(500).send({ msg: "Error. Please try again." });
    }
    app.get("/:shortUrlId", async (req, res) => {
    try {
        const url = await urlDb.find(req.params.shortUrlId);
        return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)
    } catch (error) {
        return res.status(500).send("Error. Please try again.")
    }
}); 
});
//A lot is going on right now, here is a breakdown of the steps:

//Here, we are receiving a URL as part of our request body then validate it by using the validateUrl() function inside service.js.
//We also generate a URL ID (shortUrlId) for the given URL using the generateUrlKey() function.
//We then create a short link for the URL using our server hostname and the shortUrlId.
//We then save the URL, the short link, and the shortUrlId to our database. We then return the short link. If there’s an error, we return an appropriate error message.
//Next, we create an endpoint that accepts a shortUrlId, finds the shortUrlId inside our database and redirects the browser to the long URL associated with it.
