"use server";
import { prisma } from "../lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { env } from "process";
import { signIn, signOut } from "../../auth";

const formSchema = z.object({
  categoryName: z.string().nonempty("Nombre es obligatorio"),
  description: z.string().nonempty("Descripción es obligatoria"),
  imageUrl: z.string().nonempty("Imagen es obligatoria"),
});

export async function createCategory(formData: FormData) {
  const file = formData.get("imageUrl") as File;
  const url = await uploadImage(file || undefined);

  const { categoryName, description, imageUrl } = formSchema.parse({
    categoryName: formData.get("categoryName") as string,
    description: formData.get("description") as string,
    imageUrl: url,
  });
  await prisma.category.create({
    data: {
      categoryName,
      description,
      imageUrl,
    },
  });
  revalidatePath("/admin/categorias");
  redirect("/admin/categorias");
}
interface UploadResult {
  url: string;
}
async function uploadImage(file?: File): Promise<string | null> {
  if (!file || file.size === 0) {
    console.warn("No file provided or file is empty.");
    return null;
  }
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

export const login = async () => {
  await signIn("github", { redirectTo: "/" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
export async function ListAllCategories() {
  return await prisma.category.findMany();
}
