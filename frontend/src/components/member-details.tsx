import React, {useState} from "react";
import {Member} from "@/models/member";
import {Person} from "@/models/person";
import Tag from "@/components/tag";
import {instance, PERSON_BASE_URL} from "@/utils/fetching";

export default function MemberDetails(props: { member: Member, setMember: Function }) {

    const [edit, setEdit] = useState<boolean>(false);
    const [personForm, setPersonForm] = useState<Person>(props.member);
    const borderColor = edit ? "border-b-indigo-500" : "border-b-gray-500";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        instance.patch(`${PERSON_BASE_URL}/${props.member.PERSON_ID}`, personForm)
            .then(res => {
                props.setMember({
                    ...props.member,
                    ...res.data,
                });
                setEdit(false);
            })
            .catch(err => console.log(err));
    };

    const handleCancel = () => {
        setPersonForm(props.member);
        setEdit(false);
    };

    return (
        <div className="bg-white/50 backdrop-blur-sm border-gray-200 shadow-lg rounded-lg flex flex-row justify-between p-4">
            <div className="flex flex-col gap-4">
                <label className="text-sm mb-[-18px] text-indigo-500">Name</label>
                <input 
                    type="text" 
                    name="NAME"
                    value={personForm.NAME}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Email</label>
                <input 
                    type="text"
                    name="EMAIL" 
                    value={personForm.EMAIL}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Address</label>
                <input 
                    type="text"
                    name="ADDRESS" 
                    value={personForm.ADDRESS}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Phone Number</label>
                <input 
                    type="text"
                    name="PHONE_NUMBER" 
                    value={personForm.PHONE_NUMBER}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Tag title={!props.member.TERMINATED ? "Active" : "Terminated"} color={props.member.TERMINATED ? "red" : "green"}/>
                <span>Joined: {props.member.JOINED}</span>
                {props.member.TERMINATED && <span>Terminated: {props.member.TERMINATED}</span>}

                {edit ? null :
                    <button onClick={() => setEdit(true)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-auto">
                        Edit
                    </button>
                }
                {!edit ? null :
                    <button onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-auto">
                        Cancel
                    </button>
                }
                {!edit ? null :
                    <button onClick={handleSubmit}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-2">
                        Save
                    </button>
                }
            </div>
        </div>
    );
}