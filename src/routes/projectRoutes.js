const express = require("express");
const router = express.Router();
const {
	getAllProjects,
	getProjectById,
	getIdeaById,
	createProject,
	createIdea,
	addCollaborator,
	deleteProject,
	deleteIdea,
	getBookmarkedIdeas,
	getProjectsByUserId,
	getMostFeasibleIdea,
	getEasiestIdea,
	getMostDifficultIdea,
	getMostImpactfulIdea,
	
} = require("../controllers/projectController");
const { updateIdea } = require("../models/projectModel");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.get("/:id/ideas/:ideaId", getIdeaById);
router.get("/:id/ideas/bookmarkedIdeas", getBookmarkedIdeas);
router.post("/", createProject);
router.post("/:id", createIdea);
router.put("/:id/ideas/:ideaId", updateIdea);
router.put("/collaborators", addCollaborator);
router.delete("/:id", deleteProject);
router.delete("/:id/ideas/:ideaId", deleteIdea);

// Get ideas by user
router.get("/project/:id", getProjectsByUserId);

// Routes for Home Page
router.get("/project/:id/mostFeasible", getMostFeasibleIdea);
router.get("/project/:id/easiestIdea", getEasiestIdea);
router.get("/project/:id/mostDifficult", getMostDifficultIdea);
router.get("/project/:id/mostImpactful", getMostImpactfulIdea);


module.exports = router;
