// FoodSection.jsx
'use client';

import React, { useState } from "react";

const FoodSection = () => {
  // Sample data for food items with categories
  const foodItems = [
    {
      id: 1,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Margherita Pizza",
      price: "₹499",
      category: "Italian",
    },
    {
      id: 2,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Sushi Platter",
      price: "₹999",
      category: "Japanese",
    },
    {
      id: 3,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Caesar Salad",
      price: "₹350",
      category: "Salads",
    },
    {
      id: 4,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Pasta Carbonara",
      price: "₹450",
      category: "Italian",
    },
    {
      id: 5,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Chicken Tacos",
      price: "₹299",
      category: "Mexican",
    },
    {
      id: 6,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Veggie Burger",
      price: "₹399",
      category: "Burgers",
    },
    {
      id: 7,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Paneer Tikka",
      price: "₹299",
      category: "Indian",
    },
    {
      id: 8,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Butter Chicken",
      price: "₹599",
      category: "Indian",
    },
    {
      id: 9,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Chole Bhature",
      price: "₹199",
      category: "Indian",
    },
    {
      id: 10,
      imageUrl: "https://www.lays.com/sites/lays.com/files/2022-03/23E0CD5A-AA82-46B5-8EFF-B507BF55B471%20copia2.png",
      name: "Masala Dosa",
      price: "₹150",
      category: "Indian",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter food items based on search term and selected category
  const filteredFoodItems = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Unique categories for filtering
  const categories = ["All", "Italian", "Japanese", "Salads", "Mexican", "Burgers", "Indian"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <div className="w-full max-w-lg mb-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4 w-full max-w-lg">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredFoodItems.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
              <p className="text-gray-600 mt-2">{food.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSection;


