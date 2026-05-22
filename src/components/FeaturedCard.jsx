"use client";

import { Chip, Button } from "@heroui/react";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const FeaturedCard = ({ pet }) => {
    const { _id, imageUrl, petName, adoptionFee, species } = pet;
    const { data: session } = useSession();
    const router = useRouter();

    const handleAdoptNow = () => {
        if (!session?.user) {
            router.push(`/login?callbackUrl=/courses/${_id}?adopt=true`);
            return;
        }
        router.push(`/courses/${_id}?adopt=true`);
    };

    return (
        <div
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
            <div className="relative aspect-16/10 overflow-hidden">
                <Image src={imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'}
                    alt="Pet Image"
                    height={400}
                    width={640}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3">
                    <Chip
                        size="sm"
                        color="primary"
                        variant="solid"
                        className="font-bold text-[10px] uppercase"
                    >
                        {species}
                    </Chip>
                </div>
            </div>
            <div className="p-5 flex flex-col grow space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2 transition-colors">
                    {petName}
                </h4>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 pb-3 transition-colors">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors">
                        <Users className="w-3 h-3" />
                        <span>0</span>
                    </div>
                    <span className="font-black text-blue-600 dark:text-blue-500 transition-colors">{adoptionFee}</span>
                </div>
                <div className="flex gap-2 w-full mt-auto">
                    <Link href={`/courses/${_id}`} className="flex-1">
                        <Button
                            variant="flat"
                            color="primary"
                            className="w-full font-bold text-xs rounded-xl"
                        >
                            View Details
                        </Button>
                    </Link>
                    <button
                        onClick={handleAdoptNow}
                        className="flex-1 font-bold text-xs rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 py-2 px-4 cursor-pointer"
                    >
                        Adopt Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCard;