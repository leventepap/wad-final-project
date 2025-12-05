import {useEffect, useState} from "react";
import {Person} from "@/models/person";
import {instance, AUTHOR_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import SearchBar from "@/components/search-bar";
import AddAuthorTable from "@/components/add-author-table";

export default function AddAuthorPage() {

    const [nonAuthors, setNonAuthors] = useState<Person[]>([])

    useEffect(() => {
        getNonAuthors();
    },[]);

    const submitSearch = (term: string) => {
        term.length > 0 ? searchNonAuthors(term) : getNonAuthors();
    }

    const getNonAuthors = () => {
        instance.get(`${AUTHOR_BASE_URL}/persons`)
            .then(res => setNonAuthors(res.data))
            .catch(err => console.log(err));
    }

    const searchNonAuthors = (term: string) => {
        instance.post(`${AUTHOR_BASE_URL}/persons/search`, { SEARCH: `%${term}%` })
            .then(res => setNonAuthors(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Add new author">
            <SearchBar submitSearch={submitSearch}/>
            <AddAuthorTable persons={nonAuthors} />
        </Page>
    );
}