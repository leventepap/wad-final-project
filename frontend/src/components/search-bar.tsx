import Button from "@/components/button";
import Link from "next/link";
import React, {useState} from "react";

export type SearchBarProps = {
    submitSearch: Function;
    link: string;
    label: string;
}

export default function SearchBar({submitSearch, link, label}: SearchBarProps) {

    const [search, setSearch] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <div className="min-w-full bg-white/50 backdrop-blur-sm shadow-lg rounded-lg p-2 flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
                <input type="text"
                       placeholder="Search..."
                       value={search}
                       onChange={handleInputChange}
                       className="w-full px-4 py-2 rounded-lg"/>
                <Button label="Search" onCLick={() => submitSearch(search)}/>
            </div>
            <Link href={link}>
                <h1 className="text-indigo-500 font-bold text-lg px-4">{label}</h1>
            </Link>
        </div>
    );
}