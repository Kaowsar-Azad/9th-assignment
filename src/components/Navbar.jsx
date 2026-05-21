"use client";

import { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Heart, Sun, Moon, LogIn, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncToken = async () => {
      if (session) {
        const { data: jwtData } = await authClient.token();
        const token = jwtData?.token;
        if (token) {
          await fetch('/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
        }
      } else {
        await fetch('/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: '' })
        });
      }
    };
    syncToken();
  }, [session]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm py-2" : "bg-slate-50 dark:bg-slate-950 py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-2 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-all duration-300">
              <Heart size={20} fill="white" className="text-white" />
            </div>
            <span className="font-black text-3xl tracking-tight flex items-center">
              <span className="bg-gradient-to-r from-emerald-200 via-emerald-400 to-green-500 bg-clip-text text-[22px] text-transparent">
                Ado
              </span>
              <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent text-[23px] ml-1">
                pets
              </span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <Link href="/courses" className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Pets</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {!isPending && !session ? (
              <>
                <Link href="/login" className="font-bold flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                  <LogIn size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Login</span>
                </Link>
                <Link href="/register">
                  <Button variant="flat" className="font-bold rounded-full px-6 bg-blue-50 dark:bg-blue-900/30">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5">
                      <Rocket size={18} className="text-blue-600 dark:text-blue-400" /> Get started
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-250 dark:hover:border-slate-700">
                  <Image
                    width={40}
                    height={40}
                    src={session?.user?.image || "/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                  />
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-bold truncate max-w-25 text-slate-900 dark:text-white">{session?.user?.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Adopter</p>
                  </div>
                </button>
                <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Welcome back!</p>
                    <p className="text-xs truncate text-slate-500 dark:text-slate-400">{session?.user?.email}</p>
                  </div>
                  <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-3 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 transition-colors text-left cursor-pointer">
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300">
          <Link href="/" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">Home</Link>
          <Link href="/courses" className="block px-4 py-3 text-base font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">All Pets</Link>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex flex-col gap-4">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold cursor-pointer"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={16} />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={16} />
                    Light Mode
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Link href="/login">
                <Button variant="flat" className="rounded-xl w-full bg-slate-100 dark:bg-slate-800">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 font-bold">
                    <LogIn size={18} className="text-blue-600 dark:text-blue-400" /> Login
                  </span>
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="flat" className="rounded-xl w-full bg-blue-50 dark:bg-blue-900/30">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 font-bold">
                    <Rocket size={18} className="text-blue-600 dark:text-blue-400" /> Get started
                  </span>
                </Button>
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account</p>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl cursor-pointer">Log Out</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}