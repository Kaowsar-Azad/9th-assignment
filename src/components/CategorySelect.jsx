'use client';

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectPopover,
    ListBox,
    ListBoxItem,
} from '@heroui/react';
import { List } from 'lucide-react';

const CATEGORIES = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Personal Development'];

export default function CategorySelect() {
    return (
        <Select
            id="category"
            name="category"
            required
            placeholder="Select a category"
            className="w-full"
        >
            <SelectTrigger className="h-14 border-2 border-slate-200 hover:border-blue-600/50 data-[focus-within=true]:border-blue-600 rounded-2xl bg-white transition-all duration-300 flex items-center px-4 shadow-none outline-none group">
                <div className="flex items-center gap-3 w-full">
                    <List className="w-5 h-5 text-slate-400 group-data-[focus-within=true]:text-blue-600 transition-colors" />
                    <SelectValue className="font-medium text-slate-600" />
                </div>
                <div className="ml-auto text-slate-400 group-data-[focus-within=true]:text-blue-600 transition-colors">
                    <List className="w-4 h-4" />
                </div>
            </SelectTrigger>
            <SelectPopover className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 mt-2">
                <ListBox>
                    {CATEGORIES.map((cat) => (
                        <ListBoxItem
                            key={cat}
                            id={cat}
                            className="px-4 py-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl cursor-pointer transition-colors font-medium"
                        >
                            {cat}
                        </ListBoxItem>
                    ))}
                </ListBox>
            </SelectPopover>
        </Select>
    );
}
