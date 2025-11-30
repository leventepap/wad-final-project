import {Book} from "@/models/book";

export default function BookTable(props: { books: Book[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ISBN</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Edition</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Publication</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {props.books.map((book) => (
                        <tr 
                            key={book.ISBN}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{book.ISBN}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{book.TITLE}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{book.EDITION}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{book.PUBLICATION}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}