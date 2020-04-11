const db = require('../../config/db');

module.exports = {
    create(chef){
        const query = `INSERT INTO chefs
        (
            name,
            avatar_url
        )
        VALUES
        (
            $1,
            $2
        ) RETURNING id`;

        const values = [
            chef.name,
            chef.avatar_url
        ];

        return db.query(query, values);
    },
    findById(chef_id){
        return db.query(`SELECT * FROM chefs WHERE id = ${chef_id}`);
    },
    update(chef){
        const query = `UPDATE chefs SET
        name = $1,
        avatar_url = $2
        WHERE id = $3`;

        const values = [
            chef.name,
            chef.avatar_url,
            chef.id
        ];

        return db.query(query, values);
    }
}