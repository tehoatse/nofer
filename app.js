// to start off with I need a search function to dig around in tmdb
// so I'll need a page with a search
// I'll need a page with results

require('dotenv').config();
const express = require("express");
const app = express();
const ejs = require ("ejs");
const axios = require("axios");

const apiKey = process.env.API_KEY;

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let TMDBQueryresult = {
  total_results: 0
};

app.get("/", (req, res) => {
  res.render('home');
});

app.get("/", (req, res) => {
  res.render('results');
});

app.get("/results", (req, res) => {
  res.render('results')
});

app.post("/", (req, res) => {
  searchQuery = req.body.searchQuery;
  console.log(searchQuery);

  let searchString = 'https://api.themoviedb.org/3/search/movie?api_key=';
  searchString += apiKey;
  searchString += '&language=en-US&include_adult=false';
  searchString += '&query=' + searchQuery;

  axios.get(searchString).then(resp => {
    TMDBQueryresult = resp.data;    
    console.log(TMDBQueryresult.total_results);
  });

  res.redirect("/results");
});

app.listen(3000, () => {
    console.log('server is running on port 3000')
  });

  // adult: false,
  // backdrop_path: '/9rm4TX4m6RHa5DbXDuRlVoawFU9.jpg',
  // genre_ids: [Array],
  // id: 1847,
  // original_language: 'en',
  // original_title: 'The Long Goodbye',
  // overview: 'Detective Philip Marlowe tries to help a friend who is accused of murdering his wife.',
  // popularity: 9.685,
  // poster_path: '/oBhUK54yBJ0aH6u9zCzSV5iV7OP.jpg',
  // release_date: '1973-03-07',
  // title: 'The Long Goodbye',
  // video: false,
  // vote_average: 7.5,
  // vote_count: 396

  // { page: 10, results: [], total_pages: 1, total_results: 16 }