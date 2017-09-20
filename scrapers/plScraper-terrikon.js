var request = require('request');
var cheerio = require('cheerio');

function fetchPremierLeague(seasonId) {
    if(!seasonId) {
        console.log('SeasonId was undefined');
        return;
    }

    console.log("Got SeasonId", seasonId);

    var seasonMatchUrl = "/" + seasonId + "/matches"
    if(seasonId === "2017-18") {
        seasonMatchUrl = "/matches";
    }
    
    return new Promise((resolve, reject) => {
        request("http://terrikon.com/soccer/england/championship" + seasonMatchUrl, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
                return reject(err);
            }	

            var $ = cheerio.load(body);
            var summaries = $("table.timetable tbody tr");

            var teams = [];
            var fixtures = [];
            
            summaries.each(function(index) {
                
                var summary = $(this);
                var date = 1;

                var home = summary.find("td").first().text().replace("\n", "").trim();
                var away = summary.find(".rightalign").text().replace("\n", "").trim();

                if(teams.indexOf(home) === -1) {
                    teams.push(home);
                }

                if(teams.indexOf(away) === -1) {
                    teams.push(away);
                }


                
                var homeScore = '';
                var awayScore = '';
                var scoreText = summary.find(".score").text();
                if(scoreText !== ''){
                    var scores = scoreText.split(":");
                    var homeScore = scores[0];
                    var awayScore = scores[1];
                }
                

                fixtures.push({ home: home, away: away, score: { home: homeScore, away: awayScore}, date: date });
            });

            resolve({teams: teams.map(team => { return {name: team }}), fixtures: fixtures, seasonId: seasonId });
        });
    });
   
};

module.exports.scrape = fetchPremierLeague;
