const projectModel = require("../models/projectModel");
const threadModel = require("../models/threadModel");

const getAllProjects = async (req, res) => {
	try {
		const projects = await projectModel.getAllProjects();
		res.json(projects);
	} catch (error) {
		res.json({ error: error.message });
	}
};

// New route to get projects by a specific user
const getProjectsByUserId = async (req, res) => {
	try {
		const projects = await projectModel.getProjectsByUserId(req.params);
		res.json(projects);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getProjectById = async (req, res) => {
	try {
		console.log("ID", req.params);
		const project = await projectModel.getProjectById(req.params);
		res.json(project);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getIdeaById = async (req, res) => {
	try {
		const idea = await projectModel.getIdeaById(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const createProject = async (req, res) => {
	try {
		const project = await projectModel.createProject(req.body);
		res.json(project);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const addCollaborator = async (req, res) => {
	try {
		const project = await projectModel.addCollaborator(req.params, req.body);
		res.json(project);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const createIdea = async (req, res) => {
	try {
		const idea = await projectModel.createIdea(req.params, req.body);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const bulkCreateIdeas = async (req, res) => {
	try {
		const ideas = await projectModel.bulkCreateIdeas(req.params, req.body);
		res.json(ideas);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const updateIdea = async (req, res) => {
	try {
		const idea = await projectModel.updateIdea(req.params, req.body);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const bookmarkIdea = async (req, res) => {
	try {
		const idea = await projectModel.bookmarkIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteProject = async (req, res) => {
	try {
		const project = await projectModel.deleteProject(req.params);
		res.json(project);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteIdea = async (req, res) => {
	try {
		const idea = await projectModel.deleteIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

// Home Routes:
const getMostFeasibleIdea = async (req, res) => {
	try {
		const idea = await projectModel.getMostFeasibleIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getEasiestIdea = async (req, res) => {
	try {
		const idea = await projectModel.getEasiestIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getMostDifficultIdea = async (req, res) => {
	try {
		const idea = await projectModel.getMostDifficultIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getMostImpactfulIdea = async (req, res) => {
	try {
		const idea = await projectModel.getMostImpactfulIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getBookmarkedIdeas = async (req, res) => {
	try {
		const bookmarkedIdeas = await projectModel.getBookmarkedIdeas(req.params);
		res.json(bookmarkedIdeas);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getHomeData = async (req, res) => {
	try {
		// Fetch data from the respective functions
		const mostFeasibleIdea = await projectModel.getMostFeasibleIdea(req.params);
		const easiestIdea = await projectModel.getEasiestIdea(req.params);
		const mostDifficultIdea = await projectModel.getMostDifficultIdea(
			req.params
		);
		const mostImpactfulIdea = await projectModel.getMostImpactfulIdea(
			req.params
		);
		const bookmarkedIdeas = await projectModel.getBookmarkedIdeas(req.params);
		const mostRecentPosts = await threadModel.getMostRecentPosts();

		// Aggregate the data into an array
		const homeData = [
			{ mostFeasibleIdea: mostFeasibleIdea },
			{ easiestIdea: easiestIdea },
			{ mostDifficulIdea: mostDifficultIdea },
			{ mostImpactfulIdea: mostImpactfulIdea },
			{ bookmarkedIdeas: bookmarkedIdeas },
			{ mostRecentPosts: mostRecentPosts },
		];

		res.json(homeData);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllProjects,
	getProjectById,
	getIdeaById,
	createProject,
	addCollaborator,
	createIdea,
	bulkCreateIdeas,
	updateIdea,
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
};
