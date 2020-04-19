// const User = require('../models/User');
// const { compare } = require('bcryptjs');

// function checkAllFields(body) {
//     const keys = Object.keys(body);

//     for (key of keys) {
//         if (body[key] == "") {
//             return {
//                 error: "Preencha todos os campos!",
//                 user: body
//             }
//         }
//     }
// }

// module.exports = {
//     async post(req, res, next) {

//         const fillAllFields = checkAllFields(req.body);

//         if(fillAllFields) return res.render('user/register', fillAllFields);

//         let { email, cpf_cnpj, password, passwordRepeat } = req.body;

//         cpf_cnpj = cpf_cnpj.replace(/\D/g, "");

//         if (password != passwordRepeat) {
//             return res.render('user/register', {
//                 error: "As senhas não coincidem!",
//                 user: req.body
//             });
//         }

//         const results = await User.findOne(email, cpf_cnpj);

//         if (results[0].length > 0) {
//             return res.render('user/register', {
//                 error: "Usuário já cadastrado!",
//                 user: req.body
//             });
//         }

//         next();


//     },
//     async show(req, res, next) {
//         const { userId } = req.session;

//         const results = await User.findById(userId);

//         if (!results[0].length > 0) {
//             return res.render('user/register', {
//                 error: "Usuário não encontrado!"
//             })
//         }

//         const user = results[0][0];

//         req.user = user;

//         console.log(req.user);
//         next();
//     },
//     async update(req, res, next) {
//         const fillAllFields = checkAllFields(req.body);

//         if(fillAllFields){
//             return res.render('user/index', fillAllFields);
//         }

//         const { id, password } = req.body;

//         if(!password){
//             return res.render('user/index', {
//                 user: req.body,
//                 error: "Informe sua senha para atualizar!"
//             });    
//         }
//         const results = await User.findById(id);

//         const user = results[0][0];

//         const passed = await compare(password, user.password);

//         if(!passed){
//             return res.render('user/index', {
//                 user: req.body,
//                 error: "Senha incorreta!"
//             }); 
//         }

//         req.user = user;

//         next()
//     }
// }