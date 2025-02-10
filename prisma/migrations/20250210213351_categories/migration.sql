-- DropForeignKey
ALTER TABLE "menu_items" DROP CONSTRAINT "menu_items_categoryId_fkey";

-- AlterTable
ALTER TABLE "menu_items" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
