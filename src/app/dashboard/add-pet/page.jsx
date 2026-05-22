import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AddPetForm from '@/components/AddPetForm';

export default async function AddPetDashboardPage() {
   
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

   
    return <AddPetForm ownerEmail={session.user.email} />;
}
