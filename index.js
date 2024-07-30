const express = require("express");
const urlRoutes = require("./routes/url")
const path = require("path");
const URL = require("./models/url")
const app = express();
const staticRoute = require("./routes/staticRouter");
const PORT = 8001;
const connectToMongoDB = require("./connection");

app.use(express.urlencoded ({extended: false}));
app.use(express.json());
app.use('/url', urlRoutes);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", staticRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/:shortId", async (req, res) => {
    const shortID = req.params.shortId;
    try {
        const entry = await URL.findOne({ shortId: shortID });

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send("Not found");
        }
    } catch (error) {
        console.error("Error finding URL entry:", error);
        res.status(500).send("Server error");
    }
});


connectToMongoDB("mongodb://localhost:27017/urls")
.then(() => {console.log("Mongodb Connected!")});

app.listen(PORT, () => {console.log(`Sever started at port ${PORT}`)});
