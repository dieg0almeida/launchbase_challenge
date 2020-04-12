const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');

module.exports = {
    async index(req, res){
        const results = await Recipe.all();
        const recipes = results.rows;
        return res.render('site/index', { recipes });
    },
    async recipe(req, res){
        const id = req.query.id;
        const results = await Recipe.findById(id);
        const recipe = results.rows[0];
        return res.render('site/recipe', { recipe });
    },
    about(req, res){
        return res.render('site/about');
    },
    async recipes(req, res){
        const results = await Recipe.all();
        const recipes = results.rows;
        return res.render('site/recipes', { recipes });
    },
    async chefs(req, res){
        const results = await Chef.all();
        const chefs = results.rows;
        return res.render('site/chefs', { chefs });
    },
    async recipesSearch(req, res){
        const results = await Recipe.findBy(req.body.search);
        const recipes = results.rows;
        return res.render('site/recipes', { recipes, search: req.body.search });
    }
}