const User = require('../models/User');
const { compare } = require('bcryptjs');

module.exports = {
    async login(req, res, next){
        const { email, password } = req.body;

        const results = await User.findOne(email);

        if (!results.rows.length > 0) {
            return res.render('admin/session/login', {
                user: req.body,
                error: "Usuário não encontrado!"
            })
        }

        const user = results.rows[0];

        const passed = await compare(password, user.password);

        if(!passed){
            return res.render('admin/session/login', {
                user: req.body,
                error: "Senha incorreta!"
            }); 
        }

        req.user = user;

        next()
    },
    async forgot(req, res, next){
        const { email } = req.body;

        try {
            const results = await User.findOne(email);

            if(!results.rows.length > 0){
                return res.render('admin/session/forgot-password', {
                    error: "Email não cadastrado!",
                    user: req.body
                });
            }

            const user = results.rows[0];

            req.user = user;

            next();

        } catch (error) {
            console.error(error);
            res.render('admin/session/forgot-password', {
                error: "Algo deu errado!",
                user: req.body
            });
        }
    },
    async reset(req, res, next){
        const { email, password, passwordRepeat, token } = req.body;

        const results = await User.findOne(email);

        if(!results.rows.length > 0){
            return res.render('admin/session/password-reset', {
                user: req.body,
                token,
                error: "Usuário não encontrado!"
            });
        }

        if (password != passwordRepeat) {
            return res.render('admin/session/password-reset', {
                error: "As senhas não coincidem!",
                token,
                user: req.body
            });
        }

        const user = results.rows[0];

        if(token != user.reset_token) {
            return res.render('admin/session/password-reset', {
                error: "Algo deu errado. Solitice um novo link para recuperação de senha!",
                user: req.body
            });
        }

        let now = new Date();
        now = now.setHours(now.getHours());

        if(now > user.reset_token_expire ){
            return res.render('admin/session/password-reset', {
                error: "Algo deu errado. Solitice um novo link para recuperação de senha!",
                user: req.body
            });
        }

        req.user = user;

        next();
    }
}