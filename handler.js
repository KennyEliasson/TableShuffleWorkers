const {allsvenskan} = require('./scrapers/allsvenskan');
const {pl} = require('./scrapers/allsvenskan');
const {leagueRepository} = require('./leagueRepository');

module.exports.allsvenskan = (event, context, callback) => {
   Promise.all([allsvenskan()])
    .then((data) => {
      var allsvenskanResults = data[1];
      leagueRepository("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

      callback(null, { message: 'Allsvenskan loaded successfully', event });
    })
    .catch((err) => console.log(err));
}

module.exports.pl = (event, context, callback) => {
   Promise.all([pl()])
    .then((data) => {
      var allsvenskanResults = data[1];
      leagueRepository("premierleague",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

      callback(null, { message: 'Premier league loaded successfully', event });
    })
    .catch((err) => console.log(err));
}

module.exports.hello = (event, context, callback) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Working as expected! :)',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
