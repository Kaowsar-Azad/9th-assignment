import SearchBar from "./SearchBar";
import { Suspense } from "react";
import { Heart, PawPrint } from "lucide-react";

const CoursesHeader = () => {
    return (
        <header className="bg-white border-b border-slate-100 py-14 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6">
                    <PawPrint className="w-4 h-4" />
                    Loving homes waiting for you
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Adoptable Pets{" "}
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-600">
                        Catalogue
                    </span>
                </h1>

                <p className="mt-5 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Browse through all available pets, customize filters, and apply to bring home a new best friend.
                </p>

                <div className="mt-10 max-w-4xl mx-auto">
                    <Suspense
                        fallback={
                            <div className="h-14 rounded-2xl bg-slate-100 animate-pulse" />
                        }
                    >
                        <SearchBar />
                    </Suspense>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                        Verified listings
                    </span>
                    <span className="hidden sm:inline text-slate-200">|</span>
                    <span>Filter by species</span>
                    <span className="hidden sm:inline text-slate-200">|</span>
                    <span>Search by name or breed</span>
                </div>
            </div>
        </header>
    );
};

export default CoursesHeader;
