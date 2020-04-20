const db = require('../../config/db');

module.exports = {
    all(){
        return db.query(
            `SELECT recipes.*, chefs.name AS chef_name 
            FROM recipes JOIN chefs 
            ON (chefs.id = recipes.chef_id)`);
    },
    create(recipe) {
        const query = `INSERT INTO recipes 
        (
            title,
            chef_id,
            ingredients,
            preparation,
            information,
            user_id
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
            recipe.ingredients,
            recipe.preparation,
            recipe.information,
            recipe.user_id
        ];

        return db.query(query, values);
    },
    findById(id){
        return db.query(`SELECT recipes.*, chefs.name AS chef_name 
        FROM recipes JOIN chefs 
        ON (recipes.chef_id = chefs.id) 
        WHERE recipes.id = ${id}`);
    },
    update(recipe){

        const query = `UPDATE recipes SET
        title = $1,
        chef_id = $2,
        ingredients = $3,
        preparation = $4,
        information = $5
        WHERE id = $6`;

        const values = [
            recipe.title,
            recipe.chef_id,
            recipe.ingredients,
            recipe.preparation,
            recipe.information,
            recipe.id
        ]

        return db.query(query, values);
    },
    destroy(recipe_id){
        return db.query(`DELETE FROM recipes WHERE id = ${recipe_id}`);
    },
    findBy(search){
        return db.query(`
          SELECT recipes.*, chefs.name AS chef_name 
          FROM recipes JOIN chefs
          ON (chefs.id = recipes.chef_id)
          WHERE recipes.title ILIKE '%${search}%'`
        );
    },
    files(id){
        return db.query(
        `SELECT * FROM recipe_files JOIN files 
        ON recipe_files.file_id = files.id 
        WHERE recipe_files.recipe_id = ${id}`);
    }
}