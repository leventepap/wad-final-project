import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {BOOK_BASE_URL, instance} from "@/utils/fetching";
import Page from "@/components/page";
import BookDetails from "@/components/book-details";

export default function BookPage() {
    const router = useRouter()

    const [book, setBook] = useState<Book>();

    useEffect(() => {
        if (!router.query.isbn) return;
        instance.get(`${BOOK_BASE_URL}/${router.query.isbn}`)
            .then(res => setBook(res.data))
            .catch(err => console.log(err));
    },[router.query.id])

    if (book) {
        return (
            <Page title={book.TITLE}>
                <BookDetails book={book} setBook={setBook}/>
            </Page>
        );
    }
    return <span>Loading...</span>
}