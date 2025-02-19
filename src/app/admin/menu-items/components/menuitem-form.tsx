"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createMenuItem, getCategories } from "../../../../actions/menuActions";
import SubmitButton from "./menusubmit-btn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().nonempty("El nombre del menu item es requerido"),
  description: z.string().nonempty("La descripción del menu item es requerida"),
  imageUrl: z.string().nonempty("La imagen del menu item es requerida"),
  price: z.number().int().positive(),
  isAvailable: z.boolean(),
  categoryId: z.string().nonempty("La categoría es requerida"),
});

export default function MenuitemForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      price: 0,
      isAvailable: true,
      categoryId: "",
    },
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      const mappedCategories = fetchedCategories.map((category) => ({
        id: category.id,
        name: category.categoryName, // Map categoryName to name
      }));
      setCategories(mappedCategories);
    }

    fetchCategories();
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-4 p-4">
      <Form {...form}>
        <form action={createMenuItem}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es el nombre del plato?</FormLabel>
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
                <FormLabel>¿Cuál es la descripción?</FormLabel>
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
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es el precio?</FormLabel>
                <FormControl>
                  <input
                    type="number"
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
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Cuál es la categoría?</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="isAvailable"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>¿Está disponible?</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)} // Handle change
                    className="flex-1 block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center mt-4">
            <SubmitButton type="submit">Enviar</SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
