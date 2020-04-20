const express = require('express');
const routes = express.Router();

const RecipeController = require('../../app/controllers/RecipeController');
const multer = require('../../app/middlewares/multer');

const { onlyUsers } = require('../../app/middlewares/session');
const { usersRecipe } = require('../../app/middlewares/user');

routes.get("/admin/recipes", onlyUsers, RecipeController.index);
routes.get("/admin/recipes/create", onlyUsers, RecipeController.create);
routes.get("/admin/recipes/:id", onlyUsers, RecipeController.show);
routes.get("/admin/recipes/:id/edit", onlyUsers, usersRecipe, RecipeController.edit);

routes.post("/admin/recipes", onlyUsers, usersRecipe, multer.array("photos", 5), RecipeController.post);
routes.put("/admin/recipes", onlyUsers, usersRecipe, multer.array("photos", 5), RecipeController.put);
routes.delete("/admin/recipes", onlyUsers, usersRecipe, RecipeController.delete);

module.exports = routes;