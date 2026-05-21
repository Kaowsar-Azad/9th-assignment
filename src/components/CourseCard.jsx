"use client";

import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const CourseCard = ({ pet }) => {
    const { _id, petName, imageUrl, species, adoptionFee, age, ownerEmail, breed } = pet;

    // Get the current logged in session
    const { data: session } = useSession();
    const router = useRouter();

    
    const handleAdoptNow = () => {
        if (!session?.user) {
           
            router.push("/login");
            return;
        }
    
        router.push(`/courses/${_id}`);
    };

    return (
        <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-4xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative overflow-hidden aspect-16/10">
                <Image
                    alt="Pet Image"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    src={imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                    fill
                />
                <div className="absolute top-4 right-4">
                    <Chip
                        color="primary"
                        variant="solid"
                        className="font-bold shadow-lg shadow-blue-600/20"
                    >
                        {species}
                    </Chip>
                </div>
            </div>

            <div className="p-8 flex flex-col grow space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900 dark:text-white transition-colors">
                        {petName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 transition-colors">
                        Owner: <span className="text-slate-900 dark:text-slate-200 truncate max-w-48 transition-colors">{ownerEmail}</span>
                    </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-bold transition-colors">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {age && !String(age).toLowerCase().includes('year') ? `${age} Years` : age}
                    </span>
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {breed}
                    </span>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3 transition-colors">
                    <span className="text-2xl font-black text-blue-600">{adoptionFee}</span>
                    <div className="flex gap-2 w-full">
                        {/* View Details - always works */}
                        <Link href={`/courses/${_id}`} className="flex-1">
                            <Button
                                variant="flat"
                                color="primary"
                                className="w-full font-bold rounded-xl"
                            >
                                View Details
                            </Button>
                        </Link>

                        {/* Adopt Now - checks login first */}
                        <button
                            onClick={handleAdoptNow}
                            className="flex-1 font-bold rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 py-2 px-4"
                        >
                            Adopt Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;