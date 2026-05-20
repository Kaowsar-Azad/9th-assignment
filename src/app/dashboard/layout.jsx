import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import DashboardSidebar from '@/components/DashboardSidebar';

export default async function DashboardLayout({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <DashboardSidebar user={session.user} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/40 h-16 flex items-center justify-between px-6 md:px-8 shrink-0">
                    <h2 className="text-xl font-bold text-white">Dashboard</h2>

                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#0b0f19]">
                    {children}
                </main>
            </div>
        </div>
    );
}
