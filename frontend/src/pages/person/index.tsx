import React, {useEffect, useState} from "react";
import {PersonOverview} from "@/models/person-overview";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import PersonOverviewTable from "@/components/person-overview-table";
import Link from "next/link";

export default function PersonsPage() {

    const [persons, setPersons] = useState<PersonOverview[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getPersons()
    },[])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const submitSearch = () => {
        search.length > 0 ? searchPersons() : getPersons();
    }

    const getPersons = () => {
        instance.get("/person/overview")
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    }

    const searchPersons = () => {
        instance.post(`/person/search`, { SEARCH: `%${search}%` })
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Persons">
            <div className="min-w-full bg-white/50 backdrop-blur-sm shadow-lg rounded-lg p-2 flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2">
                    <input type="text"
                           placeholder="Search..."
                           value={search}
                           onChange={handleInputChange}
                           className="w-full px-4 py-2 rounded-lg"/>
                    <button onClick={submitSearch}
                            className="bg-indigo-500 text-white px-2 py-1 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none">Search</button>
                </div>
                <Link href="/person/add">
                    <h1 className="text-indigo-500 font-medium text-xl px-4">Add new person</h1>
                </Link>
            </div>
            <PersonOverviewTable persons={persons}/>
        </Page>
    );
}