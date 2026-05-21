"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil, Users, Trash2, List, ShieldCheck, Heart, Plus } from "lucide-react";
import RequestsModal from "@/components/RequestsModal";
import EditPetModal from "@/components/EditPetModal";
import DeletePetModal from "@/components/DeletePetModal";

export default function MyListingsClient({ myListings: initialListings }) {
    const [listings, setListings] = useState(initialListings);
    const [requestsModal, setRequestsModal] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);

    const handleUpdated = (updatedPet) => {
        setListings((prev) => prev.map((p) => (p._id === updatedPet._id ? updatedPet : p)));
    };

    const handleDeleted = (deletedId) => {
        setListings((prev) => prev.filter((p) => p._id !== deletedId));
    };

    const totalListings = listings.length;
    const availableListings = listings.filter((p) => p.status !== "Adopted").length;
    const adoptedListings = listings.filter((p) => p.status === "Adopted").length;

    return (
        <div className="space-y-8">
            {requestsModal && (
                <RequestsModal pet={requestsModal} onClose={() => setRequestsModal(null)} />
            )}
            {editModal && (
                <EditPetModal
                    pet={editModal}
                    onClose={() => setEditModal(null)}
                    onUpdated={handleUpdated}
                />
            )}
            {deleteModal && (
                <DeletePetModal
                    pet={deleteModal}
                    onClose={() => setDeleteModal(null)}
                    onDeleted={handleDeleted}
                />
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <span className="px-3 py-1 bg-violet-50 text-violet-600 border border-violet-100 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
                        My Dashboard
                    </span>
                    <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                        My Listings
                    </h1>
                    <p className="text-slate-500 font-medium">Manage the pets you have listed for adoption.</p>
                </div>
                <Link href="/dashboard/add-pet">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 hover:opacity-90 transition-opacity text-sm">
                        <Plus className="w-4 h-4" />
                        Add New Pet
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                    { label: "Total Listings", value: totalListings, icon: List, bg: "bg-white border-slate-200 text-slate-800" },
                    { label: "Available", value: availableListings, icon: ShieldCheck, bg: "bg-emerald-50 border-emerald-100 text-emerald-800" },
                    { label: "Adopted", value: adoptedListings, icon: Heart, bg: "bg-indigo-50 border-indigo-100 text-indigo-800" },
                ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className={`p-6 border rounded-2xl flex items-center justify-between shadow-sm ${stat.bg}`}>
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider opacity-75 block mb-1">{stat.label}</span>
                                <span className="text-3xl font-black">{stat.value}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
                                <Icon className="w-6 h-6 text-slate-500" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {listings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center space-y-4 shadow-sm">
                    <p className="text-slate-500 font-medium">You haven{"'"}t listed any pets for adoption yet.</p>
                    <Link href="/dashboard/add-pet">
                        <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity">
                            Add Your First Pet
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                        >
                            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={pet.imageUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                                    alt={pet.petName}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${pet.status === "Adopted" ? "bg-indigo-500 text-white" : "bg-emerald-500 text-white"}`}>
                                    {pet.status || "Available"}
                                </span>
                            </div>

                            <div className="p-5 flex-1 flex flex-col gap-3">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-extrabold text-lg text-slate-900 leading-tight group-hover:text-violet-600 transition-colors">
                                            {pet.petName}
                                        </h3>
                                        <span className="font-black text-rose-500 text-base">{pet.adoptionFee}</span>
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                                        {pet.species} • {pet.breed || "N/A"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-auto">
                                    <Link href={`/courses/${pet._id}`} className="w-full">
                                        <button className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors">
                                            <Eye className="w-3.5 h-3.5" /> View
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => setEditModal(pet)}
                                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold rounded-xl text-xs transition-colors"
                                    >
                                        <Pencil className="w-3.5 h-3.5" /> Edit
                                    </button>

                                    <button
                                        onClick={() => setRequestsModal(pet)}
                                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs transition-colors"
                                    >
                                        <Users className="w-3.5 h-3.5" /> Requests
                                    </button>

                                    <button
                                        onClick={() => setDeleteModal(pet)}
                                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-xs transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
