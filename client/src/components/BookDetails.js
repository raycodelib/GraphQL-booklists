import { useEffect, useState, useContext } from "react";
import { useQuery } from "@apollo/client";
import { BOOK_DETAILS } from "../GraphQL/Queries";
import BookIDContext from "./BookIDContext";

function BookDetails() {
  const selectedbook = useContext(BookIDContext);
  const { data } = useQuery(BOOK_DETAILS, {
    variables: { id: selectedbook }, // (id : selectedbook) not (selectedbook)
  });

  const [bookname, setBookname] = useState();
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      let book = data.book;
      if (book) {
        setBookname(book.name);
        setAuthor(book.author.name);
        setGenre(book.genre);
        setBooks(book.author.books);
      }
    }
  }, [data]);

  if (data && data.book) {
    return (
      <div>
        <h2>{bookname}</h2>
        <p>{author}</p>
        <p>{genre}</p>
        <ul className="other-books">
          {books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected</div>;
  }
}

export default BookDetails;
