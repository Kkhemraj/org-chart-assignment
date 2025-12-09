'use client';

import { Bell, CircleQuestionMark, Search, Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Header() {
    const [searchValue, setSearchValue] = React.useState("");
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <header className="h-14 w-full flex flex-row justify-between px-4 md:px-10 bg-white items-center md:items-stretch">
            <div className="flex items-center gap-2 text-sm w-full md:w-auto justify-between md:justify-start">
                <button 
                    className="md:hidden cursor-pointer"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu size={24} color="#989898" />
                </button>
               <div className="hidden md:flex gap-2 items-center">
                 <span className="text-blue-500 font-medium cursor-pointer">Home</span>
                <svg className="w-4 h-4 text-[#989898] hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-semibold text-[#989898] hidden md:block">Org Chart</span>
               </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-end">
                <div className="flex gap-6 items-center">
                    <div className="size-[30px] rounded-full overflow-hidden relative">
                        <Image
                            src={'/images/employees/ceo.jpg'}
                            alt={'user name'}
                            className="w-full h-full object-cover"
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className="flex items-center gap-5 border-l border-[#D0D0D0]/60 ps-5 md:ps-7">
                        <button className="cursor-pointer relative"><CircleQuestionMark color={'#888888'} size={20} /></button>
                        <button className="cursor-pointer relative"><Bell color={'#888888'} size={20} /><div className="size-[5px] rounded-full bg-red-600 absolute right-[4px] top-[0px]"></div></button>
                    </div>
                </div>
            </div>

            
        </header>
    );
}