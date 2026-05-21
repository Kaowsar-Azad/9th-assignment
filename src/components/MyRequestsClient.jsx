"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, XCircle, Loader2 } from "lucide-react";
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

    const total = requests.length;
    const pending = requests.filter((r) => r.status === "Pending").length;
    const approved = requests.filter((r) => r.status === "Approved").length;
    const rejected = requests.filter((r) => r.status === "Rejected").length;

    const handleCancel = async (enrollmentId) => {
        if (!confirm("Are you sure you want to cancel this adoption request?")) return;
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
                <span className="px-3 py-1 bg-violet-50 text-violet-600 border border-violet-100 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                    My Dashboard
                </span>
                <h1 className="text-3xl font-black text-slate-900">My Adoption Requests</h1>
                <p className="text-slate-500 font-medium">Track the status of all your adoption requests here.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total", value: total, cls: "bg-white border-slate-200 text-slate-900" },
                    { label: "Pending", value: pending, cls: "bg-amber-50 border-amber-200 text-amber-700" },
                    { label: "Approved", value: approved, cls: "bg-emerald-50 border-emerald-200 text-emerald-700" },
                    { label: "Rejected", value: rejected, cls: "bg-red-50 border-red-200 text-red-700" },
                ].map((s, i) => (
                    <div key={i} className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center shadow-sm ${s.cls}`}>
                        <span className="text-3xl font-black">{s.value}</span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-75">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                {requests.length === 0 ? (
                    <div className="p-16 text-center space-y-4">
                        <p className="text-slate-500 font-medium">No requests submitted yet</p>
                        <Link href="/courses">
                            <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                                Browse Pets
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Pet Name</th>
                                    <th className="px-6 py-4">Request Date</th>
                                    <th className="px-6 py-4">Pickup Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {requests.map((req) => {
                                    const petId = petMap[req.courseTitle];
                                    const status = req.status || "Pending";
                                    return (
                                        <tr key={req._id} className="hover:bg-slate-50/40 transition-colors">
                                            <td className="px-6 py-5 font-bold text-slate-900">{req.courseTitle}</td>
                                            <td className="px-6 py-5 text-sm text-slate-600">
                                                {new Date(req.enrolledAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-600">
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
                                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors">
                                                                <Eye className="w-3.5 h-3.5" /> View
                                                            </button>
                                                        </Link>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 font-medium">N/A</span>
                                                    )}

                                                    {status === "Pending" && (
                                                        <button
                                                            onClick={() => handleCancel(req._id)}
                                                            disabled={cancellingId === req._id}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-bold rounded-xl text-xs transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
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
                )}
            </div>
        </div>
    );
}
