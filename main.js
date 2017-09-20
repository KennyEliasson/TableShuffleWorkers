const allsvenskanScraper = require('./scrapers/allsvenskanScraper');
const plScraper = require('./scrapers/plScraper');
const plScraperTerrikon = require('./scrapers/plScraper-terrikon');
const {leagueRepository} = require('./leagueRepository');

Promise.all([plScraperTerrikon.scrape("2017-18")])
    .then((data) => {
        var plResults = data[0];
        console.log(plResults.fixtures.map(f => f.score));
        // leagueRepository("premierleague",  { name: 'Premier League', teams: plResults.teams }, plResults.fixtures);

        // var allsvenskanResults = data[1];
        // leagueRepository("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);
    });