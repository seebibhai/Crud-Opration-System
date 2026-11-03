const db = require('../config/db');

const User = {
    async getAll() {
        const result = await db.query('SELECT * FROM users ORDER BY id ASC');
        return result.rows;
    },

    async create(name, email) {
        const result = await db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return result.rows[0];
    },

    async update(id, name, email) {
        const result = await db.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        return result.rows[0];
    },

    async delete(id) {
        const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
};

module.exports = User;