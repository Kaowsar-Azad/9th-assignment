import { Button, Chip } from "@heroui/react";
import { BookOpen, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = ({ pet }) => {
    const { _id, petName, imageUrl, species, adoptionFee, age, ownerEmail, breed } = pet;
    return (
        <div
            className="group flex flex-col bg-white rounded-4xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
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
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 text-slate-900">
                        {petName}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                        Owner: <span className="text-slate-900 truncate max-w-48">{ownerEmail}</span>
                    </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {age && !String(age).toLowerCase().includes('year') ? `${age} Years` : age}
                    </span>
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> {breed}
                    </span>
                </div>

                <div className="pt-6 mt-auto border-t border-slate-100 flex flex-col gap-3">
                    <span className="text-2xl font-black text-blue-600">{adoptionFee}</span>
                    <div className="flex gap-2 w-full">
                        <Link href={`/courses/${_id}`} className="flex-1">
                            <Button
                                variant="flat"
                                color="primary"
                                className="w-full font-bold rounded-xl"
                            >
                                View Details
                            </Button>
                        </Link>
                        <Button
                            color="success"
                            className="flex-1 font-bold rounded-xl text-white"
                        >
                            Adopted
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;