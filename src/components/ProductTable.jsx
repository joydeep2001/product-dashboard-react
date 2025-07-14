import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../context/cartContext";
// import Draggable from "react-draggable";

const ProductTable = ({ allProducts }) => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { addToCart } = useContext(CartContext);

  const [columns, setColumns] = useState([
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ]);

  const PRODUCTS_PER_PAGE = 10;

  const debounce = (fn, delay = 300) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const searchProducts = (products, query) => {
    if (!query) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((q) => {
        const filtered = searchProducts(allProducts, q);
        setProducts(filtered);
        setPage(1);
      }, 300),
    [allProducts]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    if (sortField) {
      sorted.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [products, sortField, sortOrder]);

  const paginated = sortedProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const toggleSort = (key) => {
    if (sortField === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(key);
      setSortOrder("asc");
    }
  };

  // const handleDrag = (i, j) => {
  //   const newCols = [...columns];
  //   const temp = newCols[i];
  //   newCols[i] = newCols[j];
  //   newCols[j] = temp;
  //   setColumns(newCols);
  // };

  return (
    <div className="p-2 sm:p-4 w-full overflow-x-auto">
      <input
        type="text"
        placeholder="Search by name or category"
        className="block sm:hidden w-full sm:w-96 mb-4 p-2 border rounded-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, idx) => (
              // <Draggable
              //   key={col.key}
              //   axis="x"
              //   onStop={(e, data) => {
              //     const targetIdx = Math.round(data.x / 100);
              //     if (targetIdx >= 0 && targetIdx < columns.length) {
              //       handleDrag(idx, targetIdx);
              //     }
              //   }}
              // >
              <th
                className="p-2 whitespace-nowrap cursor-pointer"
                onClick={() =>
                  col.key !== "actions" ? toggleSort(col.key) : null
                }
              >
                {col.label}
                {sortField === col.key && (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>
              // </Draggable>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((product) => (
            <tr key={product.id} className="border-t hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-2 text-xs">
                  {col.key === "actions" ? (
                    <div className="flex gap-2">
                      <button className="text-blue-600">View</button>
                      <button className="text-green-600">Edit</button>
                      <button className="text-red-600">Delete</button>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 text-white px-2 rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    product[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {Math.ceil(products.length / PRODUCTS_PER_PAGE)}
        </span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() =>
            setPage((p) =>
              Math.min(p + 1, Math.ceil(products.length / PRODUCTS_PER_PAGE))
            )
          }
          disabled={page === Math.ceil(products.length / PRODUCTS_PER_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
