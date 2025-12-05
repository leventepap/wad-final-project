import {useEffect, useState} from "react";
import {AuthorOverview} from "@/models/author-overview";
import {instance, AUTHOR_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import AuthorTable from "@/components/author-table";
import SearchBar from "@/components/search-bar";

export default function AuthorsPage() {

    const [authors, setAuthors] = useState<AuthorOverview[]>([]);

    useEffect(() => {
        getAuthors();
    },[])

    const submitSearch = (term: string) => {
        term.length > 0 ? searchAuthors(term) : getAuthors();
    }

    const getAuthors = () => {
        instance.get(AUTHOR_BASE_URL)
            .then(res => setAuthors(res.data))
            .catch(err => console.log(err));
    }

    const searchAuthors = (term: string) => {
        instance.post(`${AUTHOR_BASE_URL}/search`, { SEARCH: `%${term}%` })
            .then(res => setAuthors(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Authors">
            <SearchBar submitSearch={submitSearch}
                       link={`${AUTHOR_BASE_URL}/add`}
                       label="Add new author"
            />
            <AuthorTable authors={authors}/>
        </Page>
    );
}