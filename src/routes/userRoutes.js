const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	getUserByUsername,
	register,
	logIn,
	deleteUser,
	getUserById,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:username", getUserByUsername);
router.get("/id/:id", getUserById);
router.post("/register", register);
router.post("/login", logIn);
router.post("/delete", deleteUser);

module.exports = router;
