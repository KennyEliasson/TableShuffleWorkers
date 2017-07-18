'use strict';

var request = require('request');
var cheerio = require('cheerio');

function fetchAllsvenskan() {

    return new Promise((resolve, reject) => {
        request("https://www.allsvenskan.se/matcher/", function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return reject(err);
            }	

            var $ = cheerio.load(body);
            
            var summaries = $(".summary");

            var teams = [];
            var fixtures = [];
            
            summaries.each(function(index) {
                var summary = $(this);
                var date = summary.find(".date").text();

                var currentTeams = summary.find(".teams").text().substring(2).split(" - ");
                var home = currentTeams[0];
                var away = currentTeams[1];

                if(teams.indexOf(home) === -1) {
                    teams.push(home);
                }

                if(teams.indexOf(away) === -1) {
                    teams.push(away);
                }

                var score = summary.find(".score").text().trim().split(" - ");
                
                var homeScore = score[0];
                var awayScore = score[1];

                fixtures.push({ home: home, away: away, score: { home: homeScore, away: awayScore}, date: date });
            });

            resolve({teams: teams.map(team => { return {name: team }}), fixtures: fixtures});
        });
    });
   
};

module.exports.scrape = fetchAllsvenskan;
