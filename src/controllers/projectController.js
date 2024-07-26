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

const createProject = async (req, res) => {
	try {
		const project = await projectModel.createProject(req.body);
		res.json(project);
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

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	deleteProject,
};
