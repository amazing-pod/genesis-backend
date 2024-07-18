const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const { Webhook } = require("svix");

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.getAllUsers();
		res.json(users);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getUserByUsername = async (req, res) => {
	try {
		const user = await userModel.getUserByUsername(req.params);
		res.json(user);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const register = async (req, res) => {
	try {
		const payload = req.body;
		const headers = req.headers;
		const webhook = new Webhook(process.env.SIGNING_SECRET);
		console.log(webhook);
		const event = webhook.verify(payload, headers);
		console.log(event);
		const { username, id } = event.data;
		const user = await userModel.createUser(
			username,
			email_addresses,
			created_at,
			updated_at,
			id
		);
		res.json(user);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const logIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await userModel.getUserByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ userId: user.id, username: user.username },
				process.env.JWT_SECRET
			);
			res.status(200).json({ token });
		} else {
			throw new Error("Invalid credentials");
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllUsers,
	getUserByUsername,
	register,
	logIn,
};
