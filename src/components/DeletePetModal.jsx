"use client";

import { useState } from "react";
import { X, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function DeletePetModal({ pet, onClose, onDeleted }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/courses/delete/${pet._id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) {
                const err = await res.json();
                toast.error(err.message || "Failed to delete pet");
                return;
            }
            toast.success(`"${pet.petName}" deleted successfully`);
            onDeleted(pet._id);
            onClose();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-xl">
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900">Delete Pet</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-4">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-red-700 text-sm">This action cannot be undone</p>
                            <p className="text-red-600 text-sm mt-1">
                                Are you sure you want to permanently delete{" "}
                                <span className="font-black">"{pet.petName}"</span>? All associated adoption requests will also be lost.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors disabled:opacity-60"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            {loading ? "Deleting..." : "Yes, Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
