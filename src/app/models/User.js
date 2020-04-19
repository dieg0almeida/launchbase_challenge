const db = require('../../config/db');
const { hash } = require('bcryptjs');

module.exports = {
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
    findLastInsert() {
        return db.query('SELECT id FROM launchstore.users order by id desc limit 1');
    },
    findById(id) {
        const query = `SELECT * FROM users 
        WHERE id = ${id}`;

        return db.query(query);
    },
    findByEmail(email) {
        const query = `SELECT * FROM users 
        WHERE email LIKE '${email}'`;

        return db.query(query);
    },
    update(user) {
        const query = `UPDATE users SET
        name = ?,
        email = ?,
        cpf_cnpj = ?,
        cep = ?,
        address = ?
        WHERE id = ?
        `;

        const values = [
            user.name,
            user.email,
            user.cpf_cnpj,
            user.cep,
            user.address,
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
    }
}