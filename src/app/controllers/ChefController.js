const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');

//TODO
//dados dinâmicos no show
module.exports = {
    async index(req, res){
        const results = await Chef.all();
        const chefs = results.rows;
        return res.render('admin/chefs/index', { chefs });
    },
    create(req, res){
        return res.render('admin/chefs/create');
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

        return res.redirect(`/admin/chefs`);
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

        return res.redirect(`/admin/chefs`);
    },
    async show(req, res){
        let results = await Chef.findById(req.params.id);
        const chef = results.rows[0];
        results = await Chef.chefsRecipes(req.params.id);
        const recipes = results.rows;
        return res.render('admin/chefs/show', { chef, recipes });
    },
    async delete(req, res){
        await Chef.destroy(req.body.id);
        return res.redirect('/admin/chefs');
    }
}