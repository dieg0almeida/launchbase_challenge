const express = require('express');
const routes = express.Router();

const ChefController = require('../../app/controllers/ChefController');

routes.get("/admin/chefs", ChefController.index);
routes.get("/admin/chefs/create", ChefController.create);
routes.get("/admin/chefs/:id", ChefController.show);
routes.get("/admin/chefs/:id/edit", ChefController.edit);

routes.post("/admin/chefs", ChefController.post);
routes.put("/admin/chefs", ChefController.put);
routes.delete("/admin/chefs", ChefController.delete);

module.exports = routes;