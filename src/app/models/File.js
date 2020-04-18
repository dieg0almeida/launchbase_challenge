const db = require('../../config/db');
const fs = require('fs');

module.exports = {
    create({ filename, path }) {
        const query = `INSERT INTO 
        files 
        (
            name, 
            path
        ) 
        VALUES 
        (
            $1,
            $2
        )
        RETURNING id`;

        const values = [
            filename,
            path
        ];

        return db.query(query, values);
    },
    async delete(id){
        try {
            const results = await db.query(`SELECT * FROM files WHERE id = ${id}`);
            const path = results.rows[0].path;

            fs.unlinkSync(path);

            return db.query(`DELETE FROM files WHERE id = ${id}`);
        } catch (error) {
            console.error(error);
        }
    }
}