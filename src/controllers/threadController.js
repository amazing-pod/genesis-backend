const threadModel = require("../models/threadModel");

const getAllThreads = async (req, res) => {
	try {
		const threads = await threadModel.getAllThreads();
		res.json(threads);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await threadModel.getAllPosts();
		res.json(posts);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getRepliesByPost = async (req, res) => {
	try {
		const replies = await threadModel.getRepliesByPost(req.params);
		res.json(replies);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const getThreadById = async (req, res) => {
	try {
		const thread = await threadModel.getThreadById(req.params);
		res.json(thread);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const createPost = async (req, res) => {
	try {
		const post = await threadModel.createPost(req.body);
		res.json(post);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const createThread = async (req, res) => {
	try {
		const thread = await threadModel.createThread(req.body);
		res.json(thread);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const likeThread = async (req, res) => {
	try {
		const thread = await threadModel.likeThread(req.params);
		res.json(thread);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const unlikeThread = async (req, res) => {
	try {
		const thread = await threadModel.unlikeThread(req.params);
		res.json(thread);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteThread = async (req, res) => {
	try {
		const thread = await threadModel.deleteThread(req.params);
		res.json(thread);
	} catch (error) {
		res.json({ error: error.message });
	}
};

// Home Routes
const getMostRecentPosts = async (req, res) => {
	try {
		const posts = await threadModel.getMostRecentPosts();
		res.json(posts);
	} catch (error) {
		res.json({ error: error.message });
	}
};

const deleteReply = async (req, res) => {
    try {
        const reply = await threadModel.deleteReply(req.params);
        res.json(reply);
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
	getAllThreads,
	getAllPosts,
	getRepliesByPost,
	getThreadById,
	createPost,
	createThread,
	likeThread,
	unlikeThread,
	deleteThread,
	getMostRecentPosts,
	deleteReply,
};
