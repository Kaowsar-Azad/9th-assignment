"use client";

import { useState, useEffect } from "react";

import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export function MainNavbar() {
  
     const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session , isPending} = useSession();
  


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  }


  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-md shadow-sm py-2" : "bg-slate-50 py-4"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
  <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-2 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-all duration-300">
    <Heart
      size={20}
      fill="white"
      className="text-white"
    />
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
            <Link href="/" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/courses" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">All Pets</Link>


          </div>

          <div className="hidden md:flex items-center gap-4">


            {
              !isPending && !session ? 
              <>
              <Link href="/login" className="font-medium text-slate-700 hover:text-blue-600 transition-colors">Login</Link>
              <Link href="/register">

                <Button color="primary" className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20">
                  Join Free
                </Button>
              </Link>
            </> :
             <div className="relative group">
              <button className="flex items-center gap-3 p-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                <Image
                  width={40}
                  height={40}
                  src={session?.user?.image || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-600/10"
                />
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-bold truncate max-w-25">{session?.user?.name}</p>
                  <p className="text-[10px] text-slate-500">Student</p>
                </div>
              </button>
              <div className="absolute right-0 top-12 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl hidden group-hover:flex flex-col py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="font-bold text-sm">Welcome back!</p>
                  <p className="text-xs truncate text-slate-500">{session?.user?.email}</p>
                </div>
                <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-muted flex items-center gap-3 transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>

                <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors text-left">
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
            }

            

           

          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-2 bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <Link href="/" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">Home</Link>
          <Link href="/courses" className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl">All Pets</Link>


          <div className="pt-4 border-t border-border mt-4">

            <div className="grid grid-cols-2 gap-4">
              <Link href="/login">
                <Button href="/login" variant="bordered" className="rounded-xl">Login</Button>
              </Link>
              <Link href="/register">
                <Button href="/register" color="primary" className="rounded-xl">Join Free</Button>
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Account</p>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-base font-medium text-red-500 hover:bg-red-50 rounded-xl">Log Out</button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}