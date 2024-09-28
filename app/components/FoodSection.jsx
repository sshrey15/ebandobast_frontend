'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme CSS
import Cart from './Cart';

const FoodSection = () => {
  const router = useRouter();

  const foodItems = [
    { id: 1, imageUrl: "/api/placeholder/400/300", name: "Coca-Cola", price: 40, category: "Soft Drinks" },
    { id: 2, imageUrl: "/api/placeholder/400/300", name: "Pepsi", price: 35, category: "Soft Drinks" },
    { id: 3, imageUrl: "/api/placeholder/400/300", name: "Sprite", price: 40, category: "Soft Drinks" },
    { id: 4, imageUrl: "/api/placeholder/400/300", name: "Minute Maid Orange Juice", price: 80, category: "Fruit Juice" },
    { id: 5, imageUrl: "/api/placeholder/400/300", name: "Tropicana Apple Juice", price: 90, category: "Fruit Juice" },
    { id: 6, imageUrl: "/api/placeholder/400/300", name: "Red Bull", price: 120, category: "Energy Drinks" },
    { id: 7, imageUrl: "/api/placeholder/400/300", name: "Monster Energy", price: 150, category: "Energy Drinks" },
    { id: 8, imageUrl: "/api/placeholder/400/300", name: "Parle-G Biscuits", price: 20, category: "Biscuits" },
    { id: 9, imageUrl: "/api/placeholder/400/300", name: "Oreo Biscuits", price: 50, category: "Biscuits" },
    { id: 10, imageUrl: "/api/placeholder/400/300", name: "Good Day Butter Cookies", price: 60, category: "Biscuits" },
    { id: 11, imageUrl: "/api/placeholder/400/300", name: "Lay's Classic Chips", price: 30, category: "Chips" },
    { id: 12, imageUrl: "/api/placeholder/400/300", name: "Doritos Nacho Cheese", price: 80, category: "Chips" },
    { id: 13, imageUrl: "/api/placeholder/400/300", name: "Kurkure Masala Munch", price: 20, category: "Chips" },
    { id: 14, imageUrl: "/api/placeholder/400/300", name: "Haldiram's Bhujia Sev", price: 100, category: "Namkeen" },
    { id: 15, imageUrl: "/api/placeholder/400/300", name: "Balaji Shev", price: 70, category: "Namkeen" },
    { id: 16, imageUrl: "/api/placeholder/400/300", name: "Chitale Farsan", price: 90, category: "Namkeen" },
    { id: 17, imageUrl: "/api/placeholder/400/300", name: "Cadbury Dairy Milk", price: 50, category: "Chocolates" },
    { id: 18, imageUrl: "/api/placeholder/400/300", name: "Nestlé KitKat", price: 40, category: "Chocolates" },
    { id: 19, imageUrl: "/api/placeholder/400/300", name: "Ferrero Rocher", price: 400, category: "Chocolates" },
    { id: 20, imageUrl: "/api/placeholder/400/300", name: "Mango Frooti Juice", price: 30, category: "Fruit Juice" },
    { id: 21, imageUrl: "/api/placeholder/400/300", name: "Appy Fizz", price: 25, category: "Soft Drinks" },
    { id: 22, imageUrl: "/api/placeholder/400/300", name: "Mountain Dew", price: 40, category: "Soft Drinks" },
    { id: 23, imageUrl: "/api/placeholder/400/300", name: "7UP", price: 35, category: "Soft Drinks" },
    { id: 24, imageUrl: "/api/placeholder/400/300", name: "Real Mixed Fruit Juice", price: 100, category: "Fruit Juice" },
    { id: 25, imageUrl: "/api/placeholder/400/300", name: "Amul Butter Biscuits", price: 35, category: "Biscuits" },
    { id: 26, imageUrl: "/api/placeholder/400/300", name: "Unibic Choco Chip Cookies", price: 75, category: "Biscuits" },
    { id: 27, imageUrl: "/api/placeholder/400/300", name: "Pringles Original Chips", price: 150, category: "Chips" },
    { id: 28, imageUrl: "/api/placeholder/400/300", name: "Munch", price: 10, category: "Chocolates" },
    { id: 29, imageUrl: "/api/placeholder/400/300", name: "Mars Bar", price: 100, category: "Chocolates" },
    { id: 30, imageUrl: "/api/placeholder/400/300", name: "Gatorade", price: 80, category: "Energy Drinks" }
];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const filteredFoodItems = foodItems.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

 const categories = ["All", "Soft Drinks", "Fruit Juice", "Energy Drinks", "Biscuits", "Chips", "Namkeen", "Chocolates"];

  const addToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const FoodCard = ({ food }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={food.imageUrl} alt={food.name} className="w-full h-24 sm:h-48 object-cover" />
      <div className="p-2 sm:p-4">
        <h3 className="text-sm sm:text-xl font-semibold mb-1 sm:mb-2 truncate">{food.name}</h3>
        <p className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">₹{food.price}</p>
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4">{food.category}</p>
        <button
          onClick={() => addToCart(food)}
          className="w-full bg-blue-500 text-white py-1 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-base hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">FoodBandobast</h1>

      <div className="w-full max-w-4xl mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-3 py-2 text-sm sm:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-[180px] px-3 py-2 text-sm sm:text-base rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

       {/* Featured Items Slider */}
       <div className="w-full max-w-4xl mb-8">
        <h2 className="text-xl font-bold mb-4">Featured Items</h2>
        <Slider {...sliderSettings}>
          {foodItems.slice(0, 5).map((food) => (
            <div key={food.id} className="p-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
                  <p className="text-gray-600">{food.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full max-w-6xl mb-6 sm:mb-8">
        {filteredFoodItems.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>

      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-4 right-4 z-50 bg-green-500 text-white py-2 px-4 rounded-full text-sm sm:text-base hover:bg-green-600 transition duration-300 flex items-center shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
      </button>

      {showCart && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          setShowCart={setShowCart}
        />
      )}
    </div>
  );
};

export default FoodSection;