const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newsSources = [
  {
    name: "cryptonews.com",
    address: "https://cryptonews.com",
    base: "",
  },
  {
    name: "cryptonews.net",
    address: "https://cryptonews.net",
    base: "",
  },
  {
    name: "coindesk.com",
    address: "https://www.coindesk.com",
    base: "",
  },
  {
    name: "coinmarketcap.com",
    address: "https://coinmarketcap.com/headlines/news/",
    base: "",
  },
];

const articles = [];

newsSources.forEach((newsSource) => {
  axios.get(newsSource.address).then((response) => {
    const html = response.data;
    const data = cheerio.load(html);

    data("a.title", html).each(function () {
      const title = data(this).text();
      const url = data(this).attr("href");
      articles.push({
        title,
        url: newsSource.address + url,
        source: newsSource.name,
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
