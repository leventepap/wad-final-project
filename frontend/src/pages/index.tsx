import axios from "axios";
import {useEffect, useState} from "react";
import {Book} from "@/models/book";

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);

  const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    headers: {"Cache-Control": "no-cache"}
  });

  useEffect(() => {
    instance({
      url: '/books',
      method: 'get'
    })
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
  },[])

  return (
      books.map(book =>
          <p className="text-teal-500">{book.TITLE}</p>)
  );
}
