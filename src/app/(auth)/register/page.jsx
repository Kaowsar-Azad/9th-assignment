'use client';

import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();

    const handelRegister = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const RegisterData = Object.fromEntries(formData.entries());

        const password = RegisterData.password;
        const confirmPassword = RegisterData.confirmPassword;

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password must be the same");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email: RegisterData.email,
            password: RegisterData.password,
            name: RegisterData.name,
            image: RegisterData.image,
        });

        if (error) {
            toast.error(error.message || "Registration failed");
            return;
        }

        toast.success("Account created successfully!");
        router.push("/login");
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '3rem 15px' }}>
            <div style={{ width: '100%', maxWidth: '28rem' }}>
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    <div className="text-center space-y-2 relative">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            Join <span className="text-blue-600">Mentora</span>
                        </h2>
                        <p className="text-slate-500 font-medium">Create your account to start learning</p>
                    </div>

                    <form className="space-y-6" onSubmit={handelRegister}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                required
                                placeholder="Enter your name"
                                name="name"
                                className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                required
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-bold text-slate-700 ml-1">
                                Profile Image URL
                            </label>
                            <Input
                                id="image"
                                placeholder="https://images.unsplash.com/..."
                                type="url"
                                name="image"
                                className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-bold text-slate-700 ml-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                required
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                            />
                            <div className="text-[11px] text-slate-400 font-semibold ml-1.5 space-y-0.5">
                                <p>• At least 6 characters long</p>
                                <p>• At least one uppercase letter (A-Z)</p>
                                <p>• At least one lowercase letter (a-z)</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 ml-1">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                required
                                placeholder="••••••••"
                                type="password"
                                name="confirmPassword"
                                className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                            />
                        </div>

                        <Button
                            color="primary"
                            type="submit"
                            className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
                        >
                            Create Account <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 font-black hover:underline underline-offset-4 transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}