import {Person} from "@/models/person";

export default function PersonTable(props: { persons: Person[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone Number</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.persons.map((person) => (
                    <tr
                        key={person.ID}
                        className="hover:bg-gray-50 transition-colors duration-200"
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.ID}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.NAME}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.EMAIL}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.ADDRESS}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{person.PHONE_NUMBER}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}