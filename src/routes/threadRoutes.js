const express = require("express");
const router = express.Router();
const {
	getAllThreads,
	getAllPosts,
	getThreadById,
	createPost,
	createThread,
	likeThread,
	unlikeThread,
	deleteThread,
} = require("../controllers/threadController");

router.get("/", getAllThreads);
router.get("/posts", getAllPosts);
router.get("/:id", getThreadById);
router.post("/posts", createPost);
router.post("/", createThread);
router.put("/:threadId/like/:userId", likeThread);
router.put("/:threadId/unlike/:userId", unlikeThread);
router.delete("/:id", deleteThread);

module.exports = router;
