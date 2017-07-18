const allsvenskanScraper = require('./scrapers/allsvenskanScraper');
const plScraper = require('./scrapers/plScraper');
const {leagueRepository} = require('./leagueRepository');
const AWS = require('aws-sdk');
const shortid = require("shortid");


module.exports.allsvenskan = (event, context, callback) => {
   Promise.all([allsvenskanScraper.scrape()])
    .then((data) => {
      var allsvenskanResults = data[1];
      leagueRepository("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

      callback(null, { message: 'Allsvenskan loaded successfully', event });
    })
    .catch((err) => console.log(err));
}

module.exports.pl = (event, context, callback) => {
   Promise.all([plScraper.scrape()])
    .then((data) => {
      var premierleagueResults = data[1];
      leagueRepository("premierleague",  { name: 'Premier League', teams: premierleagueResults.teams }, premierleagueResults.fixtures);

      callback(null, { message: 'Premier league loaded successfully', event });
    })
    .catch((err) => console.log(err));
}

module.exports.getShuffle = (event, ctx, callback) => {
  var shuffleId = event.queryStringParameters.id;

  if(!shuffleId) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        message: 'No shuffle id found'
      })
    });
    return;
  }

  const s3 = new AWS.S3();
  var key = "shuffle-" + shuffleId;

 s3.getObject({
        Bucket: process.env.BUCKET + "/shuffles",
        Key: key + ".json",
    }, function(err, data) {
      if(err) {
        callback(err, {
          statusCode: 500,
          body: JSON.stringify({
            message: 'Could not get shuffle'
          })
        });
      } else {
        callback(null, { statusCode: 200, body: data.Body.toString() });
      }
    });
}

module.exports.saveShuffle = (event, ctx, callback) => {
  const s3 = new AWS.S3();
  const timestamp = new Date().getTime();
  
  const data = JSON.parse(event.body);
  const key = "shuffle-" + shortid.generate();

  var response = {
    statusCode: 200
  };

  if(Array.isArray(data)) {
    var formattedData = {
      created: timestamp,
      fixtures: data
    };

     s3.putObject({
        Bucket: process.env.BUCKET + "/shuffles",
        Key: key + ".json",
        Body: JSON.stringify(formattedData)
    }, function(err, data) {
        console.log('saveTable done', err);
        if(err) {
          response.body = JSON.stringify({ message: 'Could not upload to S3' });
        } else {
          response.body = JSON.stringify({ message: 'Success' });
        }
        
        callback(null, response);
    });
  } else  {
    response.body = JSON.stringify({ message: 'Malformed data' });
    callback(null, response);
  }
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
