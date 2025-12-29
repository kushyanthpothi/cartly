"use client";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartItem({ item, onUpdate, onRemove }) {
    // Assuming item structure has: id, quantity, product object (or fields like productName, price, image)
    const product = item.product || item;

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            {/* Image */}
            <div className="h-24 w-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100">
                {product.productImage ? (
                    <img src={product.productImage} alt={product.productName} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-gray-300 font-bold text-3xl">{product.productName?.charAt(0)}</span>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 w-full text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">{product.productName}</h3>
                <p className="text-slate-500 text-sm mt-1 line-clamp-1">{product.productDescription}</p>
                <p className="text-indigo-600 font-bold mt-2 text-lg">₹{product.productPrice}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-row sm:flex-col items-center gap-4 w-full sm:w-auto justify-between sm:justify-center">
                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                    <button
                        onClick={() => onUpdate(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 bg-white rounded-md shadow-sm hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-700">{item.quantity}</span>
                    <button
                        onClick={() => onUpdate(item.id, item.quantity + 1)}
                        className="p-2 bg-white rounded-md shadow-sm hover:text-indigo-600 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>

                <button
                    onClick={() => onRemove(item.id)}
                    className="group flex items-center text-slate-400 hover:text-red-500 font-medium text-sm transition-colors py-1 px-2 rounded-md hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4 mr-1 group-hover:scale-110 transition-transform" />
                    Remove
                </button>
            </div>
        </div>
    );
}
