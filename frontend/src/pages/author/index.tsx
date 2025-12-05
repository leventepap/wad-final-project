import {useEffect, useState} from "react";
import {AuthorOverview} from "@/models/author-overview";
import {instance, AUTHOR_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import AuthorTable from "@/components/author-table";

export default function AuthorsPage() {

    const [authors, setAuthors] = useState<AuthorOverview[]>([]);

    useEffect(() => {
        instance.get(AUTHOR_BASE_URL)
            .then(res => setAuthors(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Authors">
            <AuthorTable authors={authors}/>
        </Page>
    );
}