const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllThreads = async () => {
	return prisma.thread.findMany({
		include: {
			replies: true,
			tags: true,
		},
	});
};

const getAllPosts = async () => {
	return prisma.thread.findMany({
		where: {
			replyTo: null,
		},
		include: {
			replies: true,
			tags: true,
		},
	});
};

const getThreadById = async ({ id }) => {
	return prisma.thread.findMany({
		where: {
			id,
		},
		include: {
			replies: true,
			tags: true,
		},
	});
};

const createPost = async ({ title, authorId, content, category, tags }) => {
	return prisma.thread.create({
		data: {
			title,
			authorId,
			content,
			category,
			tags: {
				createMany: {
					data: tags,
				},
			},
		},
	});

	// await tags.forEach((tag) => {
	// 	prisma.tag.create({
	// 		data: {
	// 			name: tag.name,
	// 			threadId: thread.id,
	// 		},
	// 	});
	// });

	// return thread;
};

const createThread = async ({ authorId, content, replyToId }) => {
	const thread = await prisma.thread.findUnique({
		where: {
			id: replyToId,
		},
	});

	if (!thread) {
		throw new Error("Thread not found");
	}

	return prisma.thread.create({
		data: {
			authorId,
			content,
			replyToId,
			category: thread.category,
			tags: thread.tags,
		},
	});
};

const likeThread = async ({ threadId, userId }) => {
	return prisma.thread.update({
		where: {
			id: threadId,
		},
		data: {
			likeCount: {
				increment: 1,
			},
			likedBy: {
				connect: { id: userId },
			},
		},
	});
};

const unlikeThread = async ({ threadId, userId }) => {
	return prisma.thread.update({
		where: {
			id: threadId,
		},
		data: {
			likeCount: {
				decrement: 1,
			},
			likedBy: {
				disconnect: { id: userId },
			},
		},
	});
};

const deleteThread = async ({ id }) => {
	const thread = await prisma.thread.findUnique({
		where: {
			id,
		},
	});

	if (thread.replyTo === null) {
		return prisma.thread.delete({
			where: {
				id,
			},
		});
	} else {
		return prisma.thread.update({
			where: {
				id,
			},
			data: {
				deleted: !thread.deleted,
			},
		});
	}
};

module.exports = {
	getAllThreads,
	getAllPosts,
	getThreadById,
	createPost,
	createThread,
	likeThread,
	unlikeThread,
	deleteThread,
};