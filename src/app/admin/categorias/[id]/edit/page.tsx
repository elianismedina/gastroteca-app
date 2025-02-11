import { prisma } from "@/lib/prisma";

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
      Form
    </div>
  );
}
