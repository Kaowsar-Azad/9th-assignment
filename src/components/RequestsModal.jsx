"use client";

import { useState, useEffect } from "react";
import { X, Check, XCircle, Users, Mail, Calendar, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RequestsModal({ pet, onClose, onUpdated }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollments/pet/${pet._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();
            setRequests(Array.isArray(data) ? data : []);
        } catch {
            toast.error("Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (enrollmentId, status) => {
        setUpdatingId(enrollmentId);
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollments/update/${enrollmentId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );
            if (!res.ok) throw new Error();

            if (status === "Approved") {
                const petRes = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/courses/update/${pet._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ status: "Adopted" }),
                    }
                );
                if (petRes.ok) {
                    pet.status = "Adopted";
                    if (onUpdated) {
                        onUpdated({ ...pet, status: "Adopted" });
                    }
                }
            }

            toast.success(`Request ${status}!`);
            setRequests((prev) =>
                prev.map((r) => (r._id === enrollmentId ? { ...r, status } : r))
            );
        } catch {
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const statusBadge = (status) => {
        const map = {
            Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
            Rejected: "bg-red-100 text-red-700 border-red-200",
            Pending: "bg-amber-100 text-amber-700 border-amber-200",
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${map[status] || map.Pending}`}>
                {status || "Pending"}
            </span>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col border border-slate-200 dark:border-slate-800 transition-colors">
                <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-50 dark:bg-violet-900/30 rounded-xl transition-colors">
                            <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white transition-colors">Adoption Requests</h2>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">{pet.petName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 p-5 sm:p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-16 gap-3 text-slate-500 dark:text-slate-400 transition-colors">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span className="font-medium">Loading requests...</span>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="text-center py-16 space-y-2">
                            <Users className="w-12 h-12 text-slate-200 dark:text-slate-700 mx-auto transition-colors" />
                            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">No adoption requests yet</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((req) => {
                                const isSettled = req.status === "Approved" || req.status === "Rejected";
                                return (
                                    <div key={req._id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            <div className="space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 transition-colors">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0">
                                                        {(req.studentName || "?")[0].toUpperCase()}
                                                    </div>
                                                    <span className="font-bold text-slate-900 dark:text-white truncate transition-colors">{req.studentName || "Unknown"}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ml-0 sm:ml-10 transition-colors">
                                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                                    <span className="truncate">{req.studentEmail}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ml-0 sm:ml-10 transition-colors">
                                                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                                                    <span>Pickup: {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Not specified"}</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0 self-start sm:self-auto">{statusBadge(req.status)}</div>
                                        </div>

                                        {req.message && (
                                            <div className="ml-0 sm:ml-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-3 transition-colors">
                                                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed transition-colors">{req.message}</p>
                                            </div>
                                        )}

                                        {!isSettled && pet.status !== "Adopted" && (
                                            <div className="flex gap-2 ml-0 sm:ml-10">
                                                <button
                                                    onClick={() => handleStatus(req._id, "Approved")}
                                                    disabled={updatingId === req._id}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {updatingId === req._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleStatus(req._id, "Rejected")}
                                                    disabled={updatingId === req._id}
                                                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {updatingId === req._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
