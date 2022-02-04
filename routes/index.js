var express = require('express');
var router = express.Router();
const query = require('../lib/tmdbQuery');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'nofer' });
});

router.post('/', (req, res, next) => {
    searchOptions = {
        queryType: "search",
        enteredQueryString: req.body.searchQuery,
        page: 1,
        mediaType: req.body.mediaType,
        queryType: req.body.query_type
      };

    if(!searchOptions.enteredQueryString){
        res.redirect('/error');
    } else{
        query(searchOptions).then( searchResults => {
            res.send(searchResults);
        });
    }
});

module.exports = router;
