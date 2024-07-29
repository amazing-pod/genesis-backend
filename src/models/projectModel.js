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

// Test function
const getProjectsByUserId = async (userId) => {
    return prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            owner: true,
            collaborators: true,
            ideas: true,
        },
    });
};


const getBookmarkedIdeas = async (userId) => {
    return prisma.idea.findMany({
        where: {
            bookmarked: true,
            // Add more filters if necessary, e.g., userId
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

const getProjectById = async ({ id }) => {
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

const getIdeaById = async ({ id, ideaId }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.find((idea) => idea.id === ideaId)) {
		throw new Error(`Idea [${ideaId}] not found in project [${id}]`);
	}

	return prisma.idea.findUnique({
		where: {
			id: ideaId,
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

const addCollaborator = async ({ id }, { collaboratorId }) => {
	return prisma.project.update({
		where: {
			id,
		},
		data: {
			collaborators: {
				connect: {
					id: collaboratorId,
				},
			},
		},
	});
};

const createIdea = async (
	{ id },
	{
		title,
		description,
		category,
		issues,
		features,
		tags,
		impact,
		feasibility,
		difficulty,
	}
) => {
	return prisma.idea.create({
		data: {
			projectId: id,
			title,
			description,
			category,
			issues,
			features,
			tags: {
				connectOrCreate: tags.map((tag) => {
					return {
						where: { name: tag.name },
						create: { name: tag.name },
					};
				}),
			},
			impact,
			feasibility,
			difficulty,
		},
	});
};

const updateIdea = async (
	{ id, ideaId },
	{ impact, feasibility, difficulty }
) => {
	const project = await prisma.project.findUnique({
		where: {
			id: id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.find((idea) => idea.id === ideaId)) {
		throw new Error(`Idea [${ideaId}] not found in project [${id}]`);
	}

	return prisma.idea.update({
		where: {
			id: ideaId,
		},
		data: {
			impact,
			feasibility,
			difficulty,
		},
	});
};

const deleteIdea = async ({ id, ideaId }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.find((idea) => idea.id === ideaId)) {
		throw new Error(`Idea [${ideaId}] not found in project [${id}]`);
	}

	return prisma.idea.delete({
		where: {
			id: ideaId,
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
	getIdeaById,
	createProject,
	addCollaborator,
	createIdea,
	updateIdea,
	deleteIdea,
	deleteProject,
	getBookmarkedIdeas,
	getProjectsByUserId,
};
