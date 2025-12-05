import React, {useState} from "react";
import {Person} from "@/models/person";
import {instance, PERSON_BASE_URL} from "@/utils/fetching";
import {useRouter} from "next/router";

export default function PersonDetails(props: { person?: Person, setPerson?: Function }) {

    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(props.person === undefined);
    const [personForm, setPersonForm] = useState<Person>(props.person || {
        ID: 0,
        NAME: "",
        EMAIL: "",
        ADDRESS: "",
        PHONE_NUMBER: "",
    });
    const borderColor = edit ? "border-b-indigo-500" : "border-b-gray-500";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitCreate = () => {
        instance.post(PERSON_BASE_URL, personForm)
            .then(res => {
                router.push(`${PERSON_BASE_URL}/${res.data.ID}`);
            })
            .catch(err => console.log(err));
    }

    const submitUpdate = () => {
        if (props.person) {
            instance.patch(`${PERSON_BASE_URL}/${props.person.ID}`, personForm)
                .then(res => {
                    if (props.setPerson) {
                        props.setPerson({
                            ...res.data,
                        });
                    }
                    setEdit(false);
                })
                .catch(err => console.log(err));
        }
    };

    const handleCancel = () => {
        if (props.person) {
            setPersonForm(props.person);
            setEdit(false);
        }
    };

    const createSection = () => {
        return (
            <div className="flex flex-col gap-2">
                <button onClick={submitCreate}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-2">
                    Create
                </button>
            </div>
        );
    }

    const editSection = () => {
        return (
            <div className="flex flex-col gap-2">
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
                    <button onClick={submitUpdate}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-2">
                        Save
                    </button>
                }
            </div>
        );
    }

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
            {props.person ? editSection() : createSection()}
        </div>
    );
}