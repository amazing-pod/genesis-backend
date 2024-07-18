const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	getUserByUsername,
	register,
	logIn,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:username", getUserByUsername);
router.post("/register", register);
router.post("/login", logIn);

module.exports = router;
