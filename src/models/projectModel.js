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
const getProjectsByUserId = async ({ ownerId }) => {
	return prisma.project.findMany({
		where: {
			ownerId,
		},
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

const createProject = async ({ ownerId, title }) => {
	return prisma.project.create({
		data: {
			id: ownerId,
			ownerId,
			title,
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
				connectOrCreate: tags?.map((tag) => {
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

const bulkCreateIdeas = async ({ id }, { ideas }) => {
	const createdIdeas = [];

	for (const idea of ideas) {
		const createdIdea = await prisma.idea.create({
			data: {
				projectId: id,
				title: idea.title,
				description: idea.description,
				category: idea.category,
				issues: idea.issues,
				features: idea.features,
				tags: {
					connectOrCreate: idea.tags?.map((tag) => ({
						where: { name: tag },
						create: { name: tag },
					})),
				},
				impact: idea.impact,
				feasibility: idea.feasibility,
				difficulty: idea.difficulty,
			},
		});

		createdIdeas.push(createdIdea);
	}

	return createdIdeas;
};

const updateIdea = async ({ id, ideaId }, data) => {
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
		data: data,
	});
};

const addFeatureToIdea = async ({ id, ideaId }, { feature }) => {
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
			features: {
				push: feature,
			},
		},
	});
};

const bookmarkIdea = async ({ id, ideaId }) => {
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

	const idea = await prisma.project.findUnique({
		where: {
			id: id,
		},
	});

	return prisma.idea.update({
		where: {
			id: ideaId,
		},
		data: {
			bookmarked: !idea.bookmarked,
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

// Home Routes

const getMostFeasibleIdea = async ({ id }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.length) {
		return [];
	}

	const ideas = project.ideas;

	if (ideas) {
		ideas.sort((a, b) => b.feasibility - a.feasibility);
		return ideas[0];
	}
	return null;
};

const getEasiestIdea = async ({ id }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.length) {
		return [];
	}

	const ideas = project.ideas;

	if (ideas) {
		ideas.sort((a, b) => a.difficulty - b.difficulty);
		return ideas[0];
	}
	return null;
};

const getMostDifficultIdea = async ({ id }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.length) {
		return [];
	}

	const ideas = project.ideas;

	if (ideas) {
		ideas.sort((a, b) => b.difficulty - a.difficulty);
		return ideas[0];
	}
	return null;
};

const getMostImpactfulIdea = async ({ id }) => {
	const project = await prisma.project.findUnique({
		where: {
			id,
		},
		include: {
			ideas: true,
		},
	});

	if (!project.ideas.length) {
		return [];
	}

	const ideas = project.ideas;

	if (ideas) {
		ideas.sort((a, b) => b.impact - a.impact);
		return ideas[0];
	}
	return null;
};

const getBookmarkedIdeas = async ({ id }) => {
	const ideas = await prisma.idea.findMany({
		where: {
			projectId: id,
			bookmarked: true,
		},
	});

	if (!ideas.length) {
		return [];
	}

	return ideas;
};

module.exports = {
	getAllProjects,
	getProjectById,
	getIdeaById,
	createProject,
	addCollaborator,
	createIdea,
	bulkCreateIdeas,
	updateIdea,
	addFeatureToIdea,
	deleteIdea,
	deleteProject,
	bookmarkIdea,
	getBookmarkedIdeas,
	getProjectsByUserId,
	getMostFeasibleIdea,
	getEasiestIdea,
	getMostDifficultIdea,
	getMostImpactfulIdea,
};
