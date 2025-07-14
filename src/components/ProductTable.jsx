import React, { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../context/cartContext";
// import Draggable from "react-draggable";
import { debounce, searchProducts } from "../utils/search";

const ProductTable = ({ allProducts, query, setQuery }) => {
  const [products, setProducts] = useState([]);
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

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const toggleSort = (key) => {
    if (sortField === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(key);
      setSortOrder("asc");
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page
      pageNumbers.push(1);
      
      // Calculate start and end of middle pages
      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);
      
      // Adjust if we're near the beginning
      if (page <= 3) {
        end = Math.min(totalPages - 1, 4);
      }
      
      // Adjust if we're near the end
      if (page >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if there's a gap
      if (start > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if there's a gap
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const handlePageClick = (pageNum) => {
    if (pageNum !== '...' && pageNum !== page) {
      setPage(pageNum);
    }
  };

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
              <th
                key={col.key}
                className="p-2 whitespace-nowrap cursor-pointer"
                onClick={() =>
                  col.key !== "actions" ? toggleSort(col.key) : null
                }
              >
                {col.label}
                {sortField === col.key && (sortOrder === "asc" ? " ▲" : " ▼")}
              </th>
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

      {/* Updated Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2 text-sm">
        {/* Previous button */}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) => (
          <button
            key={index}
            className={`px-3 py-1 border rounded ${
              pageNum === page
                ? "bg-indigo-600 text-white"
                : pageNum === '...'
                ? "cursor-default"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageClick(pageNum)}
            disabled={pageNum === '...'}
          >
            {pageNum}
          </button>
        ))}

        {/* Next button */}
        <button
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Page info */}
      <div className="text-center mt-2 text-xs text-gray-600">
        Showing {(page - 1) * PRODUCTS_PER_PAGE + 1} to {Math.min(page * PRODUCTS_PER_PAGE, products.length)} of {products.length} results
      </div>
    </div>
  );
};

export default ProductTable;