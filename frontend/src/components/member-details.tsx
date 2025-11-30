import {useState} from "react";
import {Member} from "@/models/member";
import Tag from "@/components/tag";

export default function MemberDetails(props: { member: Member }) {

    const [edit, setEdit] = useState<boolean>(false);
    const borderColor = edit ? "border-b-indigo-500" : "border-b-gray-500";

    return (
        <div className="bg-white/50 backdrop-blur-sm border-gray-200 shadow-lg rounded-lg flex flex-row justify-between p-4">
            <div className="flex flex-col gap-4">
                <label className="text-sm mb-[-18px] text-indigo-500">Name</label>
                <input type="text" value={props.member.NAME} className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}/>
                <label className="text-sm mb-[-18px] text-indigo-500">Email</label>
                <input type="text" value={props.member.EMAIL} className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}/>
                <label className="text-sm mb-[-18px] text-indigo-500">Address</label>
                <input type="text" value={props.member.ADDRESS} className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}/>
                <label className="text-sm mb-[-18px] text-indigo-500">Phone Number</label>
                <input type="text" value={props.member.PHONE_NUMBER} className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}/>
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
                    <button onClick={() => setEdit(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-auto">
                        Cancel
                    </button>
                }
                {!edit ? null :
                    <button onClick={() => setEdit(false)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 shadow-md hover:shadow-lg focus:outline-none cursor-pointer mt-2">
                        Save
                    </button>
                }
            </div>
        </div>
    );
}