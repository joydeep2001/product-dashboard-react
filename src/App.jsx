import "./App.css";
import ProductTable from "./components/ProductTable";
import { useContext, useMemo, useState } from "react";
import generateMockProducts from "./utils/dataGenerator";
import Header from "./components/Header";
import { CartProvider, CartContext } from "./context/cartContext";
import CartSidebar from "./components/Cart";
import StatsCards from "./components/StatCards";
import { categorySet } from "./utils/dataGenerator";

function AppContent() {
  const [products, setProducts] = useState(() => generateMockProducts(1200));

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

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );

    console.log(`Product ${productId} deleted successfully`);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    console.log(`Product ${updatedProduct.id} updated successfully`);
  };

  console.log(products);

  return (
    <>
      <Header onCartOpen={toggleCart} setQuery={setQuery} />
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
        allProducts={products}
        query={query}
        setQuery={setQuery}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
      <CartSidebar onClose={toggleCart} isOpen={isOpen} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
