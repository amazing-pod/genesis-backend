const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserChatHistory = async (conversationId, userId) => {
	return await prisma.chat.findMany({
		where: { conversationId, userId },
		orderBy: { createdAt: "asc" },
	});
};

const saveChatMessage = async (conversationId, prompt, response, userId) => {
	await prisma.chat.create({
		data: {
			conversationId,
			prompt,
			response,
			userId,
		},
	});
};

module.exports = {
	getUserChatHistory,
	saveChatMessage,
};
