const express = require('express');
const app = express();
const config = require('./config');
const path = require("path");
const port = config.port || 1234;
const statsModel = require('./models/stats');
const settingsModel = require('./models/settings');
const db = require('mongoose');
const moment = require('moment');
require('moment-duration-format');
const DiscordOauth2 = require("discord-oauth2");
const session = require('express-session')
// get body data from post requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const oauth = new DiscordOauth2({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
});

app.use(session({ secret: 'YesVeryMooiDitMoetVerySecretZijn01200', cookie: { maxAge: 6000000 }}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
        req.user = req.session.user;
        next();
    })

// ------------------
//   Public routes
// ------------------

app.get('/', async (req, res) => {
    let statscount = await statsModel.findOne(
        {
          id: 'all',
        });
        let settings = await settingsModel.findOne({ id: 'data' });
        const busnum = await statsModel.find();
        const busi = busnum.map(x => x);
        const msdelay = statscount.delay * 60000;
        const formatteddelay = moment.duration(msdelay).format("h [hours], m [minutes]");
	res.render('index', {
                settings,
                user: req.user,
                statscount,
                formatteddelay,
                busnum,
                busi,
	});
});

app.get('/stats/:bus', async (req, res) => {
    let statscount = await statsModel.findOne(
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

// ------------------
//   Admin routes
// ------------------
app.get('/admin', async (req, res) => {
        let stats = await statsModel.find();
        let settings = await settingsModel.findOne({ id: 'data' });
        
        if (!req.user) return res.redirect('/login');
        if(!settings.admins.includes(req.user.user.id)) return res.redirect('/');
        res.render('admin/index', {
            settings,
            stats,
            user: req.user
        });
    });
app.get('/admin/bus', async (req, res) => {
        let stats = await statsModel.find();
        let settings = await settingsModel.findOne({ id: 'data' });
        
        if (!req.user) return res.redirect('/login');
        if(!settings.admins.includes(req.user.user.id)) return res.redirect('/');
        res.render('admin/bus', {
            settings,
            stats,
            user: req.user
        });
    });

// ------------------
//   API routes
// ------------------

app.get('/api/:bus', async (req, res) => {
    let statscount = await statsModel.findOne(
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

app.get('/api', async (req, res) => {
    let statscount = await statsModel.findOne(
        {
          id: 'all',
        });
	res.status(200).json({
                "curb": statscount.curb,
                "delay": statscount.delay,
                "skips": statscount.skips
	});
});

// ----------------------------
//   Authentication routes
// ----------------------------

app.get('/login', (req, res) => {
        res.redirect(config.oauthUrl);
    });
    
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
    
    app.get('/callback/discord', async (req, res) => {
        if(!req.query.code) {
            res.redirect('/');
        }
        try {
            let tokenRequest = await oauth.tokenRequest({
                code: req.query.code,
                scope: "identify email",
                grantType: "authorization_code",
            });
            req.session.user = {};
            req.session.user.token = tokenRequest.access_token;
            req.session.user.loggedIn = true;
            let user = await oauth.getUser(tokenRequest.access_token);
            req.session.user.user = user;
            res.redirect('/');
        } catch(e) {
            res.redirect('/');
            console.trace(e);
        }
    })

// Launch app on port
app.listen(port, () => console.log('\x1b[31m%s\x1b[0m', '[SERVER]', '\x1b[32m[WEB]\x1b[0m', `Connected @ localhost:${port}`));