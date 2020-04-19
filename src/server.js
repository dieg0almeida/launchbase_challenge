const express = require('express');
const nunjucks = require('nunjucks');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const session = require('./config/session');

const server = express();

server.use(session);
server.use((req, res, next) => {
    res.locals.session = req.session
    next()
});

server.set('view engine', 'njk');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(express.static('assets'));
server.use(methodOverride('_method'));
server.use(routes);

nunjucks.configure('./src/app/views', { express: server});

var port = process.env.PORT || 5000;
server.listen(5000, function(){
    console.log('server is running!');
});