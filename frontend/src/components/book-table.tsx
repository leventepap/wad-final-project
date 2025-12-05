import {Book} from "@/models/book";
import Link from "next/link";
import {BOOK_BASE_URL} from "@/utils/fetching";

export default function BookTable(props: { books: Book[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Edition</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {props.books.map((book) => (
                        <tr key={book.ISBN} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                                <Link href={`${BOOK_BASE_URL}/${book.ISBN}`}>{book.TITLE}</Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{book.EDITION}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}