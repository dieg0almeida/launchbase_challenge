const express = require('express');
const routes = express.Router();

const ChefController = require('../../app/controllers/ChefController');
const multer = require('../../app/middlewares/multer');

const { onlyUsers } = require('../../app/middlewares/session');
const { isAdmin } = require('../../app/middlewares/user');

routes.get("/admin/chefs", onlyUsers, ChefController.index);
routes.get("/admin/chefs/create", onlyUsers, isAdmin, ChefController.create);
routes.get("/admin/chefs/:id", onlyUsers, isAdmin, ChefController.show);
routes.get("/admin/chefs/:id/edit", onlyUsers, isAdmin, ChefController.edit);

routes.post("/admin/chefs", onlyUsers, isAdmin, multer.single("avatar"), ChefController.post);
routes.put("/admin/chefs", onlyUsers, isAdmin, multer.single("avatar"), ChefController.put);
routes.delete("/admin/chefs", onlyUsers, isAdmin, ChefController.delete);

module.exports = routes;