const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/threadController");

router.get("/", getAllThreads);
router.get("/posts", getAllPosts);
router.get("/:id/replies", getRepliesByPost);
router.get("/:id", getThreadById);
router.post("/posts", createPost);
router.post("/", createThread);
router.put("/:threadId/like/:userId", likeThread);
router.put("/:threadId/unlike/:userId", unlikeThread);
router.delete("/:id", deleteThread);

// Home-specific routes
router.get("/posts/mostRecentPosts", getMostRecentPosts);
module.exports = router;
