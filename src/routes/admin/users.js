const express = require('express');
const routes = express.Router();
const SessionController = require('../../app/controllers/SessionController');
const UserController = require('../../app/controllers/UserController');

const SessionValidator = require('../../app/validators/session');

const { onlyUsers, isLoggedRedirectToRecipes } = require('../../app/middlewares/session');


// ROTAS LOGIN - SESSION
routes.get('/login', isLoggedRedirectToRecipes, SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.get('/logout', SessionController.logout);

routes.get('/forgot-password', SessionController.forgotForm);
routes.get('/password-reset', SessionController.resetForm);
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// // ROTAS USERS
// routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
// routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get("/admin/users/create", UserController.create);
routes.post('/admin/users', UserController.post) //Cadastrar um usuário
// routes.put('/admin/users', UserController.put) // Editar um usuário
// routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes;