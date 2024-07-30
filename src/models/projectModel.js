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

// Home Routes

const getMostFeasibleIdea = async (userId) => {
    // Fetch projects with their ideas for the given user
    const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            ideas: true,
        },
    });

    if (projects.length === 0) {
        return [];
    }

	// Get all ideas. flatMap() takes all project ideas and turns it into an array.
	const ideas = projects.flatMap(project => project.ideas);

    // Sort ideas by feasibility (descending order)
    ideas.sort((a, b) => b.feasibility - a.feasibility);

    // // Return the most feasible idea
	if (ideas) {
		return ideas[0];
	}
	return null;
};


const getEasiestIdea = async ( userId ) => {
	const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            ideas: true,
        },
    });

    if (projects.length === 0) {
        return [];
    }

	// Get all ideas. flatMap() takes all project ideas and turns it into an array.
	const ideas = projects.flatMap(project => project.ideas);

    // Sort ideas by feasibility (ascending order)
    ideas.sort((a, b) => b.difficulty - a.difficulty);
	
    // // Return the most feasible idea
	if (ideas) {
		return ideas[ideas.length - 1];
	}
	return null;
};

const getMostDifficultIdea = async ( userId ) => {
	const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            ideas: true,
        },
    });

    if (projects.length === 0) {
        return [];
    }

	// Get all ideas. flatMap() takes all project ideas and turns it into an array.
	const ideas = projects.flatMap(project => project.ideas);

    // Sort ideas by feasibility (descending order)
    ideas.sort((a, b) => b.difficulty - a.difficulty);

    // Return the most feasible idea
	if (ideas) {
		return ideas[0];
	}
	return null;
};

const getMostImpactfulIdea = async ( userId ) => {
	const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            ideas: true,
        },
    });

    if (projects.length === 0) {
        return [];
    }

	// Get all ideas. flatMap() takes all project ideas and turns it into an array.
	const ideas = projects.flatMap(project => project.ideas);

    // Sort ideas by feasibility (descending order)
    ideas.sort((a, b) => b.impact - a.impact);

    // Return the most feasible idea
	if (ideas) {
		return ideas[0];
	}
	return null;
};

// const getBookmarkedIdeas = async (userId) => {
//     return prisma.idea.findMany({
//         where: {
//             bookmarked: true,
//         },
//     });
// };

const getBookmarkedIdeas = async (userId) => {
	const projects = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            ideas: true,
        },
    });

    if (projects.length === 0) {
        return [];
    }

	// Get all ideas. flatMap() takes all project ideas and turns it into an array.
	let ideas = projects.flatMap(project => project.ideas);

	if (ideas.length === 0) {
		return [];
	}

    // Sort ideas by feasibility (descending order)
    ideas = ideas.filter((a) => a.bookmarked === true);
	console.log("ideas filtered:", ideas);

    // Return the most feasible idea
	return ideas;



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
	getMostFeasibleIdea,
	getEasiestIdea,
	getMostDifficultIdea,
	getMostImpactfulIdea,
};
