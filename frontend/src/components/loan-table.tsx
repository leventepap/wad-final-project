import {Loan} from "@/models/loan";
import Link from "next/link";
import {formatDate} from "@/utils/utils";
import {MEMBER_BASE_URL} from "@/utils/fetching";

export default function LoanTable(props: { loans: Loan[] }) {

    const rowColor= (loan: Loan) => {
        const now = new Date();
        const dueDate = new Date(loan.DUE_DATE);
        const returnDate = !loan.RETURN_DATE ? null : new Date(loan.RETURN_DATE);
        if (returnDate) return "bg-green-100";
        if (!returnDate && dueDate < now) return "bg-red-100";
        if (!returnDate && dueDate > now) return "bg-blue-100";
        return "bg-white/50";
    }

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Borrow date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Due date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Return date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Borrower</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.loans.map((loan) => (
                    <tr key={loan.LOAN_ID} className={`${rowColor(loan)} hover:bg-gray-50 transition-colors duration-200`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{loan.TITLE}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(loan.BORROW_DATE)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(loan.DUE_DATE)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(loan.RETURN_DATE)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                            <Link href={`${MEMBER_BASE_URL}/${loan.MEMBER_ID}`}>{loan.BORROWER}</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}