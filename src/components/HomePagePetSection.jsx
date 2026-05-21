import Link from "next/link";
import FeaturedCard from "./FeaturedCard";
import { fetchLimitPetCard } from "@/lib/pet/data";
import { ArrowRight } from "lucide-react";

const HomePagePetSection = async () => {
  const pets = await fetchLimitPetCard();

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="space-y-4 text-center mx-auto items-center justify-center pb-6">
            
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Top Rated
            </h2>

            <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white transition-colors">
              Meet Our Featured Friends
            </h3>

            <p className="text-slate-500 dark:text-slate-400 max-w-xl transition-colors">
              Handpicked premium pets designed to help you master the most in-demand skills in the industry today.
            </p>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {
            pets?.map((pet) => (
              <FeaturedCard
                key={pet?._id}
                pet={pet}
              />
            ))
          }
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/courses"
           className="px-6 py-2 bg-transparent border-2 border-[#10b981] text-[#10b981] rounded-[2rem] font-bold text-[15px] hover:bg-[#10b981] hover:text-white transition-all duration-300 group flex items-center gap-2 mx-auto"
          >
            Browse All Available Pets <ArrowRight></ArrowRight>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HomePagePetSection;