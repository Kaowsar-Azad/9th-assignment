"use client";

import { isOwnPet } from "@/lib/pet/ownership";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Heart, User, Mail, Calendar, MessageSquare, Sparkles } from "lucide-react";

export default function AdoptionForm({ course }) {
    const { data: session } = useSession();
    const router = useRouter();
    const userEmail = session?.user?.email;
    const userName = session?.user?.name;
    const ownPet = isOwnPet(course, userEmail);

    const [pickupDate, setPickupDate] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEnroll = async (e) => {
        e.preventDefault();

        if (ownPet) {
            toast.error("You cannot adopt a pet you listed yourself.");
            return;
        }

        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;
        if (!token) {
            toast.error("Please log in to adopt this pet.");
            return;
        }

        setIsSubmitting(true);

        const updatedData = {
            userId: session?.user?.id,
            studentName: userName || session?.user?.name,
            studentEmail: userEmail || session?.user?.email,
            courseTitle: course?.petName,
            courseId: course?._id,
            thumbnail: course?.imageUrl,
            pickupDate: pickupDate,
            message: message,
            status: "Pending",
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/enrollments/${course?._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            if (res.status === 403) {
                const err = await res.json();
                toast.error(err?.message || "You cannot adopt your own pet.");
                return;
            }

            if (!res.ok) {
                toast.error("Something went wrong. Please try again.");
                return;
            }

            toast.success("Adoption request submitted!");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (ownPet) {
        return (
            <div className="bg-white/75 backdrop-blur-2xl border border-white/50 rounded-[24px] p-5 md:p-6 shadow-[0_12px_35px_rgba(16,185,129,0.08)] space-y-4">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-lg">
                    <Heart size={20} className="fill-rose-500" />
                    <h3>Request to Adopt {course?.petName}</h3>
                </div>
                <p className="text-slate-500 text-sm">
                    Fill out this form and the owner will review your request.
                </p>
                <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 text-center space-y-2">
                    <p className="text-sm font-semibold text-slate-700">Your Own Listing</p>
                    <p className="text-xs text-slate-500">
                        You cannot adopt a pet that you added yourself.
                    </p>
                </div>
                <Button
                    size="lg"
                    isDisabled
                    className="w-full font-bold bg-slate-200 text-slate-500 cursor-not-allowed rounded-2xl h-12"
                >
                    Adopt {course?.petName}
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white/75 backdrop-blur-2xl border border-white/50 rounded-[24px] p-5 md:p-6 shadow-[0_12px_35px_rgba(16,185,129,0.08)]">
            <form onSubmit={handleEnroll} className="space-y-5">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
                        <Heart size={20} className="fill-emerald-500 text-emerald-500" />
                        <h3>Request to Adopt {course?.petName}</h3>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm">
                        Fill out this form and the owner will review your request.
                    </p>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block ml-1">Pet Name</label>
                    <input
                        type="text"
                        value={course?.petName || ""}
                        disabled
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 opacity-80 cursor-not-allowed outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block ml-1">Your Name</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-3 text-slate-400">
                            <User size={16} />
                        </div>
                        <input
                            type="text"
                            value={userName || ""}
                            disabled
                            placeholder="Log in to display your name"
                            className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 opacity-80 cursor-not-allowed outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block ml-1">Your Email</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-3 text-slate-400">
                            <Mail size={16} />
                        </div>
                        <input
                            type="email"
                            value={userEmail || ""}
                            disabled
                            placeholder="Log in to display your email"
                            className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 opacity-80 cursor-not-allowed outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block ml-1">Preferred Pickup Date</label>
                    <div className="relative flex items-center">
                        <div className="absolute left-3 text-slate-400 pointer-events-none">
                            <Calendar size={16} />
                        </div>
                        <input
                            type="date"
                            required
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full h-11 pl-9 pr-3 bg-white border border-slate-200 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl font-semibold text-slate-700 outline-none transition-all cursor-pointer"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 block ml-1">Message to Owner</label>
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Tell the owner why you'd be a great match for ${course?.petName}...`}
                        className="w-full min-h-[90px] p-3 bg-white border border-slate-200 hover:border-emerald-500/50 focus:border-emerald-500 rounded-xl font-semibold text-slate-700 text-sm outline-none transition-all resize-none"
                    />
                </div>

                <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full font-black rounded-2xl h-12 shadow-lg shadow-emerald-500/20 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-500 text-white flex items-center justify-center gap-2 hover:opacity-95 transition-opacity mt-4"
                >
                    Adopt {course?.petName} <Sparkles size={16} />
                </Button>
            </form>
        </div>
    );
}
