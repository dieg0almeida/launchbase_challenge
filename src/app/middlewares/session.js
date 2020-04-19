function onlyUsers(req, res, next) {
    if(!req.session.userId){
        return res.redirect('/user/login');
    }

    next();
}

function isLoggedRedirectToRecipes(req, res, next) {
    if(req.session.userId){
        return res.redirect('/admin/recipes');
    }

    next();
}

module.exports = {
    onlyUsers,
    isLoggedRedirectToRecipes
}