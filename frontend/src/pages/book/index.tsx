import React, {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {instance, BOOK_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";
import SearchBar from "@/components/search-bar";

export default function BooksPage() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        getBooks();
    },[])

    const submitSearch = (term: string) => {
        term.length > 0 ? searchBooks(term) : getBooks();
    }

    const getBooks = () => {
        instance.get(BOOK_BASE_URL)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }

    const searchBooks = (term: string) => {
        instance.post(`${BOOK_BASE_URL}/search`, { SEARCH: `%${term}%` })
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Books">
            <SearchBar submitSearch={submitSearch}
                       link={`${BOOK_BASE_URL}/add`}
                       label="Add new book"
            />
            <BookTable books={books}/>
        </Page>
    );
}