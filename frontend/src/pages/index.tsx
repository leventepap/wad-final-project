import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {Person} from "@/models/person";
import {instance} from "@/utils/fetching";

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    instance({
      url: "/book",
      method: "get"
    })
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
    instance({
      url: "/person",
      method: "get"
    })
        .then(res => setPersons(res.data))
        .catch(err => console.log(err));
  },[])

  return (
      <>
        {books.map(book =>
            <p className="text-teal-500">{book.TITLE}</p>)}
        {persons.map(person =>
            <p className="text-teal-500">{person.NAME}</p>)}
      </>
  );
}
