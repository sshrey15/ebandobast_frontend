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
    // Rice items
    { id: 1, imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/09/veg-biryani-vegetable-biryani.jpg", name: "Veg Biryani", price: 150, category: "Rice" },
    { id: 2, imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/jeera-rice-recipe.jpg", name: "Jeera Rice", price: 80, category: "Rice" },
    { id: 3, imageUrl: "https://holycowvegan.net/wp-content/uploads/2014/06/masala-khichdi-featured-image.jpg", name: "Khichadi Rice", price: 110, category: "Rice" },
    { id: 4, imageUrl: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/curd-rice-thayir-sadam.jpg", name: "Curd Rice", price: 90, category: "Rice" },
    { id: 5, imageUrl: "https://myheartbeets.com/wp-content/uploads/2020/02/instant-pot-everyday-dal-chawal.jpg", name: "Daal-Rice", price: 100, category: "Rice" },
  
    // Goa delicacies
    { id: 6, imageUrl: "https://abbyshearth.com/wp-content/uploads/2022/05/ladi-pav.jpg", name: "Paav 1pc", price: 5, category: "Goa Delicacies" },
    { id: 7, imageUrl: "https://www.bigfattummy.com/wp-content/uploads/2019/05/Dry-Green-Pea-Patal-Bhaji-05-1-800x800.jpg", name: "Bhaaji Paav", price: 60, category: "Goa Delicacies" },
    { id: 9, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ros_omelette.jpg", name: "Ross Omlete", price: 60, category: "Goa Delicacies" },
    { id: 10, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNQujdpY5kD6Uf0BD-F-Gc_f95tlfgpFNJw&s", name: "Mushroom Bhaji", price: 40, category: "Goa Delicacies" },
  
    // Drinks
    { id: 11, imageUrl: "https://everydaysure.in/water/assets/media/bisleri-1ltr.jpg", name: "Water bottle 1L", price: 20, category: "Drinks" },
    { id: 12, imageUrl: "https://everydaysure.in/water/assets/media/bisleri-1ltr.jpg", name: "Water bottle 500ml", price: 10, category: "Drinks" },
    { id: 13, imageUrl: "https://m.media-amazon.com/images/I/71QKr98XL+L.jpg", name: "Gatorade 250ml", price: 25, category: "Drinks" },
    { id: 14, imageUrl: "https://m.media-amazon.com/images/I/71k1gi24UtL.jpg", name: "Real Fruit Juice", price: 30, category: "Drinks" },
  
    // Indian Snacks
    { id: 15, imageUrl: "https://static.toiimg.com/photo/59217136.cms?width=500&resizemode=4&imgsize=167880", name: "Samosa", price: 15, category: "Indian Snacks" },
    { id: 16, imageUrl: "https://static.toiimg.com/photo/59217136.cms?width=500&resizemode=4&imgsize=167880", name: "Vada paav", price: 10, category: "Indian Snacks" },
    { id: 17, imageUrl: "https://static.toiimg.com/photo/59217136.cms?width=500&resizemode=4&imgsize=167880", name: "Khachori", price: 20, category: "Indian Snacks" },
    { id: 18, imageUrl: "https://static.toiimg.com/photo/59217136.cms?width=500&resizemode=4&imgsize=167880", name: "Bread pakora", price: 15, category: "Indian Snacks" },
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

  const categories = ["All", "Rice", "Goa Delicacies", "Drinks", "Indian Snacks"];



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