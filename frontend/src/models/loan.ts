export interface Loan {
    LOAN_ID: number;
    TITLE: string;
    BORROW_DATE: string;
    DUE_DATE: string;
    RETURN_DATE: string | null;
    MEMBER_ID: number;
    BORROWER: string;
}