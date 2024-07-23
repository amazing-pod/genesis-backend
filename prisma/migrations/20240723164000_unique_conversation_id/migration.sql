/*
  Warnings:

  - A unique constraint covering the columns `[conversationId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Chat_conversationId_key" ON "Chat"("conversationId");
