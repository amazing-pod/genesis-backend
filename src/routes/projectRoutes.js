const express = require("express");
const router = express.Router();
const {
	getAllProjects,
	getProjectById,
	createProject,
	deleteProject,
} = require("../controllers/projectController");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);
router.post("/", deleteProject);

module.exports = router;
