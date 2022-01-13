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

// object to hold the options related to the api call in getSearchResults(options);
let searchOptions;
// object to hold useful values from the api call in getSearchResults()
let pageValues;

app.get("/", (req, res) => {
  res.render('home');
});

app.post("/", (req, res) => {
  
  searchOptions = {
    enteredQueryString: req.body.searchQuery,
    page: 1,
    mediaType: req.body.mediaType,
    queryType: req.body.query_type
  };

  if(!searchOptions.enteredQueryString){
    res.redirect("/error");
  }
  else{
    getResultsPage(searchOptions).then(
      searchResults => {
        pageValues = getPageValues(searchResults);
        res.redirect("/results");
    });
  }  
});

app.get("/results", (req, res) => {
  res.render('results', pageValues)
});

app.get("/results/:page", (req, res) => {

  searchOptions.page = req.params.page;
  getResultsPage(searchOptions).then(
    searchResults => {
      pageValues = getPageValues(searchResults);
      res.render('results', pageValues);
    }
  ); 
});

app.get("/error", (req,res) => {
  res.render('error');
});

app.get("media/:type/:id"), (req, res) => {

}

app.listen(3000, () => {
  console.log('server is running on port 3000')
});

const getResultsPage = async (options) => {

  let searchString = 'https://api.themoviedb.org/3/search/' + options.mediaType
  searchString += '?api_key=' + apiKey
  searchString += '&language=en-US&include_adult=false';
  searchString += '&page=' + options.page;
  searchString += '&query=';
  searchString += options.enteredQueryString;

  let result = await axios.get(searchString);
  return result.data;
}

const getPageValues = (data) => {
  console.log(data);
  return {
    page: data.page,  // 'page' here means a page of data to be rendered
    totalPages: data.total_pages,
    results: data.results
  }
}

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