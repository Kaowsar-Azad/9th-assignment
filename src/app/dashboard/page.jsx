import { Button, Chip } from '@heroui/react';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Eye } from 'lucide-react';

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

    // Fetch enrollments
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${session?.user?.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    });
    const enrollments = await res.json() || [];

    // Fetch pets to map titles to IDs for the "View" details button
    const petsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
    const allPets = await petsRes.json() || [];
    const petMap = {};
    allPets.forEach(p => {
        petMap[p.petName] = p._id;
    });

    // Mock realistic statuses for demonstration as they are not stored in database
    const processedRequests = enrollments.map((e, idx) => {
        let status = 'Approved';
        if (idx === 1) status = 'Rejected';
        if (idx === 2) status = 'Pending';
        return {
            ...e,
            status: e.status || status,
            pickupDate: e.pickupDate || new Date(new Date(e.enrolledAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        };
    });

    const total = processedRequests.length;
    const pending = processedRequests.filter(e => e.status === 'Pending').length;
    const approved = processedRequests.filter(e => e.status === 'Approved').length;
    const rejected = processedRequests.filter(e => e.status === 'Rejected').length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-white">My Adoption Requests</h1>
                <p className="text-slate-400 font-medium">Track the status of all your adoption requests here.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total', value: total, bg: 'bg-[#131b2e] border-slate-800 text-white' },
                    { label: 'Pending', value: pending, bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
                    { label: 'Approved', value: approved, bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' },
                    { label: 'Rejected', value: rejected, bg: 'bg-red-500/10 border-red-500/20 text-red-400' },
                ].map((stat, i) => (
                    <div key={i} className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center ${stat.bg}`}>
                        <span className="text-3xl font-black">{stat.value}</span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Requests Table */}
            <div className="bg-[#131b2e] rounded-2xl border border-slate-850 overflow-hidden shadow-xl">
                {processedRequests.length === 0 ? (
                    <div className="p-16 text-center space-y-4">
                        <p className="text-slate-400 font-medium">No requests submitted yet</p>
                        <Link href="/courses">
                            <Button color="primary" className="font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 border-none">
                                Browse Pets
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-[#17223b]/60 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Pet Name</th>
                                    <th className="px-6 py-4">Request Date</th>
                                    <th className="px-6 py-4">Pickup Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80">
                                {processedRequests.map((req) => {
                                    const petId = petMap[req.courseTitle];
                                    return (
                                        <tr key={req._id} className="hover:bg-[#1a243d]/30 transition-colors">
                                            <td className="px-6 py-5 font-bold text-white">{req.courseTitle}</td>
                                            <td className="px-6 py-5 text-sm text-slate-400">
                                                {new Date(req.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-400">{req.pickupDate}</td>
                                            <td className="px-6 py-5">
                                                <Chip
                                                    size="sm"
                                                    color={
                                                        req.status === 'Approved' ? 'success' :
                                                        req.status === 'Pending' ? 'warning' : 'danger'
                                                    }
                                                    variant="flat"
                                                    className="font-bold capitalize"
                                                >
                                                    {req.status}
                                                </Chip>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                {petId ? (
                                                    <Link href={`/courses/${petId}`}>
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            startContent={<Eye className="w-4 h-4" />}
                                                            className="font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border-none"
                                                        >
                                                            View
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <span className="text-xs text-slate-500 font-medium">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}