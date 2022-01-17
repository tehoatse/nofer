// to start off with I need a search function to dig around in tmdb
// so I'll need a page with a search
// I'll need a page with results

require('dotenv').config();
const express = require("express");
const app = express();
const ejs = require ("ejs");
const axios = require("axios");
const fs = require('fs');
const _ = require('lodash');


const apiKey = process.env.API_KEY;

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// object to hold the options related to the api call in getSearchResults(options);
let searchOptions;
// object to hold useful values from the api call in getSearchResults()
let pageValues;

let objectForOutput;

app.get("/", (req, res) => {
  res.render('home');
});

app.post("/", (req, res) => {
  searchOptions = {
    queryType: "search",
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
        pageValues.mediaType = searchOptions.mediaType;
        res.redirect("/results");
    });
  }  
});

app.post('/writefile', (req, res) => {

  let newFilesName = _.kebabCase(objectForOutput.title);
  let newFilesContent = JSON.stringify(objectForOutput);

  // convert to promises
  fs.writeFile(`${__dirname}/testOutputs/${newFilesName}.txt`, newFilesContent, 
    (err) => {
      if (err) {
        return console.error(err);
      }
      console.log("write done");
  })
  res.redirect("/");
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

app.get("/media/:type/:id", (req, res) => {
  searchOptions = null;
  searchOptions = {
    queryType: 'media',
    mediaType: req.params.type,
    enteredQueryString: req.params.id  
  }

  getResultsPage(searchOptions).then(
    searchResults =>{
      objectForOutput = searchResults;
      res.render('displayMediaItem', {
        result: searchResults
      });
    }
  ) 
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
});

const getResultsPage = async (options) => {

  let queryString = 'https://api.themoviedb.org/3/';

  if (options.queryType === 'search'){
    queryString += `search/${options.mediaType}`
    queryString += `?query=${options.enteredQueryString}`;
    queryString += `&include_adult=false&page=${ options.page}`
  }
  
  if(options.queryType === 'media'){
    queryString += `${options.mediaType}/${options.enteredQueryString}?`;
  }

  queryString += '&language=en-US'
  queryString += `&api_key=${apiKey}`

  let result = await axios.get(queryString);
  return result.data;
}

const getPageValues = (data) => {
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

// <?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
// <movie>
//     <title></title>
//     <originaltitle></originaltitle>
//     <userrating>0</userrating>
//     <plot></plot>
//     <mpaa></mpaa>
//     <uniqueid type="" default="true"></uniqueid> <!-- add a value to type="" eg imdb, tmdb, home, sport, docu, see sample below -->
//     <genre></genre>
//     <tag></tag>
//     <country></country>
//     <credits></credits>
//     <director></director>
//     <premiered></premiered> <!-- yyyy-mm-dd -->
//     <studio></studio>
//     <actor>
//         <name></name>
//         <role></role>
//         <order></order>
//     </actor>
// </movie>