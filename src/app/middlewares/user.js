const User = require('../models/User');
const Recipe = require('../models/Recipe');

module.exports = {
    async  isAdmin(req, res, next){
        const results = await User.findById(req.session.userId);
        const user = results.rows[0];
        if(!user.is_admin){
            return res.render('admin/users/profile', { user, error: 'Apenas administradores pode acessar este recurso.' });
        }

        next();
    },
    async  usersRecipe(req, res, next){
        console.log(req.params.id);
        let results = await User.findById(req.session.userId);
        const user = results.rows[0];
        if(req.params.id){
            results = await Recipe.findById(req.params.id);
        }else{
            results = await Recipe.findById(req.body.id);
        }
        
        const recipe = results.rows[0];

        if(recipe.user_id != req.session.userId && !user.is_admin){
            return res.send('Você não pode editar ou deletar receitas de outro usuário');
        }

        next();
    },
    async deleteUser(req, res, next){
        console.log(req.body);
        const results = await User.findById(req.body.id);
        const user = results.rows[0];
        console.log(`delete: ${user.is_admin}`);
        if(user.is_admin){
            return res.send('Administradores não podem deletar sua própria conta! Entre em contato com o suporte!');
        }

        req.body = user;

        next();
    }
}
