/*
  Warnings:

  - You are about to drop the column `threadId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_threadId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "threadId";

-- CreateTable
CREATE TABLE "_ThreadTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ThreadTags_AB_unique" ON "_ThreadTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ThreadTags_B_index" ON "_ThreadTags"("B");

-- AddForeignKey
ALTER TABLE "_ThreadTags" ADD CONSTRAINT "_ThreadTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThreadTags" ADD CONSTRAINT "_ThreadTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
