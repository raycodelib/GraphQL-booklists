import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { LOAD_BOOKS } from "../GraphQL/Queries";
import BookDetails from "./BookDetails";
import BookIDContext from "./BookIDContext";

function BookList() {
  const { loading, data } = useQuery(LOAD_BOOKS);
  const [books, setBooks] = useState();
  const [selectedbook, setSelectedBook] = useState();

  useEffect(() => {
    if (data) {
      setBooks(data.books);
    } else {
      // console.log(`error data: ${data}`);
    }
  }, [data]);

  if (loading) {
    return <div>Loading books...</div>;
  }
  if (books) {
    return (
      <div>
        <ul id="book-list">
          {books.map((book) => {
            return (
              <li
                key={book.id}
                onClick={(e) => {
                  setSelectedBook(book.id);
                }}
              >
                {book.name}
              </li>
            );
          })}
        </ul>
        <BookIDContext.Provider value={selectedbook}>
          <BookDetails />
        </BookIDContext.Provider>
      </div>
    );
  } else {
    return <div>Empty Books returned</div>;
  }
}

export default BookList;
