const express = require('express');
const recipes = require('./data');
const routes = express.Router();

const RecipeController = require('./app/controllers/RecipeController');
const ChefController = require('./app/controllers/ChefController');

//ROTAS DO Site
routes.get('/', function(req, res){
    return res.render('site/index', { items: recipes});
});

routes.get('/recipe', function(req, res){
    const id = req.query.id;

    return res.render('site/recipe', { item : recipes[id]});
});

routes.get('/about', function(req, res){
    return res.render('site/about');
});

routes.get('/recipes', function(req, res){
    return res.render('site/recipes', { items: recipes});
})

routes.get("/admin/recipes", RecipeController.index);
routes.get("/admin/recipes/create", RecipeController.create);
routes.get("/admin/recipes/:id", RecipeController.show);
routes.get("/admin/recipes/:id/edit", RecipeController.edit);

routes.post("/admin/recipes", RecipeController.post);
routes.put("/admin/recipes", RecipeController.put);
routes.delete("/admin/recipes", RecipeController.delete);

routes.get("/admin/chefs", ChefController.index);
routes.get("/admin/chefs/create", ChefController.create);
routes.get("/admin/chefs/:id", ChefController.show);
routes.get("/admin/chefs/:id/edit", ChefController.edit);

routes.post("/admin/chefs", ChefController.post);
routes.put("/admin/chefs", ChefController.put);
routes.delete("/admin/chefs", ChefController.delete);

module.exports = routes;