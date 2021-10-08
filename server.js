const express = require('express');
const app = express();
const config = require('./config');
const path = require("path");
const port = config.port || 1234;
const statsmodel = require('./models/stats');
const db = require('mongoose');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    var statscount = await statsmodel.findOne(
        {
          id: 'all',
        });
        const busnum = await statsmodel.distinct("id");
        const busi = busnum.map(x => x)
	res.render('index', {
        statscount,
        busnum,
        busi,
	});
});

app.get('/stats/:bus', async (req, res) => {
    var statscount = await statsmodel.findOne(
        {
          id: req.params.bus,
        });
        const busExists = statscount != null;
        const buss = req.params.bus
	res.render('stats', {
        statscount,
        busExists,
        buss,
	});
});
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[32m[WEB]\x1b[0m', `Connected @ localhost:${port}`));