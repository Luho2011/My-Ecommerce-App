-- CreateEnum
CREATE TYPE "Category" AS ENUM ('HOSEN', 'PULLIS', 'SCHUHE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category",
ADD COLUMN     "imageUrl" TEXT;
