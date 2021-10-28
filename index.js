const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// const sources = [
//     {
//         name: 'cryptonews',
//         address: 'https://cryptonews.com/'
//     },
//     {
//         name: 'cryptocurrencynews',
//         address: 'https://cryptocurrencynews.com/'
//     },
//     {
//         name: 'coindesk',
//         address: 'https://www.coindesk.com/'
//     }
// ]

const articles = [];

// sources.forEach(source => {
//     axios.get(source.address)
//     .then(response => {
//         const html = response.data;
//       // console.log(html);
//       const data = cheerio.load(html);
//     })
// })

app.get("/", (req, res) => {
  res.json("Welcome to my crypto news tracking API");
});

app.get("/news", (req, res) => {
  axios
    .get("https://coinmarketcap.com/")
    .then((response) => {
      const html = response.data;
      const data = cheerio.load(html);

      data("a.Link__A-eh4rrz-0", html).each(function () {
        const title = data(this).text();
        const url = data(this).attr("href");
        articles.push({
          title,
          href,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
