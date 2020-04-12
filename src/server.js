const express = require('express');
const nunjucks = require('nunjucks');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
const server = express();
const routes = require('./routes/index');

server.set('view engine', 'njk');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(express.static('assets'));
server.use(methodOverride('_method'));
server.use(routes);

nunjucks.configure('./src/app/views', { express: server});

var port = process.env.PORT || 3333;
server.listen(port, function(){
    console.log('server is running!');
});