const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articles = [];

app.get("/", (req, res) => {
  res.json("Welcome to my crypto tracking API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://cryptonews.com/")
    .then((response) => {
      const html = response.data;
      // console.log(html);
      const data = cheerio.load(html);

      data("a.article__title", html).each(function () {
        const title = data(this).text();
        const url = data(this).attr("href");
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
