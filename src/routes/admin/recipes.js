const express = require('express');
const routes = express.Router();

const RecipeController = require('../../app/controllers/RecipeController');
const multer = require('../../app/middlewares/multer');

routes.get("/admin/recipes", RecipeController.index);
routes.get("/admin/recipes/create", RecipeController.create);
routes.get("/admin/recipes/:id", RecipeController.show);
routes.get("/admin/recipes/:id/edit", RecipeController.edit);

routes.post("/admin/recipes", multer.array("photos", 5), RecipeController.post);
routes.put("/admin/recipes", multer.array("photos", 5), RecipeController.put);
routes.delete("/admin/recipes", RecipeController.delete);

module.exports = routes;