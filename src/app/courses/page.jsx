
import CourseCard from "@/components/CourseCard";
import CoursesHeader from "@/components/CoursesHeader";
import { fetchPets } from "@/lib/pet/data";
import { Button } from "@heroui/react";
import { PawPrint, Filter } from "lucide-react";



const PetPage = async ({ searchParams }) => {
    const sParams = await searchParams;
  const pets = await fetchPets(sParams.searchTerm || '', sParams.category || '', sParams.sort || '');
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Header */}
            <CoursesHeader />

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white transition-colors">
                        <PawPrint className="w-6 h-6 text-blue-600 dark:text-blue-500 transition-colors" />
                        Available Pets
                    </h2>
                    <Button
                        variant="flat"
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold"
                    >
                        Filters
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                       pets?.map((pet) => <CourseCard key={pet._id} pet={pet} />
                        )
                    }
                </div>
               

            </main>
        </div>
  )
}

export default PetPage