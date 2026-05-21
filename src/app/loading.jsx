// This file shows a loading spinner while the home page is loading
// Next.js automatically shows this while the page data is being fetched

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center gap-4">
                {/* Spinning circle */}
                <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Loading...</p>
            </div>
        </div>
    );
}
