/*
  Warnings:

  - You are about to drop the column `postId` on the `Thread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_postId_fkey";

-- DropIndex
DROP INDEX "Thread_replyToId_key";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "postId";
