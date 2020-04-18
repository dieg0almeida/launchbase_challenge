const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
    async index(req, res){
        let results = await Recipe.all();
        let recipes = results.rows;

        for (let i = 0; i < recipes.length; i++) {
            results = await Recipe.files(recipes[i].id);
            recipes[i].image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }

        return res.render('site/index', { recipes });
    },
    async recipe(req, res){
        const id = req.query.id;
        let results = await Recipe.findById(id);
        let recipe = results.rows[0];
        results = await Recipe.files(id);
        recipe.image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        return res.render('site/recipe', { recipe });
    },
    about(req, res){
        return res.render('site/about');
    },
    async recipes(req, res){
        let results = await Recipe.all();
        let recipes = results.rows;

        for (let i = 0; i < recipes.length; i++) {
            results = await Recipe.files(recipes[i].id);
            recipes[i].image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }

        return res.render('site/recipes', { recipes });
    },
    async chefs(req, res){
        let results = await Chef.allHasRecipes();
        let chefs = results.rows;

        for(let i=0; i < chefs.length; i++){
            results = await Chef.file(chefs[i].file_id);
            chefs[i].avatar = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }
        return res.render('site/chefs', { chefs });
    },
    async recipesSearch(req, res){
        let results = await Recipe.findBy(req.body.search);
        let recipes = results.rows;

        for (let i = 0; i < recipes.length; i++) {
            results = await Recipe.files(recipes[i].id);
            recipes[i].image = `${req.protocol}://${req.headers.host}${results.rows[0].path.replace("public", "")}`;
        }
        return res.render('site/recipes', { recipes, search: req.body.search });
    }
}