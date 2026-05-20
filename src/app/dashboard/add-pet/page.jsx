import {
    Input,
    Button,
    TextArea,
} from '@heroui/react';

import { BookPlus, Image as ImageIcon, DollarSign, Clock, List, ChevronDown, Heart, MapPin, Mail, ShieldCheck, PawPrint } from 'lucide-react';
import { redirect } from 'next/navigation';
import { addCourse } from "@/lib/pet/data";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const SPECIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];

export default async function AddPetDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const handleAddCourse = async (formData) => {
        "use server"
        const data = await addCourse(formData)
        if (data?.insertedId) {
            redirect("/courses")
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-4">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
                <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                        <BookPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Add New{' '}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Pet</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Help a pet find a loving home</p>
                </div>

                <form
                    action={handleAddCourse}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pet Name */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="petName" className="text-sm font-bold text-slate-700 ml-1">Pet Name</label>
                            <Input id="petName" name="petName" required placeholder="e.g. Max" className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none" />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="description" className="text-sm font-bold text-slate-700 ml-1">Description</label>
                            <TextArea id="description" required name="description" placeholder="Tell us about the pet..." className="w-full h-32 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none resize-none" />
                        </div>

                        {/* Image URL */}
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="imageUrl" className="text-sm font-bold text-slate-700 ml-1">Image URL</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="imageUrl" name='imageUrl' required type="url" placeholder="https://images.unsplash.com/..." className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Species */}
                        <div className="space-y-2">
                            <label htmlFor="species" className="text-sm font-bold text-slate-700 ml-1">Species</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10 pointer-events-none">
                                    <List className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="absolute right-4 z-10 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <select id="species" name="species" required defaultValue="" className="w-full h-14 pl-12 pr-10 border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none appearance-none text-slate-600 font-medium cursor-pointer">
                                    <option value="" disabled>Select species</option>
                                    {SPECIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Breed */}
                        <div className="space-y-2">
                            <label htmlFor="breed" className="text-sm font-bold text-slate-700 ml-1">Breed</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <PawPrint className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="breed" required name="breed" type="text" placeholder="e.g. Golden Retriever" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label htmlFor="age" className="text-sm font-bold text-slate-700 ml-1">Age</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="age" required name="age" type="text" placeholder="e.g. 2 Years" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label htmlFor="gender" className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10 pointer-events-none">
                                    <List className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="absolute right-4 z-10 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <select id="gender" name="gender" required defaultValue="" className="w-full h-14 pl-12 pr-10 border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none appearance-none text-slate-600 font-medium cursor-pointer">
                                    <option value="" disabled>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unknown">Unknown</option>
                                </select>
                            </div>
                        </div>

                        {/* Health Status */}
                        <div className="space-y-2">
                            <label htmlFor="healthStatus" className="text-sm font-bold text-slate-700 ml-1">Health Status</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Heart className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="healthStatus" required name="healthStatus" type="text" placeholder="e.g. Excellent" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Vaccination Status */}
                        <div className="space-y-2">
                            <label htmlFor="vaccinationStatus" className="text-sm font-bold text-slate-700 ml-1">Vaccination Status</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <ShieldCheck className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="vaccinationStatus" required name="vaccinationStatus" type="text" placeholder="e.g. Fully Vaccinated" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-sm font-bold text-slate-700 ml-1">Location</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="location" required name="location" type="text" placeholder="e.g. Dhaka" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Adoption Fee */}
                        <div className="space-y-2">
                            <label htmlFor="adoptionFee" className="text-sm font-bold text-slate-700 ml-1">Adoption Fee</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <DollarSign className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="adoptionFee" name="adoptionFee" required type="text" placeholder="e.g. 5000 BDT" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                        {/* Owner Email */}
                        <div className="space-y-2">
                            <label htmlFor="ownerEmail" className="text-sm font-bold text-slate-700 ml-1">Owner Email</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input id="ownerEmail" name="ownerEmail" required type="email" defaultValue={session?.user?.email || ""} readOnly placeholder="e.g. owner1@example.com" className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none" />
                            </div>
                        </div>

                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button variant="flat" size="lg" className="flex-1 font-bold rounded-2xl h-14">
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" size="lg" className="flex-2 font-black rounded-2xl h-14 shadow-xl shadow-blue-600/20">
                            Add Pet
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
