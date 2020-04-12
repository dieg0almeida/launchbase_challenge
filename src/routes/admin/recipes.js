const express = require('express');
const routes = express.Router();

const RecipeController = require('../../app/controllers/RecipeController');

routes.get("/admin/recipes", RecipeController.index);
routes.get("/admin/recipes/create", RecipeController.create);
routes.get("/admin/recipes/:id", RecipeController.show);
routes.get("/admin/recipes/:id/edit", RecipeController.edit);

routes.post("/admin/recipes", RecipeController.post);
routes.put("/admin/recipes", RecipeController.put);
routes.delete("/admin/recipes", RecipeController.delete);

module.exports = routes;