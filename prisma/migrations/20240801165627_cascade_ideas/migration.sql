-- DropForeignKey
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
