const User = require('../models/User');
const mailer = require('../../lib/mailer');
var generator = require('generate-password');

module.exports = {
    async list(req, res){
        const results = await User.all();
        const users = results.rows;
        res.render('admin/users/index', { users });
    },
    create(req, res){
        return res.render('admin/users/create');
    },
    async post(req, res){
        const keys = Object.keys(req.body);
        console.log(req.body.is_admin);
        for (key of keys) {
            if (req.body[key] == "" && key != "is_admin") {
                return res.render('admin/users/create', {
                    user: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        if(!req.body.is_admin){
            req.body.is_admin = false;
        }

        const password = generator.generate({length: 8, numbers: true});
        req.body.password = password;

        const results = await User.create(req.body);

        await mailer.sendMail({
            from: 'no-reply@foodfy.com',
            to: req.body.email,
            subject: 'Novo Usuário foodfy',
            html: `<h2>Parabéns ${req.body.name}</h2>
        <p>Você agora é um usuário cadastrado no Foodfy. Os seus dados de acesso estão logo abaixo</p>
        
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Senha:</b> ${password}</p>
        <p>
          <a href="http://localhost:5000/login" target="_blank">
            FAZER LOGIN
          </a>
        </p>`
        });

        return res.render('admin/users/create');
    },
    async edit(req, res){
        let results = await User.findById(req.params.id);

        if (!results.rows.length > 0) {
            return res.render('admin/users/index', {
                error: 'Usuário não encontrado!'
            });
        }

        const user = results.rows[0];

        return res.render('admin/users/edit', {user});
    },
    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "" && key != "is_admin") {
                return res.render('admin/users/edit', {
                    user: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        if(!req.body.is_admin){
            req.body.is_admin = false;
        }

        const results = await User.update(req.body);

        res.redirect(`/admin/users/${req.body.id}/edit`);
    },
    async delete(req, res){
        await User.destroy(req.body.id);

        return res.redirect('/admin/users');
    }
}