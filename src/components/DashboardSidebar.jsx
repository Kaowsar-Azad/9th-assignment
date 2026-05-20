"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
    LayoutDashboard, 
    PlusCircle, 
    List, 
    Home, 
    LogOut,
    Menu,
    X,
    PawPrint
} from 'lucide-react';
import { signOut } from "@/lib/auth-client";

export default function DashboardSidebar({ user }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    const menuItems = [
        { name: 'My Requests', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Add Pet', href: '/dashboard/add-pet', icon: PlusCircle },
        { name: 'My Listings', href: '/dashboard/my-listings', icon: List },
    ];

    const sidebarContent = (
        <div className="flex flex-col h-full bg-[#090d16] text-slate-300 p-6 border-r border-slate-800/40">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <div className="p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/20">
                    <PawPrint className="w-6 h-6" />
                </div>
                <span className="font-black text-2xl text-white tracking-tight">Adopets</span>
            </div>

            {/* Menu */}
            <div className="space-y-1.5 flex-1">
                <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                isActive 
                                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-indigo-600/30' 
                                    : 'hover:bg-slate-800/40 hover:text-white text-slate-400'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>


        </div>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between bg-[#090d16] text-white px-6 py-4 border-b border-slate-850">
                <div className="flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-indigo-500" />
                    <span className="font-extrabold text-lg">Adopets</span>
                </div>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-white"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Sidebar overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
                    <div className="relative w-64 h-full animate-in slide-in-from-left duration-200">
                        {sidebarContent}
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 h-screen sticky top-0 shrink-0">
                {sidebarContent}
            </div>
        </>
    );
}
