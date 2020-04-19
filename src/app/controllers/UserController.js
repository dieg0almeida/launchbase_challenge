const User = require('../models/User');
const mailer = require('../../lib/mailer');
var generator = require('generate-password');

module.exports = {
    create(req, res){
        return res.render('admin/users/create');
    },
    async post(req, res){
        const keys = Object.keys(req.body);

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
    }
}