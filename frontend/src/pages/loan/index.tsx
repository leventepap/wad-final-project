import {useEffect, useState} from "react";
import {Loan} from "@/models/loan";
import {instance, LOAN_BASE_URL} from "@/utils/fetching";
import Page from "@/components/page";
import LoanTable from "@/components/loan-table";

export default function BooksPage() {

    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        instance.get(LOAN_BASE_URL)
            .then(res => setLoans(res.data))
            .catch(err => console.log(err));
    },[])

    return (
        <Page title="Loans">
            <LoanTable loans={loans}/>
        </Page>
    );
}