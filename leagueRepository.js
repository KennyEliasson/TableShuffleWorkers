'use strict';

var AWS = require('aws-sdk');
const s3 = new AWS.S3();

function leagueRepository(leagueName, leagueData, fixtures) {

    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: leagueName + ".json",
        Body: JSON.stringify(leagueData.teams)
    }, function(err, data) {
        console.log('done', err);
    });

    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: leagueName + "-fixtures.json",
        Body: JSON.stringify(fixtures)
    }, function(err, data) {
        console.log('done', err);
    });
    
};

module.exports.leagueRepository = leagueRepository;