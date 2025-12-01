import {useEffect, useState} from "react";
import {Member} from "@/models/member";
import {instance} from "@/utils/fetching";
import Page from "@/components/page";
import MemberTable from "@/components/member-table";

export default function MembersPage() {

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        instance.get("/member")
            .then(res => setMembers(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Members">
            <MemberTable members={members}/>
        </Page>
    );
}