

import { auth } from '@/lib/auth';
import { Chip } from '@heroui/react';
import { BookOpen, Clock, BarChart, Users } from 'lucide-react';
import { headers } from 'next/headers';
import EnrollmentButton from '@/components/EnrollmentButton';

import Image from 'next/image';

const fetchSingleCourse = async (id, token) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}` || ""
        }
    });
    const data = res.json();
    return data || {};


}

export default async function CourseDetails({ params }) {
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers(), 
      });




    const pets= await fetchSingleCourse(id, token);
    const { _id, enrollCount, petName, imageUrl, description, species, adoptionFee, age, ownerEmail, breed, gender, healthStatus, vaccinationStatus, location } = pets;

    


    const featuredItems = [
        { icon: Clock, label: age || 'Unknown' },
        { icon: BarChart, label: breed || 'Mixed' },
        { icon: BookOpen, label: gender || 'Unknown' },
        { icon: Users, label: location || 'Unknown' },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl aspect-video">
                        <Image
                            alt={petName || 'Pet Image'}
                            src={imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200'}
                            fill
                            className="object-cover transform transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6">
                            <Chip
                                color="primary"
                                variant="solid"
                                className="font-bold shadow-xl"
                            >
                                {species}
                            </Chip>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            {petName}
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8 border-t border-border">
                        {featuredItems.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200 text-slate-900 font-bold hover:bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <item.icon className="w-5 h-5 text-blue-600" />
                                <span className='text-slate-900'>{item.label}</span>
                            </div>
                        ))}
                    </div>


                    <p className="text-xs font-bold text-slate-400 italic">
                        Last enrolled:
                    </p>

                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-2xl space-y-8">
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Adoption Fee</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-blue-600">{adoptionFee}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-slate-700 font-medium">
                                <strong>Owner:</strong>  {ownerEmail}
                            </p>
                            <div className="w-full h-px bg-slate-100"></div>
                            <ul className="space-y-3">
                                {[`Health: ${healthStatus || 'N/A'}`, `Vaccination: ${vaccinationStatus || 'N/A'}`, 'Verified Owner'].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-3 text-sm font-bold text-slate-500"
                                    >
                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                       <EnrollmentButton course={pets} />
                        <p className="text-center text-xs text-slate-500 font-bold">30-Day Money-Back Guarantee • Secure Payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



const NotFound = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
            <h2 className="text-2xl font-bold text-red-500">Course not found</h2>
            <p className="text-muted-foreground mt-2">Please log in to view protected course details.</p>
        </div>
    );
}