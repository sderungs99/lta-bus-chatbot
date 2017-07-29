const
    express = require('express'),
    bodyParser = require('body-parser'),
    config = require('config'),
    crypto = require('crypto'),
    request = require('request');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json({ verify: verifyRequestSignature }));
app.use(express.static('public'));

//config values
const APP_SECRET = (process.env.FB_APP_SECRET) ?
    process.env.FB_APP_SECRET :
    config.get('appSecret');

const VALIDATION_TOKEN = (process.env.FB_VERIFY_TOKEN) ?
    (process.env.FB_VERIFY_TOKEN) :
    config.get('validationToken');

const PAGE_ACCESS_TOKEN = (process.env.FB_ACCESS_TOKEN) ?
    (process.env.FB_ACCESS_TOKEN) :
    config.get('pageAccessToken');

if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {
    console.error("Missing config values");
    process.exit(1);
}

app.get('/', function (req, res) {
    res.send('Hello World');
});