"use client";
import React, { useEffect, useState } from "react";
import CreateCategoryForm from "./components/create-category-form";
import { ListAllCategories } from "@/actions/actions";

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
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
