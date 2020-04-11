const Chef = require('../models/Chef');

module.exports = {
    create(req, res){
        res.render('admin/chefs/create');
    },
    async post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/chefs/create', {
                    chef: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        const results = await Chef.create(req.body);

        const chef_id = results.rows[0].id;

        return res.send(`Usuário ${chef_id} cadastrado!`);
    },
    async edit(req, res){
        const results = await Chef.findById(req.params.id);

        if(!results.rows.length > 0){
            return res.render('admin/chefs/create', {
                error: 'Chef não encontrado!'
            });
        }

        const chef = results.rows[0];
        return res.render('admin/chefs/edit', { chef });
    },
    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render(`admin/chefs/${req.body.id}/edit`, {
                    chef: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        await Chef.update(req.body);

        return res.redirect(`/admin/chefs/${req.body.id}/edit`);
    }
}