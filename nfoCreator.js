exports.getNFOString = (apiOutput, mediaType) => {
  if(mediaType === 'movie') {
    return createMovieNFO(apiOutput);
  }
}

const createMovieNFO = tmdbOutput => {
  let constructTemplate = '';
  constructTemplate += 

`<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
  <movie>
    <title>${tmdbOutput.title}</title>
    <originaltitle>${tmdbOutput.originaltitle}</originaltitle>
    <plot>${tmdbOutput.overview}</plot>
    <thumb>https://www.themoviedb.org/t/p/original/${tmdbOutput.poster_path}</thumb>
    <uniqueid type="tmdb" default="true">${id}</uniqueid>
      
  `

}

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

