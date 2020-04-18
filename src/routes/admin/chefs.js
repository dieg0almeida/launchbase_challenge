const express = require('express');
const routes = express.Router();

const ChefController = require('../../app/controllers/ChefController');
const multer = require('../../app/middlewares/multer');

routes.get("/admin/chefs", ChefController.index);
routes.get("/admin/chefs/create", ChefController.create);
routes.get("/admin/chefs/:id", ChefController.show);
routes.get("/admin/chefs/:id/edit", ChefController.edit);

routes.post("/admin/chefs", multer.single("avatar"), ChefController.post);
routes.put("/admin/chefs", multer.single("avatar"), ChefController.put);
routes.delete("/admin/chefs", ChefController.delete);

module.exports = routes;