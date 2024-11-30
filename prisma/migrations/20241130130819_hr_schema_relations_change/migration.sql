/*
  Warnings:

  - You are about to drop the `_PayGradeToPosition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hr"."_PayGradeToPosition" DROP CONSTRAINT "_PayGradeToPosition_A_fkey";

-- DropForeignKey
ALTER TABLE "hr"."_PayGradeToPosition" DROP CONSTRAINT "_PayGradeToPosition_B_fkey";

-- AlterTable
ALTER TABLE "hr"."pay_grades" ADD COLUMN     "positionPositionId" INTEGER;

-- DropTable
DROP TABLE "hr"."_PayGradeToPosition";

-- AddForeignKey
ALTER TABLE "hr"."pay_grades" ADD CONSTRAINT "pay_grades_positionPositionId_fkey" FOREIGN KEY ("positionPositionId") REFERENCES "hr"."positions"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;
