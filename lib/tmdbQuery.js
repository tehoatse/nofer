const axios = require('axios');

const apiKey = process.env.API_KEY;

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

module.exports = getResultsPage;