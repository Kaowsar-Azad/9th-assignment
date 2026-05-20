import { Button } from '@heroui/react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Eye, Plus } from 'lucide-react';
import Image from 'next/image';

export default async function MyListingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    // Fetch all pets
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        cache: 'no-store'
    });
    const allPets = await res.json() || [];

    // Filter pets created by the logged-in user
    const myListings = allPets.filter(pet => pet.ownerEmail === session.user.email);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white">My Listings</h1>
                    <p className="text-slate-400 font-medium">Manage the pets you have listed for adoption.</p>
                </div>
                <Link href="/dashboard/add-pet">
                    <Button 
                        color="primary" 
                        startContent={<Plus className="w-4 h-4" />} 
                        className="font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 border-none shadow-lg shadow-indigo-600/10"
                    >
                        Add New Pet
                    </Button>
                </Link>
            </div>

            {/* Listings Table */}
            <div className="bg-[#131b2e] rounded-2xl border border-slate-855 overflow-hidden shadow-xl">
                {myListings.length === 0 ? (
                    <div className="p-16 text-center space-y-4">
                        <p className="text-slate-400 font-medium">You haven't listed any pets for adoption yet.</p>
                        <Link href="/dashboard/add-pet">
                            <Button color="primary" className="font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 border-none">
                                Add Your First Pet
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-[#17223b]/60 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Pet</th>
                                    <th className="px-6 py-4">Species</th>
                                    <th className="px-6 py-4">Breed</th>
                                    <th className="px-6 py-4">Adoption Fee</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                                {myListings.map((pet) => (
                                    <tr key={pet._id} className="hover:bg-[#1a243d]/30 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                                                <Image 
                                                    src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'} 
                                                    alt={pet.petName} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="font-bold text-white">{pet.petName}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">{pet.species}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">{pet.breed || 'N/A'}</td>
                                        <td className="px-6 py-4 font-bold text-indigo-400">{pet.adoptionFee}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/courses/${pet._id}`}>
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    startContent={<Eye className="w-4 h-4" />}
                                                    className="font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border-none"
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
