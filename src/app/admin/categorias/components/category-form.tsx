"use client";

import { v2 as cloudinary } from "cloudinary";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createCategory } from "../../../../actions/actions";
import SubmitButton from "../components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const formSchema = z.object({
  categoryName: z.string().nonempty("El nombre de la categoría es requerido"),
  description: z
    .string()
    .nonempty("La descripción de la categoría es requerida"),
  imageUrl: z.string().nonempty("La imagen de la categoría es requerida"),
});

export default function CategoryForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: "",
      description: "",
      imageUrl: "",
    },
  });
  return (
    <div className="max-w-2xl mx-auto my-4">
      <Form {...form}>
        <form action={createCategory}>
          <FormField
            name="categoryName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es tu nombre completo?</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    required
                    {...field}
                    className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es tu nombre completo?</FormLabel>
                <FormControl>
                  <textarea
                    required
                    {...field}
                    className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Podrías subir una foto de la categoría?</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    required
                    {...field}
                    className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <SubmitButton type="submit">Enviar</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
