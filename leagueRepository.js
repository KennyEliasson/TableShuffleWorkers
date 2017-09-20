'use strict';

var AWS = require('aws-sdk');
const s3 = new AWS.S3();

function leagueRepository(leagueFileName, leagueData, fixtures) {

    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: leagueFileName + ".json",
        Body: JSON.stringify(leagueData)
    }, function(err, data) {
        console.log('error', err);
    });

    s3.putObject({
        Bucket: process.env.BUCKET,
        Key: leagueFileName + "-fixtures.json",
        Body: JSON.stringify(fixtures)
    }, function(err, data) {
        console.log('error', err);
    });
    
};

module.exports.save = leagueRepository;