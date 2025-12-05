import React, {useState} from "react";
import {Book} from "@/models/book";
import {BOOK_BASE_URL, instance} from "@/utils/fetching";
import {useRouter} from "next/router";
import Button, {ButtonColor} from "@/components/button";

export default function BookDetails(props: { book?: Book, setBook?: Function }) {

    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(props.book === undefined);
    const [bookForm, setBookForm] = useState<Book>(props.book || {
        ISBN: 0,
        TITLE: "",
        EDITION: 0,
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
                <Button label="Create" onCLick={submitCreate}/>
            </div>
        );
    }

    const editSection = () => {
        return (
            <div className="flex flex-col gap-2">
                {edit ? null :
                    <Button label="Edit" onCLick={() => setEdit(true)}/>
                }
                {!edit ? null :
                    <Button label="Cancel" onCLick={handleCancel} color={ButtonColor.INACTIVE}/>
                }
                {!edit ? null :
                    <Button label="Save" onCLick={submitUpdate}/>
                }
            </div>
        );
    }

    return (
        <div className="bg-white/50 backdrop-blur-sm border-gray-200 shadow-lg rounded-lg flex flex-row justify-between p-4">
            <div className="flex flex-col gap-4">
                <label className="text-sm mb-[-18px] text-indigo-500">ISBN</label>
                <input
                    type="text"
                    name="ISBN"
                    value={bookForm.ISBN === 0 ? "" : bookForm.ISBN}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Title</label>
                <input
                    type="text"
                    name="TITLE"
                    value={bookForm.TITLE}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Edition</label>
                <input
                    type="text"
                    name="EDITION"
                    value={bookForm.EDITION === 0 ? "" : bookForm.EDITION}
                    onChange={handleInputChange}
                    disabled={!edit}
                    className={`${borderColor} border-b-[1px] px-2 py-1 w-64`}
                />
                <label className="text-sm mb-[-18px] text-indigo-500">Publication</label>
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