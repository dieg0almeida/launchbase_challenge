const express = require('express');
const routes = express.Router();

const chefs = require('./admin/chefs');
const recipes = require('./admin/recipes');
const site = require('./site');


routes.use(chefs);
routes.use(recipes);
routes.use(site);


module.exports = routes;