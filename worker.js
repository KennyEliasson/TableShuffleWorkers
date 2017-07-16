const {allsvenskan} = require('./allsvenskan');
const {pl} = require('./pl');
const {uploadLeague} = require('./upload');

Promise.all([pl(), allsvenskan()])
    .then((data) => {
        var plResults = data[0];
        uploadLeague("premierleague",  { name: 'Premier League', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);

        var allsvenskanResults = data[1];
        uploadLeague("allsvenskan",  { name: 'Allsvenskan', teams: allsvenskanResults.teams }, allsvenskanResults.fixtures);
    });