const { request } = require("express");
const User = require("./Modal")
const bcrypt = require('bcrypt');
const sequelize = require("../DB/Db_config");
const { QueryTypes } = require("sequelize");
const jwt = require('jsonwebtoken');

const index = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);


    } catch (error) {

    }
}


const store = async (req, res) => {
    try {
        const {
            user_type,
            user_name,
            user_addr,
            user_mob,
            user_emr_mob,
            user_email,
            user_pass,
            user_conf_pass,
            user_Aadhar,
            user_status
        } = req.body;

        // Check if passwords match
        if (user_pass !== user_conf_pass) {
            return res.status(400).json({ message: 'Passwords do not match', status: 0 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_pass, 10);
        const hashedConfirmPassword = await bcrypt.hash(user_conf_pass, 10);

        const existingUser = await User.findOne({ where: { user_email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', status: 0 });
        }


        await User.create({
            user_type: 1,
            user_name,
            user_addr,
            user_mob,
            user_emr_mob,
            user_email,
            user_pass: hashedPassword,
            user_conf_pass: hashedConfirmPassword,
            user_Aadhar,
            user_status
        });

        return res.status(200).json({ message: 'User added successfully...', status: 1 });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: 'An error occurred', status: 0 });
    }
};


const show = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error showing User by id:", error);
        res.status(500).json({ error: "Error showing User by id" });
    }
}


const updated = async (req, res) => {
    try {
        const { user_id, user_type, user_name, user_addr, user_mob, user_emr_mob, user_email, user_pass, user_conf_pass, user_Aadhar, user_status } = req.body;
        console.log(req.body);
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(user_pass, 10);
        const hashedConfirmPassword = await bcrypt.hash(user_conf_pass, 10);

        await user.update({
            user_type,
            user_name,
            user_addr,
            user_mob,
            user_emr_mob,
            user_email,
            user_pass: hashedPassword,
            user_conf_pass: hashedConfirmPassword,
            user_Aadhar,
            user_status
        })
        return res.json({ message: "User updated successfully!", status: 1 });
    } catch (error) {
        console.error("Error updating User:", error);
        res.status(500).json({ error: "Error updating User" });
    }
}

const deleted = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        return res.json({ message: "User deleted successfully!", status: 1 });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ error: "Error deleting User:" });
    }
}

const login = async (req, res) => {
    // console.log(req.body);
    try {
        const { user_email, user_pass } = req.body;
        const data = await sequelize.query(`SELECT * FROM tbl_users
            WHERE user_status=1 
            AND user_email=:user_email` , {
            replacements: { user_email },
            type: QueryTypes.SELECT
        }

        );
        if (!data) {
            return res.status(401).json({ error: "Inavlid email" });
        }
        const passwordMatch = await
            bcrypt.compare(user_pass, data[0].user_pass);

        if (!passwordMatch) {
            return res.status(401).json({ error: "inavlid Password" });
        }

        // return res.json(passwordMatch);

        const token = jwt.sign(
           { userId: data[0].user_id,
            email: data[0].user_email
           },
           "replace-with-a-strong-secret-key",
           {expiresIn: "1h"}
        );
        const user=data[0];
        res.json({token,user,authentication: true });
        // return res.json(data[0]);
    } catch (error) {

    }
}

module.exports = { index, store, show, updated, deleted, login };