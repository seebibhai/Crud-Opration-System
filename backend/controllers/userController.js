const User = require('../models/userModel');

const userController = {
    async getUsers(req, res, next) {
        try {
            const users = await User.getAll();
            res.status(200).json({ success: true, count: users.length, data: users });
        } catch (err) {
            next(err);
        }
    },

    async createUser(req, res, next) {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ success: false, error: 'Name and email are required.' });
            }

            const newUser = await User.create(name, email);
            res.status(201).json({ success: true, message: 'User created', data: newUser });
        } catch (err) {
            next(err);
        }
    },

    async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            const updatedUser = await User.update(id, name, email);
            if (!updatedUser) {
                return res.status(404).json({ success: false, error: 'User not found.' });
            }

            res.status(200).json({ success: true, message: 'User updated', data: updatedUser });
        } catch (err) {
            next(err);
        }
    },

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await User.delete(id);
            if (!deletedUser) {
                return res.status(404).json({ success: false, error: 'User not found.' });
            }

            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = userController;