"use client";
import Link from "next/link";
import { ShoppingCart, LogOut, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Import useCart

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart(); // Use the hook

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
                            <ShoppingCart className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">Cartly</span>
                    </Link>

                    {/* Search Bar - Visual only for now */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search essentials, groceries..."
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                        />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="hidden sm:block font-medium text-slate-600">Hi, {user.name?.split(' ')[0] || "User"}</span>
                                <button
                                    onClick={logout}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-full transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        )}

                        <Link href="/cart" className="flex items-center gap-2 group">
                            <div className="relative p-2 text-gray-500 group-hover:text-indigo-600 transition-colors rounded-full group-hover:bg-indigo-50">
                                <ShoppingCart className="h-6 w-6" />
                                {/* Cart Count Badge */}
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 ring-2 ring-white text-white text-xs font-bold flex items-center justify-center transform translate-x-1/4 -translate-y-1/4 animate-bounce-in">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden sm:block font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
