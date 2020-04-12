const express = require('express');
const routes = express.Router();

const SiteController = require('../app/controllers/SiteController');

routes.get('/', SiteController.index);
routes.get('/recipe', SiteController.recipe);
routes.get('/about', SiteController.about);
routes.get('/recipes', SiteController.recipes);
routes.get('/chefs', SiteController.chefs);
routes.post('/recipes', SiteController.recipesSearch);

module.exports = routes;