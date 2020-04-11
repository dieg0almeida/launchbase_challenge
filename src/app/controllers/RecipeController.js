const Recipe = require('../models/Recipe');

//validar campos vazios
//retornar mensagem de erro para o front
//CSS da mensagem de erro

module.exports = {
    async index(req, res){
        const results = await Recipe.all();
        const recipes = results.rows;

        return res.render('admin/recipes/index', {recipes});
    },
    create(req, res){
        return res.render('admin/recipes/create');
    },
    async post(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                console.log("dsadd");
                return res.render('admin/recipes/create', {
                    recipe: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        const results = await Recipe.create(req.body);

        return res.redirect(`/admin/recipes/${results.rows[0].id}/edit`);
    },
    async edit(req, res){
        const results = await Recipe.findById(req.params.id);

        if(!results.rows.length > 0){
            return res.render('admin/recipes/create', {
                error: 'Receita não encontrada!'
            });
        }

        const recipe = results.rows[0];
        return res.render('admin/recipes/edit', { recipe });
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

        console.log(req.body);

        await Recipe.update(req.body);

        return res.redirect(`/admin/recipes/${req.body.id}`)
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