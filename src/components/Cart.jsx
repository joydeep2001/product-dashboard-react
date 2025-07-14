import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg transform transition-transform duration-300 z-50 overflow-y-auto border-l
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-xl">x</button>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">${item.price}</p>

                <div className="flex items-center mt-1 gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-0.5 border rounded"
                  >
                    -
                  </button>
                  <span className="text-sm">{item.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-0.5 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t mt-4">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;