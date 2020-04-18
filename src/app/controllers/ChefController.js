const Chef = require('../models/Chef');
const Recipe = require('../models/Recipe');
const File = require('../models/File');

//TODO
//dados dinâmicos no show
module.exports = {
    async index(req, res){
        let results = await Chef.allHasRecipes();
        let chefs = results.rows;

        for(let i=0; i < chefs.length; i++){
            results = await Chef.file(chefs[i].file_id);
            chefs[i].avatar = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }
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

        if(!req.file){
            return res.render('admin/chefs/create', {
                chef: req.body,
                error: 'Selecione um avatar!'
            });
        }

        let results = await File.create(req.file);

        req.body.file_id = results.rows[0].id;

        results = await Chef.create(req.body);

        return res.redirect(`/admin/chefs`);
    },
    async edit(req, res){
        let results = await Chef.findById(req.params.id);

        if(!results.rows.length > 0){
            return res.render('admin/chefs/create', {
                error: 'Chef não encontrado!'
            });
        }

        let chef = results.rows[0];
        results = await Chef.file(chef.file_id);
        chef.avatar = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;

        return res.render('admin/chefs/edit', { chef });
    },
    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "" && key != 'avatar') {
                return res.redirect(`admin/chefs/${req.body.id}/edit`, {
                    chef: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        if(!req.file){
            await Chef.update(req.body);
        }else{
            const results = await File.create(req.file);

            const oldFileId = req.body.file_id;
            req.body.file_id = results.rows[0].id;
            await Chef.update(req.body);

            await File.delete(oldFileId);
    
            return res.redirect(`/admin/chefs`);
        }


        return res.redirect(`/admin/chefs`);
    },
    async show(req, res){
        let results = await Chef.findById(req.params.id);
        let chef = results.rows[0];
        
        results = await Chef.file(chef.file_id);
        chef.avatar = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;

        results = await Chef.chefsRecipes(req.params.id);
        const recipes = results.rows;

        for(let i=0; i<recipes.length; i++){
            results = await Recipe.files(recipes[i].id);
            recipes[i].image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`; 
        }

        return res.render('admin/chefs/show', { chef, recipes });
    },
    async delete(req, res){
        await Chef.destroy(req.body.id);
        await File.delete(req.body.file_id);
        return res.redirect('/admin/chefs');
    }
}