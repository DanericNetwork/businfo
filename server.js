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
	res.render('index', {
        statscount,
	});
});

app.get('/stats/:bus', async (req, res) => {
    var statscount = await statsmodel.findOne(
        {
          id: req.params.bus,
        });
	res.render('index', {
        statscount,
	});
});
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[32m[WEB]\x1b[0m', `Connected @ localhost:${port}`));