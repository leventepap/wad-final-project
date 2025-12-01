import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";

export default function BooksPage() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        instance.get("/book")
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Books">
            <BookTable books={books}/>
        </Page>
    );
}