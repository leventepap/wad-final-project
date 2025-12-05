import React, {useEffect, useState} from "react";
import {PersonOverview} from "@/models/person-overview";
import {instance, PERSON_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import PersonTable from "@/components/person-table";
import SearchBar from "@/components/search-bar";

export default function PersonsPage() {

    const [persons, setPersons] = useState<PersonOverview[]>([]);

    useEffect(() => {
        getPersons()
    },[])

    const submitSearch = (term: string) => {
        term.length > 0 ? searchPersons(term) : getPersons();
    }

    const getPersons = () => {
        instance.get(`${PERSON_BASE_URL}/overview`)
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    }

    const searchPersons = (term: string) => {
        instance.post(`${PERSON_BASE_URL}/search`, { SEARCH: `%${term}%` })
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Persons">
            <SearchBar submitSearch={submitSearch}
                       link={`${PERSON_BASE_URL}/add`}
                       label="Add new person"
            />
            <PersonTable persons={persons}/>
        </Page>
    );
}