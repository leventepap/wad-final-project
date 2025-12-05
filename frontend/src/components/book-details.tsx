import React, {useState} from "react";
import {Book} from "@/models/book";
import {BOOK_BASE_URL, instance} from "@/utils/fetching";
import {useRouter} from "next/router";

export default function BookDetails(props: { book?: Book, setBook?: Function }) {

    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(props.book === undefined);
    const [bookForm, setBookForm] = useState<Book>(props.book || {
        ISBN: 0,
        TITLE: "",
        EDITION: 1,
        PUBLICATION: "",
    });
    const borderColor = edit ? "border-b-indigo-500" : "border-b-gray-500";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitCreate = () => {
        instance.post(BOOK_BASE_URL, bookForm)
            .then(res => {
                router.push(`${BOOK_BASE_URL}/${res.data.ISBN}`);
            })
            .catch(err => console.log(err));
    }

    const submitUpdate = () => {
        if (props.book) {
            instance.patch(`${BOOK_BASE_URL}/${props.book.ISBN}`, bookForm)
                .then(res => {
                    if (props.setBook) {
                        props.setBook({
                            ...res.data,
                        });
                    }
                    setEdit(false);
                })
                .catch(err => console.log(err));
        }
    };

    const handleCancel = () => {
        if (props.book) {
            setBookForm(props.book);
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
                    name="ISBN"
                    value={bookForm.ISBN}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Email</label>
                <input
                    type="text"
                    name="TITLE"
                    value={bookForm.TITLE}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Address</label>
                <input
                    type="text"
                    name="EDITION"
                    value={bookForm.EDITION}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Phone Number</label>
                <input
                    type="text"
                    name="PUBLICATION"
                    value={bookForm.PUBLICATION}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
            </div>
            {props.book ? editSection() : createSection()}
        </div>
    );
}