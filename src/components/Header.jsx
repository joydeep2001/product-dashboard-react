import { useContext } from "react";
import { IoMdCart } from "react-icons/io";
import { CartContext } from "../context/cartContext";

const Header = ({ cartCount, query, setQuery, onCartOpen }) => {
  const { cartItems } = useContext(CartContext);
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm sticky top-0 z-50">
      <h1 className="text-lg sm:text-2xl font-bold text-indigo-700">
        🛍️ Product Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search products..."
        className="hidden sm:block w-1/2 px-3 py-2 border rounded-md text-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="relative">
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
          {cartCount}
        </span>
        <div className="relative w-fit">
          <span onClick={onCartOpen} className="text-2xl cursor-pointer">
            <IoMdCart />
          </span>
          {cartItems.length > 0 ? (
            <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
