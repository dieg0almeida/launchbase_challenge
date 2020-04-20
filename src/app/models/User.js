const db = require('../../config/db');
const { hash } = require('bcryptjs');

module.exports = {
    all(){
        return db.query('SELECT * FROM users');
    },
    findOne(email) {
        const query = `SELECT * FROM users 
        WHERE email ILIKE '${email}'`;

        return db.query(query);
    },
    async create(user) {
        const query = `INSERT INTO users (
            name,
            email,
            password,
            is_admin
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id`;

        const passwordHash = await hash(user.password, 8);

        values = [
            user.name,
            user.email,
            passwordHash,
            user.is_admin
        ];

        console.log(values);

        return db.query(query, values);
    },
    findById(id) {
        const query = `SELECT * FROM users 
        WHERE id = ${id}`;

        return db.query(query);
    },
    update(user) {
        console.log(user);
        const query = `UPDATE users SET
        name = $1,
        email = $2
        WHERE id = $3
        `;

        const values = [
            user.name,
            user.email,
            user.id
        ];

        return db.query(query, values);
    },
    updateToken(user){
        const query = `UPDATE users SET
        reset_token = $1,
        reset_token_expires = $2
        WHERE id = $3
        `;

        const values = [
            user.reset_token,
            user.reset_token_expires,
            user.id
        ];

        return db.query(query, values);
    },
    updatePassword(user){
        const query = `UPDATE users SET
        password = $1,
        reset_token = $2,
        reset_token_expires = $3
        WHERE id = $4
        `;

        const values = [
            user.password,
            user.reset_token,
            user.reset_token_expires,
            user.id
        ];

        return db.query(query, values);
    },
    destroy(user_id){
        return db.query(`DELETE FROM users WHERE id = ${user_id}`);
    },
    async updateProfile(user){
        const query = `UPDATE users SET
        name = $1,
        email = $2,
        password = $3
        WHERE id = $4
        `;

        const passwordHash = await hash(user.password, 8);

        const values = [
            user.name,
            user.email,
            passwordHash,
            user.id
        ];

        return db.query(query, values);
    }
}