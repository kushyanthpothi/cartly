"use client";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { user } = useAuth();
    const { refreshCart } = useCart();
    const router = useRouter();

    const addToCart = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        try {
            const response = await fetch("/api/cartStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id || user.userId, // Adjust based on actual user object structure
                    productId: product.productId,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                refreshCart(); // Refresh cart count
                alert("Added to cart!"); // Simple feedback for now
            } else {
                alert("Failed to add to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error adding to cart");
        }
    };

    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-indigo-100 ring-1 ring-gray-50/50 hover:ring-indigo-100 hover:-translate-y-1 relative">
            <div className="h-56 bg-gradient-to-tr from-gray-50 to-gray-100 relative flex items-center justify-center overflow-hidden group">
                {product.productImage ? (
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-gray-300 text-6xl font-black opacity-20">{product.productName?.charAt(0)}</span>
                )}

                {/* Quick Action Overlay (Optional Future Feature) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    {product.productCategory && (
                        <span className="text-xs font-semibold tracking-wider text-indigo-500 uppercase bg-indigo-50 px-2 py-1 rounded-full">
                            {product.productCategory}
                        </span>
                    )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight mb-2 group-hover:text-indigo-700 transition-colors">
                    {product.productName}
                </h3>

                <p className="text-slate-500 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                    {product.productDescription}
                </p>

                <div className="mt-auto border-t border-gray-50 pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-extrabold text-slate-900">
                            ₹{product.productPrice.toLocaleString()}
                        </span>
                        {product.productRating && (
                            <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                                <span className="text-yellow-400 mr-1">★</span>
                                <span className="text-sm font-bold text-green-700">{product.productRating}</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={addToCart}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:gap-3 active:scale-95"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
