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

const getUserById = async (id) => {
	return prisma.user.findUnique({
		where: {
			id,
		},
		include: {
			profile: true,
		}
	})
}
const createUser = async (
	id,
	username,
	email,
	firstName,
	lastName,
	picture
) => {
	return prisma.user.create({
		data: {
			id,
			username,
			email,
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

module.exports = { getAllUsers, getUserByUsername, createUser, deleteUser, getUserById };
