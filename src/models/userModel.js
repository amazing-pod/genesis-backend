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

const createUser = async (id, username, firstName, lastName, picture) => {
	return prisma.user.create({
		data: {
			id,
			username,
			profile: {
				create: {
					firstName,
					lastName,
					picture,
				},
			},
		},
	});
};

const deleteUser = async (id) => {
	return prisma.user.delete({
		where: {
			id,
		},
	});
};

module.exports = { getAllUsers, getUserByUsername, createUser, deleteUser };
