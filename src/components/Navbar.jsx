"use client";

import { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Heart, Sun, Moon, LogIn, Rocket, Home, ClipboardList, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession, authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [theme, setTheme] = useState("light");

  const isActive = (path) => pathname === path;

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
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 relative ${scrolled ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm py-2" : "bg-slate-50 dark:bg-slate-950 py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-3 group">
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
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={`font-semibold transition-colors duration-200 ${
                isActive("/")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`font-semibold transition-colors duration-200 ${
                isActive("/courses")
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              All Pets
            </Link>
            {session && (
              <>
                <Link
                  href="/add-pet"
                  className={`font-semibold transition-colors duration-200 ${
                    isActive("/add-pet")
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  Add Pet
                </Link>
              </>
            )}
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
        <div className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl z-50 animate-in slide-in-from-top-4 fade-in duration-300 ease-out">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/")
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Home size={18} />
              <span className="font-semibold text-sm">Home</span>
            </Link>

            <Link
              href="/courses"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive("/courses")
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Heart size={18} />
              <span className="font-semibold text-sm">All Pets</span>
            </Link>

            {session && (
              <>
                <Link
                  href="/add-pet"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive("/add-pet")
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <PlusCircle size={18} />
                  <span className="font-semibold text-sm">Add Pet</span>
                </Link>
              </>
            )}
          </div>

          {!session ? (
            <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 gap-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="flat" className="rounded-xl w-full bg-slate-100 dark:bg-slate-800 font-bold py-5">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 justify-center">
                    <LogIn size={18} className="text-blue-600 dark:text-blue-400" /> Login
                  </span>
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button variant="flat" className="rounded-xl w-full bg-blue-50 dark:bg-blue-900/30 font-bold py-5">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center gap-1.5 justify-center">
                    <Rocket size={18} className="text-blue-600 dark:text-blue-400" /> Get started
                  </span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-3">
                <Image
                  width={40}
                  height={40}
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-bold truncate text-slate-900 dark:text-white">{session?.user?.name}</p>
                  <p className="text-[11px] truncate text-slate-500 dark:text-slate-400">{session?.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl cursor-pointer"
              >
                <LogOut size={18} className="text-red-500" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}