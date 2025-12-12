import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {Copy} from "@/models/copy";
import {BOOK_BASE_URL, COPY_BASE_URL, instance} from "@/utils/fetching";
import Page from "@/components/page";
import BookDetails from "@/components/book-details";
import CopyTable from "@/components/copy-table";

export default function BookPage() {
    const router = useRouter()

    const [book, setBook] = useState<Book>();
    const [copies, setCopies] = useState<Copy[]>([]);

    useEffect(() => {
        if (!router.query.isbn) return;
        instance.get(`${BOOK_BASE_URL}/${router.query.isbn}`)
            .then(res => setBook(res.data))
            .catch(err => console.log(err));
        instance.get(`${COPY_BASE_URL}/${router.query.isbn}`)
            .then(res => setCopies(res.data))
            .catch(err => console.log(err));
    },[router.query.isbn])

    if (book && copies) {
        return (
            <Page title={book.TITLE}>
                <BookDetails book={book} setBook={setBook}/>
                <CopyTable copies={copies}/>
            </Page>
        );
    }
    return <span>Loading...</span>
}