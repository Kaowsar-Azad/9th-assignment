"use client";

import { useState } from "react";
import { Input, Button, TextArea } from "@heroui/react";
import {
    BookPlus,
    Image as ImageIcon,
    DollarSign,
    Clock,
    List,
    ChevronDown,
    Heart,
    MapPin,
    Mail,
    ShieldCheck,
    PawPrint,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

// This component gets the user email and handles the form
export default function AddPetForm({ ownerEmail }) {
    const router = useRouter();

    // loading state to show spinner on submit button
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Get all form data
        const formData = new FormData(e.currentTarget);

        const petData = {
            petName: formData.get("petName"),
            description: formData.get("description"),
            imageUrl: formData.get("imageUrl"),
            species: formData.get("species"),
            breed: formData.get("breed"),
            age: formData.get("age"),
            gender: formData.get("gender"),
            healthStatus: formData.get("healthStatus"),
            vaccinationStatus: formData.get("vaccinationStatus"),
            location: formData.get("location"),
            adoptionFee: formData.get("adoptionFee"),
            ownerEmail: formData.get("ownerEmail"),
        };

        try {
            const { data: jwtData } = await authClient.token();
            const token = jwtData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/courses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(petData),
                }
            );

            if (!res.ok) {
                // If server returned an error
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to add pet. Please try again.");
                return;
            }

            const data = await res.json();

            if (data?.insertedId) {
                // Success! Show toast and redirect
                toast.success("Pet added successfully! 🐾");
                router.push("/dashboard/my-listings");
            } else {
                toast.error("Something went wrong. Please try again.");
            }

        } catch (error) {
            // Network or other error
            toast.error("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-4">
            <div className="bg-white dark:bg-slate-950 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors duration-300">
                <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600/10 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 transition-colors">
                        <BookPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">
                        Add New{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                            Pet
                        </span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
                        Help a pet find a loving home
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pet Name */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="petName" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Pet Name
                            </label>
                            <Input
                                id="petName"
                                name="petName"
                                required
                                placeholder="e.g. Max"
                                className="w-full h-14 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Description
                            </label>
                            <TextArea
                                id="description"
                                required
                                name="description"
                                placeholder="Tell us about the pet..."
                                className="w-full h-32 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none resize-none"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="imageUrl" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Image URL
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="imageUrl"
                                    name="imageUrl"
                                    required
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Species */}
                        <div className="space-y-2">
                            <label htmlFor="species" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Species
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10 pointer-events-none">
                                    <List className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="absolute right-4 z-10 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <select
                                    id="species"
                                    name="species"
                                    required
                                    defaultValue=""
                                    className="w-full h-14 pl-12 pr-10 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-300 shadow-none outline-none appearance-none text-slate-600 dark:text-slate-200 font-medium cursor-pointer"
                                >
                                    <option value="" disabled>Select species</option>
                                    {SPECIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Breed */}
                        <div className="space-y-2">
                            <label htmlFor="breed" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Breed
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <PawPrint className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="breed"
                                    required
                                    name="breed"
                                    type="text"
                                    placeholder="e.g. Golden Retriever"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label htmlFor="age" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Age
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="age"
                                    required
                                    name="age"
                                    type="text"
                                    placeholder="e.g. 2 Years"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label htmlFor="gender" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Gender
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10 pointer-events-none">
                                    <List className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="absolute right-4 z-10 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    defaultValue=""
                                    className="w-full h-14 pl-12 pr-10 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white dark:bg-slate-900 transition-all duration-300 shadow-none outline-none appearance-none text-slate-600 dark:text-slate-200 font-medium cursor-pointer"
                                >
                                    <option value="" disabled>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                        </div>

                        {/* Health Status */}
                        <div className="space-y-2">
                            <label htmlFor="healthStatus" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Health Status
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Heart className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="healthStatus"
                                    required
                                    name="healthStatus"
                                    type="text"
                                    placeholder="e.g. Excellent"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Vaccination Status */}
                        <div className="space-y-2">
                            <label htmlFor="vaccinationStatus" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Vaccination Status
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="vaccinationStatus"
                                    required
                                    name="vaccinationStatus"
                                    type="text"
                                    placeholder="e.g. Fully Vaccinated"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Location
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="location"
                                    required
                                    name="location"
                                    type="text"
                                    placeholder="e.g. Dhaka"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Adoption Fee */}
                        <div className="space-y-2">
                            <label htmlFor="adoptionFee" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Adoption Fee
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <DollarSign className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="adoptionFee"
                                    name="adoptionFee"
                                    required
                                    type="text"
                                    placeholder="e.g. 5000 BDT"
                                    className="w-full h-14 pl-12 pr-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        {/* Owner Email - auto filled, read only */}
                        <div className="space-y-2">
                            <label htmlFor="ownerEmail" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Owner Email
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="ownerEmail"
                                    name="ownerEmail"
                                    required
                                    type="email"
                                    defaultValue={ownerEmail}
                                    readOnly
                                    className="w-full h-14 pl-12 pr-4 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button
                            variant="flat"
                            size="lg"
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 font-bold rounded-2xl h-14"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="flex-2 font-black rounded-2xl h-14 shadow-xl shadow-blue-600/20"
                        >
                            {loading ? "Adding..." : "Add Pet"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
