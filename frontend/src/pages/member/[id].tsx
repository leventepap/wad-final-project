import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import {Member} from "@/models/member";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import MemberDetails from "@/components/member-details";

export default function MemberPage() {
    const router = useRouter()

    const [member, setMember] = useState<Member>();

    useEffect(() => {
        if (!router.query.id) return;
        instance.get(`/member/${router.query.id}`)
            .then(res => setMember(res.data))
            .catch(err => console.log(err));
    },[router.query.id])

    if (member) {
        return (
            <Page title={member.NAME}>
                <MemberDetails member={member} setMember={setMember}/>
            </Page>
        );
    }
    return <span>Loading...</span>
}