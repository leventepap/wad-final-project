import {useEffect, useState} from "react";
import {Book} from "@/models/book";
import {instance} from "@/utils/fetching";

export default function Home() {

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    instance({
      url: "/books",
      method: "get"
    })
        .then(res => setBooks(res.data))
        .catch(err => console.log(err));
  },[])

  return (
      books.map(book =>
          <p className="text-teal-500">{book.TITLE}</p>)
  );
}
