function onlyUsers(req, res, next) {
    if(!req.session.userId){
        return res.redirect('/login');
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