import {PersonOverview} from "@/models/person-overview";
import Tag from "@/components/tag";
import Link from "next/link";

export default function PersonTable(props: { persons: PersonOverview[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Roles</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.persons.map((person) => (
                    <tr key={person.ID} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.ID}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                            <Link href={`/person/${person.ID}`}>{person.NAME}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.ADDRESS}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {person.AUTHOR_PERSON_ID ?
                                <Link href={`/author/${person.AUTHOR_PERSON_ID}`}>
                                    <Tag title="Author" color="blue"/>
                                </Link> : null
                            }
                            {person.MEMBER_PERSON_ID ?
                                <Link href={`/member/${person.MEMBER_PERSON_ID}`}>
                                    <Tag title="Member" color="yellow"/>
                                </Link> : null
                            }
                            {person.STAFF_PERSON_ID ?
                                <Link href={`/staff/${person.STAFF_PERSON_ID}`}>
                                    <Tag title="Staff" color="purple"/>
                                </Link> : null
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}