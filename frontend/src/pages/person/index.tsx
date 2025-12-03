import {useEffect, useState} from "react";
import {PersonOverview} from "@/models/person-overview";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import PersonOverviewTable from "@/components/person-overview-table";

export default function PersonsPage() {

    const [persons, setPersons] = useState<PersonOverview[]>([]);

    useEffect(() => {
        instance.get("/person/overview")
            .then(res => setPersons(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Persons">
            <PersonOverviewTable persons={persons}/>
        </Page>
    );
}