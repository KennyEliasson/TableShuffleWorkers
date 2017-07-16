const {allsvenskan} = require('./scrapers/allsvenskan');
const {pl} = require('./scrapers/allsvenskan');
const {leagueRepository} = require('./leagueRepository');

Promise.all([pl(), allsvenskan()])
    .then((data) => {
        var plResults = data[0];
        leagueRepository("premierleague",  { name: 'Premier League', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

        var allsvenskanResults = data[1];
        leagueRepository("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);
    });