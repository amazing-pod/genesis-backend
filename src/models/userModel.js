const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async () => {
	return prisma.user.findMany({
		include: {
			profile: true,
		},
	});
};

const getUserByUsername = async (username) => {
	return prisma.user.findUnique({
		where: {
			username,
		},
		include: {
			profile: true,
		},
	});
};

const createUser = async (username, clerkUserId) => {
	return prisma.user.create({
		data: {
			username,
			clerkUserId,
		},
	});
};

const deleteUser = async (clerkUserId) => {
	return prisma.user.create({
		where: {
			clerkUserId,
		},
	});
};

module.exports = { getAllUsers, getUserByUsername, createUser, deleteUser };
