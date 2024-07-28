const projectModel = require("../models/projectModel");

const getAllProjects = async (req, res) => {
	try {
		const projects = await projectModel.getAllProjects();
		res.json(projects);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getProjectById = async (req, res) => {
	try {
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

const updateIdea = async (req, res) => {
	try {
		const idea = await projectModel.updateIdea(req.params, req.body);
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
		const idea = await projectModel.createIdea(req.params);
		res.json(idea);
	} catch (error) {
		res.json({ error: error.message });
	}
};

module.exports = {
	getAllProjects,
	getProjectById,
	getIdeaById,
	createProject,
	addCollaborator,
	createIdea,
	updateIdea,
	deleteProject,
	deleteIdea,
};
