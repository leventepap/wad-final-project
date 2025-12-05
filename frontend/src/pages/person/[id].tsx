import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {Person} from "@/models/person";
import {instance, PERSON_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import PersonDetails from "@/components/person-details";

export default function PersonPage() {
    const router = useRouter()

    const [person, setPerson] = useState<Person>();

    useEffect(() => {
        if (!router.query.id) return;
        instance.get(`${PERSON_BASE_URL}/${router.query.id}`)
            .then(res => setPerson(res.data))
            .catch(err => console.log(err));
    },[router.query.id])

    if (person) {
        return (
            <Page title={person.NAME}>
                <PersonDetails person={person} setPerson={setPerson}/>
            </Page>
        );
    }
    return <span>Loading...</span>
}