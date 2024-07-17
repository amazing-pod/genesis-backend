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

const createUser = async (
	username,
	emails,
	createdAt,
	updatedAt,
	clerkUserId
) => {
	return prisma.user.create({
		data: {
			username,
			emails,
			createdAt,
			updatedAt,
			clerkUserId,
		},
	});
};

module.exports = { getAllUsers, getUserByUsername, createUser };
