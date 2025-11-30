import {useEffect, useState} from "react";
import {Person} from "@/models/person";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import PersonTable from "@/components/person-table";

export default function PersonsPage() {

    const [persons, setPersons] = useState<Person[]>([]);

    useEffect(() => {
        instance({
            url: "/person",
            method: "get"
        })
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Persons">
            <PersonTable persons={persons}/>
        </Page>
    );
}