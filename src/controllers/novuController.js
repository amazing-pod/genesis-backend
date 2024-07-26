const userModel = require("../models/userModel");

const identifySubscribers = async (req, res) => {
	try {
		const users = await userModel.getAllUsers();

		const promises = users.map((user) =>
			novu.subscribers.identify(user.id, {
				email: user.email,
				firstName: user.profile.firstName,
				lastName: user.profile.lastName,
				// Add any other required fields
			})
		);

		await Promise.all(promises);

		res.json({ message: "All subscribers identified/created successfully" });
	} catch (error) {
		console.error("Error identifying/creating subscribers:", error);
		res.status(500).json({ error: "Failed to identify or create subscribers" });
	}
};

const getSubscriber = async (req, res) => {
	const user = req.user; // Assume user data is attached to req object after authentication

	if (!user) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		await novu.subscribers.identify(user.id, {
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			avatar: user.avatar,
			locale: user.locale,
			data: { customKey1: "customVal1", customKey2: "customVal2" },
		});

		res.json({ subscriberId: user.id });
	} catch (error) {
		console.error("Error identifying/creating subscriber:", error);
		res.status(500).json({ error: "Failed to identify or create subscriber" });
	}
};

module.exports = { identifySubscribers, getSubscriber };
