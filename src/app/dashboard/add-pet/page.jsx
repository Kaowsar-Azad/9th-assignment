import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddPetForm from '@/components/AddPetForm';

export default async function AddPetDashboardPage() {
    // Check if user is logged in
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    // Pass the user email to the form (so it auto-fills the Owner Email field)
    return <AddPetForm ownerEmail={session.user.email} />;
}
