const express = require("express");
const urlRoutes = require("./routes/url")
const path = require("path");
const URL = require("./models/url")
const app = express();
const staticRoute = require("./routes/staticRouter");
const PORT = 8001;
const connectToMongoDB = require("./connection");
const { timeStamp } = require("console");

app.use(express.urlencoded ({extended: false}));
app.use(express.json());
app.use('/url', urlRoutes);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.get("/", staticRoute);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    console.log(shortId);
    res.redirect(entry.redirectURL);
  });

connectToMongoDB("mongodb://localhost:27017/urls")
.then(() => {console.log("Mongodb Connected!")});

app.listen(PORT, () => {console.log(`Sever started at port ${PORT}`)});
