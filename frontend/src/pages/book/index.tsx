import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {BOOK_BASE_URL, instance} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";

export default function BooksPage() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        instance.get(BOOK_BASE_URL)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Books">
            <BookTable books={books}/>
        </Page>
    );
}