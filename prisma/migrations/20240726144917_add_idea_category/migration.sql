/*
  Warnings:

  - Added the required column `category` to the `Idea` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `category` on the `Thread` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IdeaCategory" AS ENUM ('Education', 'Environment', 'Healthcare', 'News', 'Technology');

-- CreateEnum
CREATE TYPE "ForumCategory" AS ENUM ('Announcements', 'Insights', 'Questions', 'Suggestions', 'Random');

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "category" "IdeaCategory" NOT NULL;

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "category",
ADD COLUMN     "category" "ForumCategory" NOT NULL;

-- DropEnum
DROP TYPE "Category";
