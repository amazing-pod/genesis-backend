/*
  Warnings:

  - You are about to drop the column `userId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_userId_fkey";

-- DropIndex
DROP INDEX "Chat_conversationId_key";

-- DropIndex
DROP INDEX "Chat_userId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userId";
