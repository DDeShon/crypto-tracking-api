const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const sources = [
  {
    name: "cryptonews",
    address: "https://cryptonews.com/",
  },
  {
    name: "cryptocurrencynews",
    address: "https://cryptocurrencynews.com/",
  },
  {
    name: "coindesk",
    address: "https://www.coindesk.com/",
  },
];

const articles = [];

sources.forEach((source) => {
  axios.get(source.address).then((response) => {
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
  });
});

app.get("/", (req, res) => {
  res.json("Welcome to my crypto news tracking API");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
