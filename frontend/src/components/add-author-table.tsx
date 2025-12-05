import {Person} from "@/models/person";
import React, {useState, useEffect} from "react";
import Button from "@/components/button";
import {instance, AUTHOR_BASE_URL} from "@/utils/fetching";
import {router} from "next/client";

interface SelectedAuthors {
    [key: number]: boolean;
}

export default function AddAuthorTable(props: { persons: Person[] }) {

    const [selectedAuthors, setSelectedAuthors] = useState<SelectedAuthors>({});
    
    useEffect(() => {
        const initialSelectedState = props.persons.reduce((acc, person) => {
            acc[person.ID] = false;
            return acc;
        }, {} as SelectedAuthors);
        
        setSelectedAuthors(initialSelectedState);
    }, [props.persons]);
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setSelectedAuthors(prev => ({
            ...prev,
            [parseInt(name)]: !prev[parseInt(name)]
        }));
    };

    const submitNewAuthors = () => {
        const selectedPersonIds = Object.keys(selectedAuthors).filter(key => selectedAuthors[parseInt(key)]);
        if (selectedPersonIds.length === 0) return;
        instance.post(`${AUTHOR_BASE_URL}/add`, {AUTHOR_IDS: selectedPersonIds})
            .then(() => {
                router.push(AUTHOR_BASE_URL);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col w-full bg-none">
                <Button label="Add selected to Authors" onCLick={() => submitNewAuthors()}/>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg">

                <table className="min-w-full bg-white/50 backdrop-blur-sm">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Add</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Address</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {props.persons.map((person) => (
                        <tr key={person.ID} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <input
                                    type="checkbox"
                                    name={person.ID.toString()}
                                    checked={selectedAuthors[person.ID]}
                                    onChange={handleCheckboxChange}
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm ">{person.NAME}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{person.ADDRESS}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}