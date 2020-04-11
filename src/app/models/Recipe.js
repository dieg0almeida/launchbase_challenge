const db = require('../../config/db');

module.exports = {
    all(){
        return db.query('SELECT * FROM recipes');
    },
    create(recipe) {
        const query = `INSERT INTO recipes 
        (
            title,
            chef_id,
            image,
            ingredients,
            preparation,
            information
        ) VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        ) RETURNING id`;

        const values = [
            recipe.title,
            recipe.chef_id,
            recipe.image,
            recipe.ingredients,
            recipe.preparation,
            recipe.information
        ];

        return db.query(query, values);
    },
    findById(id){
        return db.query(`SELECT * FROM recipes WHERE id = ${id}`);
    },
    update(recipe){

        const query = `UPDATE recipes SET
        title = $1,
        chef_id = $2,
        image = $3,
        ingredients = $4,
        preparation = $5,
        information = $6
        WHERE id = $7`;

        const values = [
            recipe.title,
            1,
            recipe.image,
            recipe.ingredients,
            recipe.preparation,
            recipe.information,
            recipe.id
        ]

        return db.query(query, values);
    },
    destroy(recipe_id){
        return db.query(`DELETE FROM recipes WHERE id = ${recipe_id}`);
    }
}