import {AuthorOverview} from "@/models/author-overview";
import Link from "next/link";
import {AUTHOR_BASE_URL} from "@/utils/fetching";

export default function AuthorTable(props: { authors: AuthorOverview[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Books</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.authors.map((author) => (
                    <tr key={author.PERSON_ID} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                            <Link href={`${AUTHOR_BASE_URL}/${author.PERSON_ID}`}>{author.NAME}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{author.BOOKS}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
