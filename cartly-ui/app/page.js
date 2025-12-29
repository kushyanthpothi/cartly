"use client";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Derived Categories
  const categories = ["All", ...new Set(products.map(p => p.productCategory).filter(Boolean))];

  // Filter Logic
  const filteredProducts = products.filter(product => {
    // Category Filter
    if (selectedCategory !== "All" && product.productCategory !== selectedCategory) return false;

    // Price Filter (Max)
    if (maxPrice && product.productPrice > parseFloat(maxPrice)) return false;

    // Rating Filter
    if (minRating > 0 && (product.productRating || 0) < minRating) return false;

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Filter Bar Section (Replaces Hero) */}
      <div className="bg-white border-b border-gray-100 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-gray-50 text-slate-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Secondary Filters */}
            <div className="flex items-center gap-4 border-l pl-4 border-gray-100">
              {/* Price Max Input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Rating Dropdown */}
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="py-2 pl-3 pr-8 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="0">All Ratings</option>
                <option value="4">4★ & Up</option>
                <option value="3">3★ & Up</option>
                <option value="2">2★ & Up</option>
              </select>

              {/* Reset Button */}
              {(selectedCategory !== "All" || maxPrice || minRating > 0) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setMaxPrice("");
                    setMinRating(0);
                  }}
                  className="text-sm text-red-500 font-medium hover:text-red-700 underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Showing {filteredProducts.length} results
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-slate-900">No products match your filters</h3>
            <p className="text-slate-500 mt-2">Try adjusting your price or category.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice("");
                setMinRating(0);
              }}
              className="mt-6 text-indigo-600 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
