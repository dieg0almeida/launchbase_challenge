const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');
const File = require('../models/File');
RecipeFile = require('../models/RecipeFile');

module.exports = {
    async index(req, res) {
        let results = await Recipe.all();
        let recipes = results.rows;

        for (let i = 0; i < recipes.length; i++) {
            results = await Recipe.files(recipes[i].id);
            recipes[i].image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }

        return res.render('admin/recipes/index', { recipes });
    },
    async create(req, res) {
        const results = await Chef.all();
        const chefs = results.rows;
        return res.render('admin/recipes/create', { chefs });
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/recipes/create', {
                    recipe: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        let results = await Recipe.create(req.body);
        const recipe_id = results.rows[0].id;
        const filesPromise = req.files.map(file => File.create(file));

        results = await Promise.all(filesPromise);
        let recipeFilesPromise = [];
        for (let i = 0; i < results.length; i++) {
            recipeFilesPromise.push(RecipeFile.create(recipe_id, results[i].rows[0].id));
        }

        await Promise.all(recipeFilesPromise);

        return res.redirect(`/admin/recipes`);
    },
    async edit(req, res) {
        let results = await Recipe.findById(req.params.id);

        if (!results.rows.length > 0) {
            return res.render('admin/recipes/create', {
                error: 'Receita não encontrada!'
            });
        }

        const recipe = results.rows[0];

        results = await Chef.all();
        const chefs = results.rows;

        results = await Recipe.files(req.params.id);

        let files = results.rows;

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        return res.render('admin/recipes/edit', { recipe, chefs, files });
    },
    async put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.render('admin/recipes/edit', {
                    recipe: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        if (req.files.length != 0) {
            const newFilesPromise = req.files.map(file => File.create(file));

            results = await Promise.all(newFilesPromise);
            let recipeFilesPromise = [];
            for (let i = 0; i < results.length; i++) {
                recipeFilesPromise.push(RecipeFile.create(req.body.id, results[i].rows[0].id));
            }

            await Promise.all(recipeFilesPromise);
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",");
            const lastIndex = removedFiles.length - 1;

            removedFiles.splice(lastIndex, 1);

            const removedFilesPromise = removedFiles.map(id => File.delete(id));

            await Promise.all(removedFilesPromise);
        }

        await Recipe.update(req.body);

        return res.redirect(`/admin/recipes`)
    },
    async show(req, res) {
        let results = await Recipe.findById(req.params.id);

        if (!results.rows.length > 0) {
            return res.render('admin/recipes/create', {
                error: 'Receita não encontrada!'
            });
        }

        const recipe = results.rows[0];

        results = await Recipe.files(req.params.id);

        let files = results.rows;

        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        return res.render('admin/recipes/show', { recipe, files });
    },
    async delete(req, res) {
        try {
            let results = await Recipe.files(req.body.id);
            console.log(results.rows[0].file_id);
            const removedFilesPromise = results.rows.map(recipe => File.delete(recipe.file_id));

            await Promise.all(removedFilesPromise);

            await Recipe.destroy(req.body.id);
        } catch (error) {
            console.error(error);
        }

        return res.redirect('/admin/recipes');
    }
}