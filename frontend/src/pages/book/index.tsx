import React, {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {instance, BOOK_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";
import Link from "next/link";
import Button from "@/components/button";

export default function BooksPage() {

    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getBooks();
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const submitSearch = () => {
        search.length > 0 ? searchBooks() : getBooks();
    }

    const getBooks = () => {
        instance.get(BOOK_BASE_URL)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }

    const searchBooks = () => {
        instance.post(`${BOOK_BASE_URL}/search`, { SEARCH: `%${search}%` })
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Books">
            <div className="min-w-full bg-white/50 backdrop-blur-sm shadow-lg rounded-lg p-2 flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <input type="text"
                           placeholder="Search..."
                           value={search}
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg"/>
                    <Button label="Search" onCLick={submitSearch}/>
                </div>
                <Link href={`${BOOK_BASE_URL}/add`}>
                    <h1 className="text-indigo-500 font-bold text-lg px-4">Add new book</h1>
                </Link>
            </div>
            <BookTable books={books}/>
        </Page>
    );
}