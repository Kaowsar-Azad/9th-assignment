import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
    Input,
    Button,
    TextArea,
} from '@heroui/react';

import { BookPlus, Image as ImageIcon, DollarSign, Clock, List, ChevronDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { addCourse } from "@/lib/pet/data";


const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Personal Development'];

export default async function AddCoursePage() {

    const handleAddCourse = async (formData) => {
        "use server"
        const data = await addCourse(formData)
        if (data?.insertedId) {
            redirect("/courses")
        }
    }
    const session = await auth.api.getSession({
    headers: await headers()
    });
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-10">
                <div className="space-y-2 text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                        <BookPlus className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900">
                        Create New{' '}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-blue-800">Course</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Share your knowledge with the world</p>
                </div>

                <form
                    action={handleAddCourse}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-bold text-slate-700 ml-1"
                            >
                                Course Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="e.g. Next.js 15 Masterclass"
                                className="w-full h-14 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-bold text-slate-700 ml-1"
                            >
                                Description
                            </label>
                            <TextArea
                                id="description"
                                required
                                name="description"
                                placeholder="What will students learn in this course?"
                                className="w-full h-32 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="thumbnail"
                                className="text-sm font-bold text-slate-700 ml-1"
                            >
                                Thumbnail URL
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="thumbnail"
                                    name='thumbnail'
                                    required
                                    type="url"
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-bold text-slate-700 ml-1">Category</label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10 pointer-events-none">
                                    <List className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="absolute right-4 z-10 pointer-events-none">
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    defaultValue=""
                                    className="w-full h-14 pl-12 pr-10 border-2 border-slate-200 hover:border-blue-600/50 focus:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none appearance-none text-slate-600 font-medium cursor-pointer"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="price"
                                className="text-sm font-bold text-slate-700 ml-1"
                            >
                                Price ($)
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <DollarSign className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="price"
                                    name="price"
                                    required
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="duration"
                                className="text-sm font-bold text-slate-700 ml-1"
                            >
                                Duration
                            </label>
                            <div className="relative flex items-center w-full">
                                <div className="absolute left-4 z-10">
                                    <Clock className="w-5 h-5 text-slate-400" />
                                </div>
                                <Input
                                    id="duration"
                                    required
                                    name="duration"
                                    type="text"
                                    placeholder="e.g. 12h 30m"
                                    className="w-full h-14 pl-12 pr-4 border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 rounded-2xl bg-white transition-all duration-300 shadow-none outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button
                            variant="flat"
                            size="lg"
                            className="flex-1 font-bold rounded-2xl h-14"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            size="lg"
                            className="flex-2 font-black rounded-2xl h-14 shadow-xl shadow-blue-600/20"
                        >
                            Publish Course
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}