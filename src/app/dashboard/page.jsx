import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import MyRequestsClient from '@/components/MyRequestsClient';

export default async function DashboardPage() {
    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || !token) {
        redirect("/login");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${session?.user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
    });
    const enrollments = await res.json() || [];

    const petsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, { cache: "no-store" });
    const allPets = await petsRes.json() || [];
    const petMap = {};
    allPets.forEach((p) => { petMap[p.petName] = p._id; });

    const processedRequests = enrollments.map((e) => ({
        ...e,
        status: e.status || "Pending",
        pickupDate: e.pickupDate || null,
    }));

    return (
        <MyRequestsClient
            initialRequests={processedRequests}
            petMap={petMap}
        />
    );
}