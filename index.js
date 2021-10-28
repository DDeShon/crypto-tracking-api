const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome to my crypto tracking API");
});

app.get("/news", (req, res) => {
  axios.get("https://cryptonews.com/").then((response) => {
    const html = response.data;
    console.log(html);
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
