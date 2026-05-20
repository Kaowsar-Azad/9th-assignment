"use client";

import { isOwnPet } from "@/lib/pet/ownership";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdoptNowButton({ course }) {
    const { data: session } = useSession();
    const router = useRouter();
    const userEmail = session?.user?.email;
    const ownPet = isOwnPet(course, userEmail);

    const handleEnroll = async () => {
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

        const updatedData = {
            userId: session?.user?.id,
            studentName: session?.user?.name,
            studentEmail: session?.user?.email,
            courseTitle: course?.petName,
            thumbnail: course?.imageUrl,
        };

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
    };

    if (ownPet) {
        return (
            <div className="space-y-2">
                <Button
                    size="lg"
                    isDisabled
                    className="w-full font-bold mt-4 bg-slate-200 text-slate-500 cursor-not-allowed"
                >
                    Your Own Listing
                </Button>
                <p className="text-center text-sm text-slate-500">
                    You cannot adopt a pet that you added yourself.
                </p>
            </div>
        );
    }

    return (
        <Button
            color="primary"
            size="lg"
            className="w-full font-bold shadow-lg mt-4 bg-emerald-600"
            onPress={handleEnroll}
        >
            Adopt Now
        </Button>
    );
}
