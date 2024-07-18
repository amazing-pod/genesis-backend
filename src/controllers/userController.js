const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
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

const signup = async (req, res) => {
	try {
		const { username, clerkUserId } = req.body;
		const user = await userModel.createUser(username, clerkUserId);
		res.json(user);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const register = async (req, res) => {
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
	if (!WEBHOOK_SECRET) {
		throw new Error("You need a WEBHOOK_SECRET in your .env");
	}

	const headers = req.headers;
	const payload = JSON.stringify(req.body);
	const svix_id = headers["svix-id"];
	const svix_timestamp = headers["svix-timestamp"];
	const svix_signature = headers["svix-signature"];
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return res.json({ error: "No svix headers" });
	}
	const webhook = new Webhook(WEBHOOK_SECRET);

	let event;

	try {
		event = webhook.verify(payload, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		});
	} catch (error) {
		console.log("Error verifying webhook:", error.message);
		return res.json({
			success: false,
			message: error.message,
		});
	}

	const { username, id } = event.data;
	const eventType = event.type;
	console.log(`Webhook type: ${eventType}`);
	console.log("Webhook body:", event.data);

	try {
		const user = await userModel.createUser(username, id);
		console.log("User created");
		return res.json({
			success: true,
			message: "Webhook received",
			user: user,
		});
	} catch (error) {
		return res.json({ error: error.message });
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
	signup,
	register,
	logIn,
};
