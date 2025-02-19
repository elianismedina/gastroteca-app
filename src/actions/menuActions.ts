"use server";
import { prisma } from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "process";

const formSchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.number().int().positive(),
  imageUrl: z.string().optional(),
});

export async function createMenuItem(formData: FormData) {
  const file = formData.get("imageUrl") as File;
  const url = await uploadMenuImage(file || undefined);

  const { name, description, imageUrl, price } = formSchema.parse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    imageUrl: url?.toString(),
    price: Number(formData.get("price")), // Convert to number
  });
  await prisma.menuItem.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      price: price,
    },
  });
  revalidatePath("/admin/menu-items");
  redirect("/admin/menu-items");
}
export async function getCategories() {
  return await prisma.category.findMany({
    select: {
      id: true,
      categoryName: true,
    },
  });
}
interface UploadResult {
  url: string;
}
async function uploadMenuImage(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            upload_preset: env.NEXT_PUBLIC_UPLOAD_PRESET,
            api_key: env.CLOUDINARY_API_KEY,
            api_secret: env.CLOUDINARY_API_SECRET,
            cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          },
          function (error, result) {
            if (error || result === undefined) {
              reject(error || new Error("Upload result is undefined."));
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
    return result.url;
  } catch (error) {
    console.error("Error uploading image", error);
    throw error;
  }
}
export async function deleteMenuItem(menuitemId: string) {
  try {
    // Find the category to get the image URL
    const menuitem = await prisma.menuItem.findUnique({
      where: { id: menuitemId },
    });

    if (!menuitem) {
      throw new Error("Menu item not found");
    }

    // Delete the image from Cloudinary if it exists
    if (menuitem.imageUrl) {
      const publicId = getPublicId(menuitem.imageUrl);
      if (publicId) {
        console.log("Deleting image from Cloudinary", publicId);
        await cloudinary.uploader.destroy(publicId);
      } else {
        console.warn("No public ID found for image", menuitem.imageUrl);
      }
    }

    // Delete the category from the database
    await prisma.menuItem.delete({
      where: { id: menuitemId },
    });

    // Revalidate the categories page
    revalidatePath("/admin/menu-items");
    redirect("/admin/menu-items");
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
}

function getPublicId(imageUrl: string): string | null {
  const match = imageUrl.match(/\/v\d+\/(.+?)\.\w+$/);
  return match ? match[1] : null;
}
export async function handleDeleteMenuItem(formData: FormData) {
  const menuitemId = formData.get("menuitemId") as string;
  if (!menuitemId) {
    throw new Error("Menu item ID is required");
  }
  await deleteMenuItem(menuitemId);
}
export async function getMenuItems() {
  try {
    const menuitems = await prisma.menuItem.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        imageUrl: true,
        name: true,
        description: true,
        price: true,
      }, // Ensure correct fields
    });

    // Ensure imageUrl is always a string (not null)
    return menuitems.map((menuitem) => ({
      ...menuitem,
      imageUrl: menuitem.imageUrl ?? "",
      description: menuitem.description ?? "",
      price: menuitem.price ?? 0, // Convert null to 0
      // Convert null to empty string
    }));
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
}
