import {useEffect, useState} from "react";
import {Member} from "@/models/member";
import {instance, MEMBER_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import MemberTable from "@/components/member-table";

export default function MembersPage() {

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        instance.get(MEMBER_BASE_URL)
            .then(res => setMembers(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Members">
            <MemberTable members={members}/>
        </Page>
    );
}