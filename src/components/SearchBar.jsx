"use client";

import { PET_SPECIES } from "@/lib/pet-species";
import { ChevronDown, PawPrint, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [search, setSearch] = useState(searchParams.get("searchTerm") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");

    const pushFilters = (nextSearch, nextCategory) => {
        const params = new URLSearchParams();

        if (nextSearch?.trim()) {
            params.set("searchTerm", nextSearch.trim());
        }
        if (nextCategory) {
            params.set("category", nextCategory);
        }

        const query = params.toString();
        router.push(query ? `/courses?${query}` : "/courses");
    };

    const handleSearch = () => {
        pushFilters(search, category);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        pushFilters(search, value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative sm:w-52 shrink-0">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-colors">
                    <PawPrint className="w-5 h-5" />
                </div>
                <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    aria-label="Filter by species"
                    className="w-full h-14 pl-12 pr-10 appearance-none border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 font-medium outline-none cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-700 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 transition-all shadow-sm"
                >
                    <option value="">All Species</option>
                    {PET_SPECIES.map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-colors" />
            </div>

            <div className="relative flex flex-1 items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-emerald-600/10 focus-within:border-emerald-600 dark:focus-within:border-emerald-500 transition-all overflow-hidden">
                <div className="pl-5 text-slate-400 shrink-0 transition-colors">
                    <Search className="w-5 h-5" />
                </div>

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Search by pet name, breed, or species..."
                    className="flex-1 h-14 px-4 outline-none bg-transparent text-slate-700 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 min-w-0 transition-colors"
                />

                <button
                    onClick={handleSearch}
                    type="button"
                    className="h-10 px-6 mr-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all shrink-0"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
