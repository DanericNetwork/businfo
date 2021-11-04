const express = require('express');
const app = express();
const config = require('./config');
const path = require("path");
const port = config.port || 1234;
const statsmodel = require('./models/stats');
const db = require('mongoose');
const moment = require('moment');
require('moment-duration-format');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(__dirname + '/public'));

// Main page
app.get('/', async (req, res) => {
    let statscount = await statsmodel.findOne(
        {
          id: 'all',
        });
        const busnum = await statsmodel.find();
        const busi = busnum.map(x => x);
        const msdelay = statscount.delay * 60000;
        const formatteddelay = moment.duration(msdelay).format("h [hours], m [minutes]");
	res.render('index', {
        statscount,
        formatteddelay,
        busnum,
        busi,
	});
});

// Stats page of bus
app.get('/stats/:bus', async (req, res) => {
    let statscount = await statsmodel.findOne(
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

// API of bus
app.get('/api/:bus', async (req, res) => {
    let statscount = await statsmodel.findOne(
        {
          id: req.params.bus,
        });
        const busExists = statscount != null;
        const buss = req.params.bus
        if(busExists){
	res.status(200).json({
                "message": "success",
                "id": statscount.id,
                "curb": statscount.curb,
                "delay": statscount.delay,
                "skips": statscount.skips
	});
        } else {
        res.status(500).json({
                "error": `bus with id ${buss} not found`,
        });
        }
});

// Global API of total stats
app.get('/api', async (req, res) => {
    let statscount = await statsmodel.findOne(
        {
          id: 'all',
        });
	res.status(200).json({
                "curb": statscount.curb,
                "delay": statscount.delay,
                "skips": statscount.skips
	});
});

// Launch app on port
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[32m[WEB]\x1b[0m', `Connected @ localhost:${port}`));