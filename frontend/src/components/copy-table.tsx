import {Copy} from "@/models/copy";
import Link from "next/link";
import {COPY_BASE_URL} from "@/utils/fetching";
import {formatDate} from "@/utils/utils";

export default function CopyTable(props: { copies: Copy[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Copy ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Acquired</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Retired</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.copies.map((copy) => (
                    <tr key={copy.ISBN} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                            <Link href={`${COPY_BASE_URL}/${copy.ID}`}>{copy.ID}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(copy.ACQUIRED)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(copy.RETIRED)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}