"use client";
import React, { useEffect, useState } from "react";
import CreateCategoryForm from "./components/create-category-form";
import { ListAllCategories } from "@/actions/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  categoryName: string;
  description: string | null;
  imageUrl: string | null;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await ListAllCategories();
        setCategories(categories); // Set the fetched categories to the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>
      <CreateCategoryForm />
      <h2>Todas las categorías</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Imagen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>
                {category.imageUrl ? (
                  <Image
                    src={category.imageUrl}
                    alt={category.categoryName}
                    width="50"
                    height="50"
                  />
                ) : (
                  "No Image"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoriesPage;
