import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {Person} from "@/models/person";
import {instance, AUTHOR_BASE_URL, PERSON_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";

export default function AuthorPage() {
    const router = useRouter()

    const [books, setBooks] = useState<Book[]>([]);
    const [person, setPerson] = useState<Person>();

    useEffect(() => {
        if (!router.query.id) return;
        instance.get(`${AUTHOR_BASE_URL}/${router.query.id}/books`)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
        instance.get(`${PERSON_BASE_URL}/${router.query.id}`)
            .then(res => setPerson(res.data))
    },[router.query.id])

    if (books && person) {
        return (
            <Page title={person.NAME}>
                <BookTable books={books}/>
            </Page>
        );
    }
    return <span>Loading...</span>
}