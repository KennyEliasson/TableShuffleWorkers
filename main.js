const allsvenskanScraper = require('./scrapers/allsvenskanScraper');
const plScraper = require('./scrapers/plScraper');
const {leagueRepository} = require('./leagueRepository');

Promise.all([plScraper.scrape(), allsvenskanScraper.scrape()])
    .then((data) => {
        var plResults = data[0];
        leagueRepository("premierleague",  { name: 'Premier League', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

        var allsvenskanResults = data[1];
        leagueRepository("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);
    });