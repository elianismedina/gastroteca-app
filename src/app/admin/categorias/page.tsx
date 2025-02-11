import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { handleDeleteCategory } from "@/actions/actions";

export default async function CategoriesPage() {
  // Fetch categories from the database
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Categorias</h1>

      {/* Create New Category Button */}
      <div className="mb-4">
        <Link href="categorias/new">
          <Button>Crear nueva categoría</Button>
        </Link>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <p className="text-gray-500">No se encontraron categorías</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t">
                  {/* Category Image */}
                  <td className="border p-2">
                    {category.imageUrl ? (
                      <Image
                        src={category.imageUrl}
                        alt={category.categoryName}
                        width={200}
                        height={200}
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Hay Imagen</span>
                    )}
                  </td>

                  {/* Category Name */}
                  <td className="border p-2">{category.categoryName}</td>

                  {/* Category Description */}
                  <td className="border p-2">
                    {category.description || "No hay descripción"}
                  </td>

                  {/* Actions */}
                  <td className="border p-2 flex gap-2">
                    <Link href={`/admin/categorias/${category.id}/edit`}>
                      <Button variant="outline">Editar</Button>
                    </Link>
                    <form action={handleDeleteCategory}>
                      <input
                        type="hidden"
                        name="categoryId"
                        value={category.id}
                      />
                      <Button type="submit" variant="destructive">
                        Eliminar
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
