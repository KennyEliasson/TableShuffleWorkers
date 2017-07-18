var request = require('request');
var cheerio = require('cheerio');

function fetchPremierLeague() {

    return new Promise((resolve, reject) => {
        request("http://www.skysports.com/premier-league-results/2016-17", function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return reject(err);
            }	

            var $ = cheerio.load(body);
            
            var summaries = $(".matches__item");

            var teams = [];
            var fixtures = [];
            
            summaries.each(function(index) {
                var summary = $(this);
                var date = 1;//summary.find(".date").text();

                var home = summary.find(".matches__participant--side1").text().replace("\n", "").trim();
                var away = summary.find(".matches__participant--side2").text().replace("\n", "").trim();

                if(teams.indexOf(home) === -1) {
                    teams.push(home);
                }

                if(teams.indexOf(away) === -1) {
                    teams.push(away);
                }
                
                var homeScore = summary.find(".matches__teamscores-side").first().text().trim();
                var awayScore = summary.find(".matches__teamscores-side").last().text().trim();

                fixtures.push({ home: home, away: away, score: { home: homeScore, away: awayScore}, date: date });
            });

            resolve({teams: teams.map(team => { return {name: team }}), fixtures: fixtures});
        });
    });
   
};

module.exports.scrape = fetchPremierLeague;
