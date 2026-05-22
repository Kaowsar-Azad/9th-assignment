"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, XCircle, Loader2, X, AlertTriangle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const statusStyles = {
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function MyRequestsClient({ initialRequests, petMap, stats }) {
    const [requests, setRequests] = useState(initialRequests);
    const [cancellingId, setCancellingId] = useState(null);
    const [cancelModalPet, setCancelModalPet] = useState(null);

    const total = requests.length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const approved = requests.filter((r) => r.status === "Approved").length;
    const rejected = requests.filter((r) => r.status === "Rejected").length;

    const handleCancel = async (enrollmentId) => {
        setCancellingId(enrollmentId);
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollments/cancel/${enrollmentId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) {
                toast.error("Failed to cancel request");
                return;
            }
            toast.success("Adoption request cancelled");
            setRequests((prev) => prev.filter((r) => r._id !== enrollmentId));
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setCancellingId(null);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <span className="px-3 py-1 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2 transition-colors">
                    My Dashboard
                </span>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white transition-colors">My Adoption Requests</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Track the status of all your adoption requests here.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total", value: total, cls: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white" },
                    { label: "Pending", value: pending, cls: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400" },
                    { label: "Approved", value: approved, cls: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400" },
                    { label: "Rejected", value: rejected, cls: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400" },
                ].map((s, i) => (
                    <div key={i} className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center shadow-sm ${s.cls}`}>
                        <span className="text-3xl font-black">{s.value}</span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-75">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
                {requests.length === 0 ? (
                    <div className="p-16 text-center space-y-4">
                        <p className="text-slate-500 dark:text-slate-400 font-medium">No requests submitted yet</p>
                        <Link href="/courses">
                            <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                                Browse Pets
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Mobile Cards View */}
                        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                            {requests.map((req) => {
                                const petData = petMap[req.courseId] || petMap[req.courseTitle] || {};
                                const petId = petData.id;
                                const petImage = petData.imageUrl;
                                const status = req.status || "Pending";
                                return (
                                    <div key={req._id} className="p-5 space-y-4">
                                        <div className="flex items-center gap-3.5">
                                            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800/50">
                                                <Image
                                                    src={petImage || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                                                    alt={req.courseTitle}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="font-extrabold text-slate-900 dark:text-white transition-colors truncate text-sm">{req.courseTitle}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${statusStyles[status] || statusStyles.Pending}`}>
                                                        {status}
                                                    </span>
                                                </div>
                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
                                                    Req: {new Date(req.enrolledAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                            Preferred Pickup: <span className="font-bold text-slate-800 dark:text-slate-200">{req.pickupDate ? new Date(req.pickupDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "Not specified"}</span>
                                        </div>
                                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/40">
                                            {petId ? (
                                                <Link href={`/courses/${petId}`}>
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors">
                                                        <Eye className="w-3.5 h-3.5" /> View
                                                    </button>
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">N/A</span>
                                            )}
                                            {status === "Pending" && (
                                                <button
                                                    onClick={() => setCancelModalPet(req)}
                                                    disabled={cancellingId === req._id}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold rounded-xl text-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    {cancellingId === req._id
                                                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        : <XCircle className="w-3.5 h-3.5" />}
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider transition-colors">
                                        <th className="px-6 py-4">Pet Name</th>
                                        <th className="px-6 py-4">Request Date</th>
                                        <th className="px-6 py-4">Pickup Date</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                                    {requests.map((req) => {
                                        const petData = petMap[req.courseId] || petMap[req.courseTitle] || {};
                                        const petId = petData.id;
                                        const petImage = petData.imageUrl;
                                        const status = req.status || "Pending";
                                        return (
                                            <tr key={req._id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/40 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800/50">
                                                            <Image
                                                                src={petImage || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                                                                alt={req.courseTitle}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <span className="font-bold text-slate-900 dark:text-slate-100">
                                                            {req.courseTitle}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                    {new Date(req.enrolledAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                </td>
                                                <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                                                    {req.pickupDate
                                                        ? new Date(req.pickupDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                                                        : "—"}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[status] || statusStyles.Pending}`}>
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {petId ? (
                                                            <Link href={`/courses/${petId}`}>
                                                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors">
                                                                    <Eye className="w-3.5 h-3.5" /> View
                                                                </button>
                                                            </Link>
                                                        ) : (
                                                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">N/A</span>
                                                        )}

                                                        {status === "Pending" && (
                                                            <button
                                                                onClick={() => setCancelModalPet(req)}
                                                                disabled={cancellingId === req._id}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold rounded-xl text-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                                            >
                                                                {cancellingId === req._id
                                                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                    : <XCircle className="w-3.5 h-3.5" />}
                                                                Cancel
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* Cancel Adoption Request Confirmation Modal */}
            {cancelModalPet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-xl transition-colors">
                                    <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white transition-colors">Cancel Request</h2>
                            </div>
                            <button
                                onClick={() => setCancelModalPet(null)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-5 sm:p-6 space-y-5">
                            <p className="text-slate-650 dark:text-slate-350 text-sm transition-colors leading-relaxed">
                                Are you sure you want to cancel your adoption request for <span className="font-extrabold text-slate-900 dark:text-white">"{cancelModalPet.courseTitle}"</span>? This action will remove the request permanently.
                            </p>

                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                <button
                                    onClick={() => setCancelModalPet(null)}
                                    className="w-full sm:flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-colors text-sm sm:text-base cursor-pointer"
                                >
                                    No, Keep Request
                                </button>
                                <button
                                    onClick={() => {
                                        handleCancel(cancelModalPet._id);
                                        setCancelModalPet(null);
                                    }}
                                    className="w-full sm:flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                                >
                                    Yes, Cancel Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
