const express = require("express");
const urlRoutes = require("./routes/url")
const URL = require("./models/url")
const app = express();
const PORT = 8001;
const connectToMongoDB = require("./connection");

app.use(express.json());
app.use('/url', urlRoutes);
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
    res.redirect(entry.redirectURL);
  });
  

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => {console.log("Mongodb Connected!")});

app.listen(PORT, () => {console.log(`Sever started at port ${PORT}`)});
