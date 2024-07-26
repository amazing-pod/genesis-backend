const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProjects = async () => {
	return prisma.project.findMany({
		include: {
			owner: true,
			collaborators: true,
			ideas: true,
		},
	});
};

// const getAccessProjects = async (userId) => {
// 	return prisma.project.findMany({
// 		where: {
// 			OR: [
// 				{
// 					ownerId: userId,
// 				},
//         {

//         }
// 			],
// 		},
// 	});
// };

const getProjectById = ({ id }) => {
	return prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			owner: true,
			collaborators: true,
			ideas: true,
		},
	});
};

const createProject = async ({ ownerId }) => {
	return prisma.project.create({
		data: {
			ownerId,
		},
	});
};

const deleteProject = async ({ id }) => {
	return prisma.project.delete({
		where: {
			id,
		},
	});
};

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	deleteProject,
};
