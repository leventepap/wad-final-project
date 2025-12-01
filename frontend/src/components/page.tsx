import {ReactNode} from "react";
import Link from "next/link";

type WrapperProps = {
    children: ReactNode;
    title: string;
};

export default function Page({children, title}: WrapperProps) {
    return (
        <div className="h-screen bg-tiles flex flex-col items-center justify-center">
            <div className="h-screen w-3xl flex flex-col gap-12">
                <div className="bg-white/50 backdrop-blur-sm border-gray-200 shadow-lg rounded-lg mt-12">
                    <h1 className="text-xl font-bold text-center p-2">Library Management System</h1>
                    <div className="flex justify-around">
                        <Link href="/">Home</Link>
                        <Link href="/book">Books</Link>
                        <Link href="/person">Persons</Link>
                        <Link href="/member">Members</Link>
                        <Link href="/loan">Loans</Link>
                    </div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm border-gray-200 shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-indigo-500 text-center p-2">{title}</h1>
                </div>
                {children}
            </div>
        </div>
    );
}
