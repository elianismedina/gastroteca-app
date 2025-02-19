"use client";
import React, { useEffect, useState } from "react";
import { getMenuItems } from "@/actions/menuActions";
import Image from "next/image";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<
    {
      id: string;
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      isAvailable: boolean;
    }[]
  >([]);

  useEffect(() => {
    async function fetchMenuItems() {
      const items = await getMenuItems();
      setMenuItems(items);
    }

    fetchMenuItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      {menuItems.length === 0 ? (
        <p className="text-gray-500">No menu items found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={300}
                height={200}
                className="object-cover w-full"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-gray-900 font-semibold">${item.price}</p>
                <p
                  className={`text-sm ${
                    item.isAvailable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.isAvailable ? "Disponible" : "No disponible"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
