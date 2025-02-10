/*
  Warnings:

  - You are about to drop the column `category` on the `menu_items` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `menu_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_items" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
