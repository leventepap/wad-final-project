import {Member} from "@/models/member";
import Tag from "@/components/tag";
import Link from "next/link";

export default function MemberTable(props: { members: Member[] }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white/50 backdrop-blur-sm">
                <thead>
                <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {props.members.map((member) => (
                    <tr key={member.ID} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.ID}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                            <Link href={`/member/${member.ID}`}>{member.NAME}</Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{member.EMAIL}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Tag title={!member.TERMINATED ? "Active" : "Terminated"} color={member.TERMINATED ? "red" : "green"}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
