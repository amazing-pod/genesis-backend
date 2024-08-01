const express = require("express");
const router = express.Router();
const {
	getAllProjects,
	getProjectById,
	getIdeaById,
	createProject,
	createIdea,
	bulkCreateIdeas,
	addCollaborator,
	deleteProject,
	deleteIdea,
	bookmarkIdea,
	getBookmarkedIdeas,
	getProjectsByUserId,
	getMostFeasibleIdea,
	getEasiestIdea,
	getMostDifficultIdea,
	getMostImpactfulIdea,
	getHomeData,
} = require("../controllers/projectController");

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.get("/:id/ideas/:ideaId", getIdeaById);
router.post("/", createProject);
router.post("/:id/ideas", createIdea);
router.post("/:id/ideas/bulk", bulkCreateIdeas);
router.put("/:id/ideas/:ideaId", bookmarkIdea);
router.put("/collaborators", addCollaborator);
router.delete("/:id", deleteProject);
router.delete("/:id/ideas/:ideaId", deleteIdea);

// Get ideas by user
router.get("/owner/:ownerId", getProjectsByUserId);

// Routes for Home Page
router.get("/:id/mostFeasible", getMostFeasibleIdea);
router.get("/:id/easiestIdea", getEasiestIdea);
router.get("/:id/mostDifficult", getMostDifficultIdea);
router.get("/:id/mostImpactful", getMostImpactfulIdea);
router.get("/:id/bookmarkedIdeas", getBookmarkedIdeas);

// Get all home page data:
router.get("/:id/homeData", getHomeData);

module.exports = router;
