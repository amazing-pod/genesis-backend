const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	getUserByUsername,
	signup,
	register,
	logIn,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:username", getUserByUsername);
router.post("/signup", signup);
router.post("/register", register);
router.post("/login", logIn);

module.exports = router;
