const express = require('express');
const routes = express.Router();
const SessionController = require('../../app/controllers/SessionController');
const UserController = require('../../app/controllers/UserController');
const ProfileController = require('../../app/controllers/ProfileController');

const SessionValidator = require('../../app/validators/session');

const { onlyUsers, isLoggedRedirectToRecipes } = require('../../app/middlewares/session');
const { isAdmin, deleteUser } = require('../../app/middlewares/user');


// ROTAS LOGIN - SESSION
routes.get('/login', isLoggedRedirectToRecipes, SessionController.loginForm);
routes.post('/login', SessionValidator.login, SessionController.login);
routes.get('/logout', SessionController.logout);

routes.get('/forgot-password', SessionController.forgotForm);
routes.get('/password-reset', SessionController.resetForm);
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot);
routes.post('/password-reset', SessionValidator.reset, SessionController.reset);

// // ROTAS USERS
routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// // Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/admin/users', onlyUsers, isAdmin, UserController.list); //Mostrar a lista de usuários cadastrados
routes.get('/admin/users/create',  onlyUsers, isAdmin, UserController.create);
routes.post('/admin/users', onlyUsers, isAdmin, UserController.post); //Cadastrar um usuário
routes.get('/admin/users/:id/edit', onlyUsers, isAdmin, UserController.edit);
routes.put('/admin/users', onlyUsers, isAdmin, UserController.put); // Editar um usuário
routes.delete('/admin/users', onlyUsers, isAdmin, deleteUser, UserController.delete); // Deletar um usuário

module.exports = routes;