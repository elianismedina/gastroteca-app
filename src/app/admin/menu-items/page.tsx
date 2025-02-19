import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { handleDeleteMenuItem } from "../../../actions/menuActions";

export default async function MenuItemPage() {
  // Fetch categories from the database
  const menuitems = await prisma.menuItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Menu items</h1>

      {/* Create New Category Button */}
      <div className="mb-4">
        <Link href="/admin/menu-items/new">
          <Button>Crear nuevo menu item</Button>
        </Link>
      </div>

      {/* Categories List */}
      {menuitems.length === 0 ? (
        <p className="text-gray-500">No se encontraron menu items</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuitems.map((menuitem) => (
                <tr key={menuitem.id} className="border-t">
                  {/* Category Image */}
                  <td className="border p-2">
                    {menuitem.imageUrl ? (
                      <Image
                        src={menuitem.imageUrl}
                        alt={menuitem.name}
                        width={200}
                        height={200}
                        className="object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400">No Hay Imagen</span>
                    )}
                  </td>

                  {/* Category Name */}
                  <td className="border p-2">{menuitem.name}</td>

                  {/* Category Description */}
                  <td className="border p-2">
                    {menuitem.description || "No hay descripción"}
                  </td>
                  {/* Category Price */}
                  <td className="border p-2">{menuitem.price}</td>

                  {/* Actions */}
                  <td className="border p-2 flex gap-2">
                    <Link href={`/admin/menu-items/${menuitem.id}/edit`}>
                      <Button variant="outline">Editar</Button>
                    </Link>
                    <form action={handleDeleteMenuItem}>
                      <input
                        type="hidden"
                        name="menuitemId"
                        value={menuitem.id}
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
