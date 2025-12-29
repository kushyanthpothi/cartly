"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Fetch Cart Items and Products to join data
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        async function fetchData() {
            try {
                const [cartRes, productsRes] = await Promise.all([
                    fetch("/api/cartStatus"),
                    fetch("/api/products")
                ]);

                if (cartRes.ok && productsRes.ok) {
                    const allCartItems = await cartRes.json();
                    const products = await productsRes.json();

                    // Filter cart items for current user
                    // API returns flat structure: { cartId, userId, productId, quantity }
                    // API returns products as: { productId, productName, ... }

                    const userCartItems = allCartItems.filter(item => item.userId === (user.id || user.userId));

                    // Merge product details
                    const mergedItems = userCartItems.map(item => {
                        const product = products.find(p => p.productId === item.productId);
                        return {
                            ...item,
                            id: item.cartId, // Use cartId as unique key
                            product: product || {
                                name: "Unknown Product",
                                price: 0,
                                description: "Product details not found",
                                image: null
                            }
                        };
                    });

                    setCartItems(mergedItems);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [user]);

    const { refreshCart } = useCart(); // Add hook

    const handleUpdateQuantity = async (cartId, newQuantity) => {
        // Optimistic update
        const previousItems = [...cartItems];
        setCartItems(prev => prev.map(item =>
            item.id === cartId ? { ...item, quantity: newQuantity } : item
        ));

        try {
            const itemToUpdate = cartItems.find(item => item.id === cartId);
            if (!itemToUpdate) return;

            const response = await fetch(`/api/cartStatus/${cartId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id || user.userId,
                    productId: itemToUpdate.productId,
                    quantity: newQuantity
                })
            });

            if (!response.ok) {
                setCartItems(previousItems);
                alert("Failed to update quantity");
            }
        } catch (error) {
            setCartItems(previousItems);
            console.error("Error updating cart:", error);
        }
    };

    const handleRemove = async (cartId) => {
        // Optimistic update
        const previousItems = [...cartItems];
        setCartItems(prev => prev.filter(item => item.id !== cartId));

        try {
            const response = await fetch(`/api/cartStatus/${cartId}`, {
                method: "DELETE"
            });

            if (response.ok) { // Check for ok
                refreshCart(); // Update global count
            } else {
                setCartItems(previousItems);
                alert("Failed to delete item");
            }
        } catch (error) {
            setCartItems(previousItems);
            console.error("Error deleting item:", error);
        }
    };

    // Auth Guard
    if (!user && !loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
                <p className="text-gray-600 mb-6">You need to be logged in to view your cart.</p>
                <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                    Go to Login
                </Link>
            </div>
        );
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    const totalAmount = cartItems.reduce((sum, item) => {
        // Robust price check, handling string prices if API returns "1,20,000" or "₹599"
        let price = 0;
        if (item.product?.productPrice) {
            // Remove commas and currency symbols
            const cleanPrice = String(item.product.productPrice).replace(/[^0-9.]/g, '');
            price = parseFloat(cleanPrice) || 0;
        }
        return sum + (price * item.quantity);
    }, 0);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="h-8 w-8 text-indigo-600" />
                    Shopping Cart
                    <span className="text-lg font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{cartItems.length} items</span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="h-10 w-10 text-indigo-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products to find something you'll love.</p>
                        <Link href="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdate={handleUpdateQuantity}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>

                        {/* Price Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping Estimate</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Tax Estimate</span>
                                        <span className="font-medium">₹0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between text-2xl font-extrabold text-slate-900 border-t border-dashed border-gray-200 pt-6 mb-8">
                                    <span>Total</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>

                                <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2">
                                    Place Order
                                    <ArrowRight className="h-5 w-5" />
                                </button>

                                <p className="text-xs text-center text-slate-400 mt-4">
                                    Secure Checkout powered by Cartly
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
