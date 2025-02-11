"use server";
import { prisma } from "../lib/prisma";
import cloudinary from "../lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signIn, signOut } from "../../auth";

import { env } from "process";

const formSchema = z.object({
  categoryName: z
    .string()
    .min(2, "Category name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  imageUrl: z.string().optional(),
});
export async function createCategory(formData: FormData) {
  const file = formData.get("imageUrl") as File;
  const url = await uploadImage(file || undefined);

  const { categoryName, description, imageUrl } = formSchema.parse({
    categoryName: formData.get("categoryName") as string,
    description: formData.get("description") as string,
    imageUrl: url?.toString(),
  });
  await prisma.category.create({
    data: {
      categoryName: categoryName,
      description: description,
      imageUrl: imageUrl,
    },
  });
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
interface UploadResult {
  url: string;
}
async function uploadImage(file: File): Promise<string> {
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
export async function deleteCategory(categoryId: string) {
  try {
    // Find the category to get the image URL
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Delete the image from Cloudinary if it exists
    if (category.imageUrl) {
      const publicId = getPublicId(category.imageUrl);
      if (publicId) {
        console.log("Deleting image from Cloudinary", publicId);
        await cloudinary.uploader.destroy(publicId);
      } else {
        console.warn("No public ID found for image", category.imageUrl);
      }
    }

    // Delete the category from the database
    await prisma.category.delete({
      where: { id: categoryId },
    });

    // Revalidate the categories page
    revalidatePath("/admin/categorias");
    redirect("/admin/categorias");
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

function getPublicId(imageUrl: string): string | null {
  const match = imageUrl.match(/\/v\d+\/(.+?)\.\w+$/);
  return match ? match[1] : null;
}

export async function handleDeleteCategory(formData: FormData) {
  const categoryId = formData.get("categoryId") as string;
  if (!categoryId) {
    throw new Error("Category ID is required");
  }
  await deleteCategory(categoryId);
}

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
