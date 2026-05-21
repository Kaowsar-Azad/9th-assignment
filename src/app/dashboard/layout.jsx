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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col md:flex-row transition-colors duration-300">
            {/* Sidebar */}
            <DashboardSidebar user={session.user} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6 md:px-8 shrink-0 transition-colors">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">Dashboard</h2>

                </header>
                <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors">
                    {children}
                </main>
            </div>
        </div>
    );
}
