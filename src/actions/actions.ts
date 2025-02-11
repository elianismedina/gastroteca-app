"use server";
import { prisma } from "../lib/prisma";
import { v2 as cloudinary } from "cloudinary";
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
  revalidatePath("/");
  redirect("/");
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
export const login = async () => {
  await signIn("github", { redirectTo: "/quote" });
};
export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
