import "./App.css";
import ProductTable from "./components/ProductTable";
import { useContext, useMemo, useState } from "react";
import generateMockProducts, { categorySet } from "./utils/dataGenerator";
import Header from "./components/Header";
import { CartProvider, CartContext } from "./context/cartContext";
import CartSidebar from "./components/Cart";
import StatsCards from "./components/StatCards";

function Dashboard() {
  const [query, setQuery] = useState("");

  const mockProducts = useMemo(() => generateMockProducts(1200), []);
  const { isOpen, setOpen } = useContext(CartContext);

  const totalRevenue = useMemo(
    () => mockProducts.reduce((acc, cur) => parseInt(cur.price) + acc, 0),
    [mockProducts]
  );

  const lowStock = useMemo(
    () => mockProducts.reduce((acc, cur) => (cur.stock < 5 ? acc + 1 : acc), 0),
    [mockProducts]
  );

  function toggleCart() {
    if (isOpen) setOpen(false);
    else setOpen(true);
  }

  console.log(mockProducts);
  return (
    <>
      <CartProvider>
        <Header query={query} setQuery={setQuery} onCartOpen={toggleCart} />
        <StatsCards
          stats={[
            { title: "Total Products", value: mockProducts.length, icon: "📦" },
            {
              title: "Total Revenue",
              value: `$ ${totalRevenue}`,
              icon: "💰",
              color: "green",
            },
            {
              title: "Low Stock",
              value: lowStock,
              icon: "⚠️",
              color: "yellow",
            },
            {
              title: "Categories",
              value: categorySet.size,
              icon: "📂",
              color: "blue",
            },
          ]}
        />
        <ProductTable
          query={query}
          setQuery={setQuery}
          allProducts={mockProducts}
        />
        <CartSidebar isOpen={isOpen} onClose={toggleCart} />
      </CartProvider>
    </>
  );
}

function App() {
  return (
    <>
      <CartProvider>
        <Dashboard />
      </CartProvider>
    </>
  );
}

export default App;
