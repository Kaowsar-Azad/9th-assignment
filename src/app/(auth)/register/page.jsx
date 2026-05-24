'use client';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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
     const handelLoginWithGoogle = async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/"
            });
        };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 relative overflow-hidden transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    <div className="text-center space-y-2 relative">
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
                            Join <span className="bg-gradient-to-r from-blue-600 to-indigo-650 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Pet Adoption</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">Create your account to start adopting</p>
                          <div className="space-y-4">
                                                <Button
                                                    onPress={handelLoginWithGoogle}
                                                    variant="bordered"
                                                    className="w-full h-12 font-bold rounded-2xl border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors gap-3"
                                                >
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src="https://www.google.com/favicon.ico"
                                                        className="w-5 h-5"
                                                        alt="Google"
                                                    />
                                                    Sign in with Google
                                                </Button>
                                            </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest transition-colors">Or with From</span>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handelRegister}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                required
                                placeholder="Enter your name"
                                name="name"
                                className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 dark:focus-within:border-blue-500 bg-white dark:bg-slate-905 w-full rounded-2xl transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Email Address
                            </label>
                            <Input
                                id="email"
                                required
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 dark:focus-within:border-blue-500 bg-white dark:bg-slate-905 w-full rounded-2xl transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Profile Image URL
                            </label>
                            <Input
                                id="image"
                                placeholder="https://images.unsplash.com/..."
                                type="url"
                                name="image"
                                className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 dark:focus-within:border-blue-500 bg-white dark:bg-slate-905 w-full rounded-2xl transition-all duration-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Password
                            </label>
                            <Input
                                id="password"
                                required
                                placeholder="Enter your password"
                                type="password"
                                name="password"
                                className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 dark:focus-within:border-blue-500 bg-white dark:bg-slate-905 w-full rounded-2xl transition-all duration-300"
                            />
                            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold ml-1.5 space-y-0.5 transition-colors">
                                <p>• At least 8 characters long</p>
                                <p>• At least one uppercase letter (A-Z)</p>
                                <p>• At least one lowercase letter (a-z)</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 transition-colors">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                required
                                placeholder="••••••••"
                                type="password"
                                name="confirmPassword"
                                className="border-2 border-slate-200 dark:border-slate-800 hover:border-blue-600/50 dark:hover:border-blue-500/50 focus-within:border-blue-600 dark:focus-within:border-blue-500 bg-white dark:bg-slate-905 w-full rounded-2xl transition-all duration-300"
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
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 dark:text-blue-400 font-black hover:underline underline-offset-4 transition-all">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}