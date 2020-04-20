const User = require('../models/User');

module.exports = {
    async index(req, res){
        const results = await User.findById(req.session.userId);
        const user = results.rows[0];

        res.render('admin/users/profile', { user });
    },
    async put(req, res){
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/users/profile', {
                    user: req.body,
                    error: 'Preencha todos os campos!'
                });
            }
        }

        await User.updateProfile(req.body);

        return res.redirect('/admin/profile');
        
    }
}