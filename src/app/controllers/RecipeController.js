const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');


module.exports = {
    async index(req, res){
        const results = await Recipe.all();
        const recipes = results.rows;
        return res.render('admin/recipes/index', {recipes});
    },
    async create(req, res){
        const results = await Chef.all();
        const chefs = results.rows;
        return res.render('admin/recipes/create', { chefs });
    },
    async post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/recipes/create', {
                    recipe: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        const results = await Recipe.create(req.body);

        return res.redirect(`/admin/recipes`);
    },
    async edit(req, res){
        let results = await Recipe.findById(req.params.id);

        if(!results.rows.length > 0){
            return res.render('admin/recipes/create', {
                error: 'Receita não encontrada!'
            });
        }

        const recipe = results.rows[0];
        results = await Chef.all();
        const chefs = results.rows;
        return res.render('admin/recipes/edit', { recipe, chefs });
    },
    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/recipes/edit', {
                    recipe: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        await Recipe.update(req.body);

        return res.redirect(`/admin/recipes`)
    },
    async show(req, res){
        const results = await Recipe.findById(req.params.id);

        if(!results.rows.length > 0){
            return res.render('admin/recipes/create', {
                error: 'Receita não encontrada!'
            });
        }

        const recipe = results.rows[0];
        return res.render('admin/recipes/show', { recipe });
    },
    async delete(req, res){
        await Recipe.destroy(req.body.id);

        return res.redirect('/admin/recipes');
    }
}