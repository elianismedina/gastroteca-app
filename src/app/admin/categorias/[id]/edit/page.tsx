import { prisma } from "@/lib/prisma";
import CategoryForm from "../../components/category-form";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) return <p>Category not found</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Category</h1>
      <CategoryForm
        category={{
          ...category,
          description: category.description ?? "", // Convert null to empty string
          imageUrl: category.imageUrl ?? "", // Convert null to empty string
        }}
      />
    </div>
  );
}
