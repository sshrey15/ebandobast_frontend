import React from 'react';

const Cart = ({ cartItems, removeFromCart, updateQuantity, setShowCart }) => {
  const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto m-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">Cart Items</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {cartItems.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mr-3 sm:mr-4" />
                  <div>
                    <h3 className="text-sm sm:text-lg font-semibold">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-800 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base hover:bg-gray-300 transition duration-300"
                  >
                    -
                  </button>
                  <span className="mx-2 text-sm sm:text-base">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-800 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base hover:bg-gray-300 transition duration-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-3 sm:ml-4 text-red-500 hover:text-red-600 transition duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-sm sm:text-base">Your cart is empty</p>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 sm:mt-6 flex justify-between items-center bg-gray-100 p-3 sm:p-4 rounded-md">
            <span className="text-lg sm:text-xl font-bold">Total: ₹{totalCost}</span>
            <button className="bg-blue-500 text-white py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;