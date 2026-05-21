import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import MyListingsClient from '@/components/MyListingsClient';

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

    return <MyListingsClient myListings={myListings} />;
}

