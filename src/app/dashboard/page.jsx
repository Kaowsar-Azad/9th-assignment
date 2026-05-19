
import Image from 'next/image';
import { Button, Chip } from '@heroui/react';

import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import CancelEnrollButton from '@/components/CancelEnrollButton';

export default async function DashboardPage() {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })

    const session = await auth.api.getSession({
        headers: await headers()
    })
    // console.log(session);

    if (!session?.user || !token) {
        redirect("/login")
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enrollments/${session?.user?.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        cache: "no-store"
    })
    const enrollments = await res.json() || [];

    // console.log(enrollments);


    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile */}
                <div className="w-full md:w-1/4">
                    <div className="p-6 bg-white border rounded-2xl">
                        <Image
                            src={session?.user?.image}
                            alt="profile"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full"
                        />

                        <h2 className="text-xl font-bold mt-4">{session?.user?.name}</h2>
                        <p className="text-sm text-slate-500">{session?.user?.email}</p>
                    </div>
                </div>

                {/* Enrollments */}
                <div className="w-full md:w-3/4">
                    <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>

                    {enrollments?.length === 0 ? (
                        <div className="p-12 text-center bg-slate-50 border rounded-2xl">
                            <p className="mb-4">No courses yet</p>

                            <Link href="/courses">
                                <Button>Browse Courses</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {enrollments?.map((enrollment) => (
                                <div
                                    key={enrollment?._id}
                                    className="flex gap-4 p-4 bg-white border rounded-xl"
                                >
                                    <Image
                                        src={enrollment?.thumbnail}
                                        alt="course"
                                        width={120}
                                        height={90}
                                        className="rounded-lg"
                                    />

                                    <div className="flex flex-col grow justify-between">
                                        <div>
                                            <h3 className="font-bold">{enrollment?.courseTitle}</h3>
                                            <p className="text-sm text-slate-500">{new Date(enrollment?.enrolledAt).toDateString()}</p>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <Chip
                                                color="success"
                                                size="sm"
                                            >
                                                Active
                                            </Chip>

                                            <CancelEnrollButton />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


const NotFound = () => {
    return (
        <div className="p-12 text-center bg-slate-50 border rounded-2xl">
            <p className="mb-4">No courses yet</p>

            <Link href="/courses">
                <Button>Browse Courses</Button>
            </Link>
        </div>
    );
}