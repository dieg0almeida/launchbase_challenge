const db = require('../../config/db');

module.exports = {
    all(){
        return db.query(`SELECT * FROM chefs`);
    },
    allHasRecipes(){
        return db.query(`SELECT chefs.*, count(recipes.id) as recipes_count 
        FROM chefs JOIN recipes 
        ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`);
    },
    create(chef){
        const query = `INSERT INTO chefs
        (
            name,
            file_id
        )
        VALUES
        (
            $1,
            $2
        ) RETURNING id`;

        const values = [
            chef.name,
            chef.file_id
        ];

        return db.query(query, values);
    },
    findById(chef_id){
        return db.query(`SELECT * FROM chefs WHERE id = ${chef_id}`);
    },
    chefsRecipes(chef_id){
        return db.query(`SELECT * FROM recipes WHERE chef_id = ${chef_id}`);
    },
    update(chef){
        const query = `UPDATE chefs SET
        name = $1,
        file_id = $2
        WHERE id = $3`;

        const values = [
            chef.name,
            chef.file_id,
            chef.id
        ];

        return db.query(query, values);
    },
    destroy(chef_id){
        return db.query(`DELETE FROM chefs WHERE id = ${chef_id}`);
    },
    file(file_id){
        return db.query(`SELECT * FROM files WHERE id = ${file_id}`);
    }
}