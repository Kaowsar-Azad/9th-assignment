import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddPetForm from '@/components/AddPetForm';

export default async function AddPetPage() {
    // Check if user is logged in
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    // Pass the user email to the form (so it auto-fills the Owner Email field)
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
            <AddPetForm ownerEmail={session.user.email} />
        </div>
    );
}
