-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignedtoUserId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignedtoUserId_fkey" FOREIGN KEY ("assignedtoUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
