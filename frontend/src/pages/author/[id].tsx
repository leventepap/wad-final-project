import {useRouter} from 'next/router'
import React, {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {Person} from "@/models/person";
import {AUTHOR_BASE_URL, instance, PERSON_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import BookTable from "@/components/book-table";
import Button, {ButtonColor} from "@/components/button";

export default function AuthorPage() {
    const router = useRouter()

    const [books, setBooks] = useState<Book[]>([]);
    const [person, setPerson] = useState<Person>();
    const [confirm, setConfirm] = useState<boolean>(false);

    useEffect(() => {
        if (!router.query.id) return;
        instance.get(`${AUTHOR_BASE_URL}/${router.query.id}/books`)
            .then(res => setBooks(res.data))
            .catch(err => console.log(err));
        instance.get(`${PERSON_BASE_URL}/${router.query.id}`)
            .then(res => setPerson(res.data))
    },[router.query.id])

    const submitDelete = () => {
        instance.delete(`${AUTHOR_BASE_URL}/${router.query.id}`)
            .then(() => router.push(AUTHOR_BASE_URL))
            .catch(err => console.log(err));
    }

    if (books && person) {
        return (
            <Page title={person.NAME}>
                <BookTable books={books}/>
                <div className="flex flex-col w-full bg-none">
                    {!confirm ?
                        <Button label="Delete author"
                                onCLick={() => setConfirm(true)}
                        /> : null
                    }
                    {confirm ?
                        <div className="flex flex-row justify-around">
                            <Button label="Delete author"
                                    onCLick={submitDelete}
                                    color={ButtonColor.WARNING}
                            />
                            <Button label="Cancel"
                                    onCLick={() => setConfirm(false)}
                                    color={ButtonColor.INACTIVE}
                            />
                        </div> : null
                    }
                </div>
            </Page>
        );
    }
    return <span>Loading...</span>
}