import React, {useEffect, useState} from "react";
import {Member} from "@/models/member";
import {instance, MEMBER_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import MemberTable from "@/components/member-table";
import SearchBar from "@/components/search-bar";

export default function MembersPage() {

    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        getMembers();
    },[])

    const submitSearch = (term: string) => {
        term.length > 0 ? searchMembers(term) : getMembers();
    }

    const getMembers = () => {
        instance.get(MEMBER_BASE_URL)
            .then(res => setMembers(res.data))
            .catch(err => console.log(err));
    }

    const searchMembers = (term: string) => {
        instance.post(`${MEMBER_BASE_URL}/search`, { SEARCH: `%${term}%` })
            .then(res => setMembers(res.data))
            .catch(err => console.log(err));
    }

    return (
        <Page title="Members">
            <SearchBar submitSearch={submitSearch}
                       link={`${MEMBER_BASE_URL}/add`}
                       label="Add new member"
            />
            <MemberTable members={members}/>
        </Page>
    );
}