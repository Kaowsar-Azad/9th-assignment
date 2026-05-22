import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import {
  Clock,
  ShieldCheck,
  Heart,
  Sparkles,
  PawPrint,
  User,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import AdoptionForm from '@/components/AdoptionForm';

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

export default async function CourseDetails({ params, searchParams }) {
  const { id } = await params;
  const sParams = await searchParams;
  const showAdopt = sParams.adopt === "true";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (showAdopt && (!session || !session?.user)) {
    redirect(`/login?callbackUrl=/courses/${id}?adopt=true`);
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  }).catch(() => null);
  const token = tokenData?.token;

  const pets = await fetchSingleCourse(id, token);

  if (!pets || pets.message === "Unauthorized" || !pets._id) {
    return <NotFound />;
  }

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

  const gridItems = [
    { icon: PawPrint, label: 'Species', value: species || 'Unknown' },
    { icon: Sparkles, label: 'Breed', value: breed || 'Unknown' },
    { icon: Clock, label: 'Age', value: age || 'Unknown' },
    { icon: User, label: 'Gender', value: gender || 'Unknown' },
    { icon: MapPin, label: 'Location', value: location || 'Unknown' },
    { icon: DollarSign, label: 'Adoption Fee', value: adoptionFee || 'Free' },
    { icon: Heart, label: 'Health Status', value: healthStatus || 'Unknown' },
    { icon: ShieldCheck, label: 'Vaccinated', value: vaccinationStatus || 'Unknown' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbf7] via-[#edf7f1] to-[#e8f6ee] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showAdopt ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* IMAGE */}
              <div className="relative overflow-hidden rounded-[22px] border border-white/40 shadow-[0_12px_35px_rgba(16,185,129,0.08)] aspect-video group">
                <Image
                  alt={petName || 'Pet Image'}
                  src={imageUrl || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200'}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Chip className={`${pets.status === "Adopted" ? "bg-indigo-600" : "bg-emerald-500"} text-white border border-emerald-400/25 px-3 py-1 text-xs font-black shadow-lg`}>
                    {pets.status || "Available"}
                  </Chip>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/15 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 transition-colors">
                  <Heart className="text-rose-400 fill-rose-400" size={16} />
                  <p className="text-white text-xs md:text-sm font-medium">Loving pets deserve loving homes</p>
                </div>
              </div>

              {/* NAME INFO */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-emerald-100 dark:border-emerald-900/50 pb-5 transition-colors">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold transition-colors">
                    <Sparkles size={13} />
                    Premium Adoption Profile
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight transition-colors">
                    {petName}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {species && <Chip size="sm" className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800 transition-colors">{species}</Chip>}
                    {breed && <Chip size="sm" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 transition-colors">{breed}</Chip>}
                    {gender && <Chip size="sm" className="bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800 transition-colors">{gender}</Chip>}
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="uppercase tracking-[0.22em] text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 transition-colors">Adoption Fee</p>
                  <div className="flex items-end gap-1 justify-start sm:justify-end">
                    <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent leading-none">
                      {String(adoptionFee).replace('BDT', '').trim()}
                    </span>
                    {String(adoptionFee).toUpperCase().includes('BDT') && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold transition-colors">BDT</span>
                    )}
                  </div>
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2">
                {gridItems.map((item, i) => (
                  <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-[20px] px-4 py-4 min-h-[80px] flex items-center shadow-sm hover:shadow-[0_10px_25px_rgba(16,185,129,0.08)] transition-all duration-300">
                    <div className="flex items-center gap-3 w-full">
                      <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 p-2.5 rounded-xl shadow-md shadow-emerald-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide transition-colors">{item.label}</p>
                        <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white leading-tight mt-0.5 transition-colors">{item.value}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ABOUT */}
              <div className="space-y-3 pt-4 border-t border-emerald-100 dark:border-emerald-900/50 transition-colors">
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">About {petName}</h2>
                <p className="text-[15px] md:text-[16px] leading-7 text-slate-600 dark:text-slate-300 max-w-3xl transition-colors">{description}</p>
              </div>
            </div>

            {/* RIGHT SIDE (ADOPTION FORM) */}
            <div className="lg:col-span-1 lg:sticky lg:top-24">
              <AdoptionForm course={pets} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_15px_45px_rgba(16,185,129,0.05)] transition-all duration-300">
            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-md aspect-[21/9] w-full group">
              <Image
                alt={petName || 'Pet Image'}
                src={imageUrl || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200'}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute top-4 right-4">
                <Chip className={`${pets.status === "Adopted" ? "bg-indigo-600" : "bg-emerald-500"} text-white px-4 py-1.5 text-xs font-black shadow-lg`}>
                  {pets.status || "Available"}
                </Chip>
              </div>
            </div>

            {/* TITLE & HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 transition-colors">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight transition-colors">
                  {petName}
                </h1>
                <div className="flex flex-wrap gap-2.5">
                  {species && <Chip size="md" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-350 font-bold border border-emerald-100 dark:border-emerald-800 transition-colors">{species}</Chip>}
                  {breed && <Chip size="md" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700 transition-colors">{breed}</Chip>}
                  {gender && <Chip size="md" className="bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-350 font-bold border border-sky-100 dark:border-sky-800 transition-colors">{gender}</Chip>}
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="uppercase tracking-[0.22em] text-[10px] font-extrabold text-slate-400 dark:text-slate-500 mb-1">Adoption Fee</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 bg-clip-text text-transparent leading-none">
                    {String(adoptionFee).replace('BDT', '').trim()}
                  </span>
                  {String(adoptionFee).toUpperCase().includes('BDT') && (
                    <span className="text-slate-400 dark:text-slate-500 text-sm font-bold">BDT</span>
                  )}
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {gridItems.map((item, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50 rounded-2xl px-5 py-4 flex items-center shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-3.5 w-full">
                    <div className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 p-2.5 rounded-xl shadow-md flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">{item.label}</p>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-1 truncate max-w-[160px]">{item.value}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-4 pt-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">About {petName}</h2>
              <p className="text-base leading-8 text-slate-650 dark:text-slate-350 transition-colors">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 className="text-3xl font-black text-red-500">
        Pet not found
      </h2>
      <p className="text-slate-500 mt-4 text-lg">
        Please log in to view protected details or ensure the URL is correct.
      </p>
    </div>
  );
};
