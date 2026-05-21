"use client";

import { useState } from "react";
import { X, Pencil, Loader2, Image as ImageIcon, DollarSign, Clock, List, ChevronDown, Heart, MapPin, ShieldCheck, PawPrint } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

export default function EditPetModal({ pet, onClose, onUpdated }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        petName: pet.petName || "",
        description: pet.description || "",
        imageUrl: pet.imageUrl || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        gender: pet.gender || "",
        healthStatus: pet.healthStatus || "",
        vaccinationStatus: pet.vaccinationStatus || "",
        location: pet.location || "",
        adoptionFee: pet.adoptionFee || "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/courses/update/${pet._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );
            if (!res.ok) {
                const err = await res.json();
                toast.error(err.message || "Failed to update pet");
                return;
            }
            toast.success(`"${form.petName}" updated successfully!`);
            onUpdated({ ...pet, ...form });
            onClose();
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full h-12 px-4 bg-white border border-slate-200 hover:border-violet-400 focus:border-violet-500 rounded-xl font-medium text-slate-800 outline-none transition-all text-sm";
    const labelClass = "text-xs font-bold text-slate-600 block mb-1.5";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-slate-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-violet-50 rounded-xl">
                            <Pencil className="w-5 h-5 text-violet-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Edit Pet</h2>
                            <p className="text-sm text-slate-500 font-medium">{pet.petName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500 hover:text-slate-800"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="md:col-span-2">
                            <label className={labelClass}>Pet Name</label>
                            <input name="petName" required value={form.petName} onChange={handleChange}
                                placeholder="e.g. Max" className={inputClass} />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Description</label>
                            <textarea name="description" required value={form.description} onChange={handleChange}
                                placeholder="Tell us about the pet..."
                                className="w-full min-h-[90px] p-3 bg-white border border-slate-200 hover:border-violet-400 focus:border-violet-500 rounded-xl font-medium text-slate-800 outline-none transition-all text-sm resize-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="imageUrl" required type="url" value={form.imageUrl} onChange={handleChange}
                                    placeholder="https://..." className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Species</label>
                            <div className="relative">
                                <List className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <select name="species" required value={form.species} onChange={handleChange}
                                    className={`${inputClass} pl-10 pr-10 appearance-none cursor-pointer`}>
                                    <option value="">Select species</option>
                                    {SPECIES.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Breed</label>
                            <div className="relative">
                                <PawPrint className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="breed" required value={form.breed} onChange={handleChange}
                                    placeholder="e.g. Golden Retriever" className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Age</label>
                            <div className="relative">
                                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="age" required value={form.age} onChange={handleChange}
                                    placeholder="e.g. 2 Years" className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Gender</label>
                            <div className="relative">
                                <List className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                <select name="gender" required value={form.gender} onChange={handleChange}
                                    className={`${inputClass} pl-10 pr-10 appearance-none cursor-pointer`}>
                                    <option value="">Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Unknown</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Health Status</label>
                            <div className="relative">
                                <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="healthStatus" required value={form.healthStatus} onChange={handleChange}
                                    placeholder="e.g. Excellent" className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Vaccination Status</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="vaccinationStatus" required value={form.vaccinationStatus} onChange={handleChange}
                                    placeholder="e.g. Fully Vaccinated" className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="location" required value={form.location} onChange={handleChange}
                                    placeholder="e.g. Dhaka" className={`${inputClass} pl-10`} />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Adoption Fee</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input name="adoptionFee" required value={form.adoptionFee} onChange={handleChange}
                                    placeholder="e.g. 5000 BDT" className={`${inputClass} pl-10`} />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-6 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold transition-colors disabled:opacity-60"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Pencil className="w-4 h-4" />}
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
