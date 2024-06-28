const express = require('express');
const Login = require('./Modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // Replace with your actual secret key


const generateToken = (user_email) => {
    return jwt.sign({ email: user_email }, secretKey, { expiresIn: '1h' });
};

const index = async (req, res) => {
    try {
        const logins = await Login.findAll();

        const usersWithTokens = logins.map(login => {
            const token = generateToken(login.user_email);
            return {
                ...login.toJSON(),
                token
            };
        });

        res.json(usersWithTokens);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'An error occurred', status: 0 });
    }
};

const store = async (req, res) => {
    try {
        const { user_email, user_pass, user_conf_pass, user_status } = req.body;

        // Check if passwords match
        if (user_pass !== user_conf_pass) {
            return res.status(400).json({ message: 'Passwords do not match', status: 0 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_pass, 10);

        const existingUser = await Login.findOne({ where: { user_email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', status: 0 });
        }

        await Login.create({
            user_email,
            user_pass: hashedPassword,
            user_status
        });

        return res.status(200).json({ message: 'Login successfully...', status: 1 });
    } catch (error) {
        console.error("Error Login user:", error);
        return res.status(500).json({ message: 'An error occurred', status: 0 });
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const login = await Login.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(login);
    } catch (error) {
        console.error("Error showing user by ID:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

const updated = async (req, res) => {
    try {
        const { login_id, user_email, user_pass, user_status } = req.body;
        const login = await Login.findByPk(login_id);
        if (!login) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(user_pass, 10);

        await login.update({
            user_email,
            user_pass: hashedPassword,
            user_status
        });

        return res.json({ message: "User updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const login = await Login.findByPk(id);
        if (!login) {
            return res.status(404).json({ message: "User not found" });
        }
        await login.destroy();
        return res.json({ message: "User deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "An error occurred" });
    }
};





module.exports = { index, store, show, updated, deleted, generateToken };
