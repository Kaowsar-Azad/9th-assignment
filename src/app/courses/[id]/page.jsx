import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import {
  BookOpen,
  Clock,
  BarChart,
  Users,
  ShieldCheck,
  Heart,
  Sparkles,
} from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import AdoptNowButton from '@/components/AdoptNowButton';

const fetchSingleCourse = async (id, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}` || '',
      },
    }
  );

  const data = await res.json();
  return data || {};
};

export default async function CourseDetails({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const pets = await fetchSingleCourse(id, token);

  const {
    petName,
    imageUrl,
    description,
    species,
    adoptionFee,
    age,
    ownerEmail,
    breed,
    gender,
    healthStatus,
    vaccinationStatus,
    location,
  } = pets;

  const featuredItems = [
    { icon: Clock, label: age || 'Unknown' },
    { icon: BarChart, label: breed || 'Mixed' },
    { icon: BookOpen, label: gender || 'Unknown' },
    { icon: Users, label: location || 'Unknown' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbf7] via-[#edf7f1] to-[#e8f6ee] py-8 md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[22px] border border-white/40 shadow-[0_12px_35px_rgba(16,185,129,0.08)] aspect-video group">

              <Image
                alt={petName || 'Pet Image'}
                src={
                  imageUrl ||
                  'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200'
                }
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <Chip className="bg-white/15 backdrop-blur-md text-white border border-white/20 px-3 py-1 text-xs font-semibold">
                  {species}
                </Chip>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 flex items-center gap-2">

                <Heart className="text-rose-400 fill-rose-400" size={16} />

                <p className="text-white text-xs md:text-sm font-medium">
                  Loving pets deserve loving homes
                </p>

              </div>

            </div>

            {/* CONTENT */}
            <div className="space-y-4">

              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs md:text-sm font-semibold">

                <Sparkles size={15} />

                Premium Adoption Profile

              </div>

              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                {petName}
              </h1>

              <p className="text-[15px] md:text-[17px] leading-7 text-slate-600 max-w-3xl">
                {description}
              </p>

            </div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2">

              {featuredItems.map((item, i) => (

                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[20px] px-4 py-4 min-h-[88px] flex items-center shadow-sm hover:shadow-[0_10px_25px_rgba(16,185,129,0.08)] transition-all duration-300"
                >

                  <div className="flex items-center gap-3 w-full">

                    <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-2.5 rounded-xl shadow-md shadow-emerald-500/20 flex items-center justify-center">

                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />

                    </div>

                    <div>

                      <p className="text-[11px] md:text-xs text-slate-500 font-semibold uppercase tracking-wide">
                        Pet Information
                      </p>

                      <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mt-1">
                        {item.label}
                      </h3>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">

            <div className="sticky top-24 bg-white/75 backdrop-blur-2xl border border-white/50 rounded-[24px] p-5 md:p-6 shadow-[0_12px_35px_rgba(16,185,129,0.08)]">

              <div className="space-y-5">

                {/* PRICE */}
                <div>

                  <p className="uppercase tracking-[0.22em] text-[11px] font-bold text-slate-500 mb-2">
                    Adoption Fee
                  </p>

                  <div className="flex items-end gap-2">

                    <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent leading-none">
                      {String(adoptionFee).replace('BDT', '')}
                    </span>

                    <span className="text-slate-500 text-base md:text-lg font-semibold pb-1">
                      BDT
                    </span>

                  </div>

                </div>

                {/* OWNER */}
                <div className="bg-white/80 border border-white/50 rounded-[18px] p-4">

                  <div className="flex items-center gap-3">

                    <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-2.5 rounded-xl">

                      <Users className="text-white" size={18} />

                    </div>

                    <div className="overflow-hidden">

                      <p className="text-xs md:text-sm text-slate-500 font-medium">
                        Pet Owner
                      </p>

                      <h3 className="text-sm md:text-base font-bold text-slate-900 break-all">
                        {ownerEmail}
                      </h3>

                    </div>

                  </div>

                </div>

                {/* STATUS */}
                <div className="space-y-3">

                  {[
                    `Health: ${healthStatus || 'N/A'}`,
                    `Vaccination: ${vaccinationStatus || 'N/A'}`,
                    'Verified Owner',
                  ].map((item, i) => (

                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white/70 border border-white/50 rounded-xl px-4 py-3"
                    >

                      <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-2 rounded-lg">

                        <ShieldCheck className="text-white" size={16} />

                      </div>

                      <p className="font-semibold text-slate-700 text-sm md:text-[15px]">
                        {item}
                      </p>

                    </div>

                  ))}

                </div>

                {/* BUTTON */}
                <div className="pt-2">
                  <AdoptNowButton course={pets} />
                </div>

                {/* FOOTER */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">

                  <p className="text-xs md:text-sm font-semibold text-emerald-700">
                    100% Safe Adoption • Trusted Pet Owner
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">

      <h2 className="text-3xl font-black text-red-500">
        Course not found
      </h2>

      <p className="text-slate-500 mt-4 text-lg">
        Please log in to view protected course details.
      </p>

    </div>
  );
};