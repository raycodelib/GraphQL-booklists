import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_AUTHORS, LOAD_BOOKS } from "../GraphQL/Queries";
import { ADD_BOOK } from "../GraphQL/Mutations";

function AddBook() {
  const { loading, data } = useQuery(LOAD_AUTHORS);
  const [authors, setAuthors] = useState();
  const [bookname, setBookname] = useState("");
  const [genre, setGenre] = useState("");
  const [authorid, setAuthorid] = useState("");

  // const [addBook, { error }] = useMutation(ADD_BOOK);
  const [addBook] = useMutation(ADD_BOOK);
  // console.log(authors, bookname, genre, authorid);

  const submitForm = (e) => {
    if (bookname && genre && authorid) {
      e.preventDefault();
      addBook({
        variables: {
          name: bookname,
          genre: genre,
          authorid: authorid,
        },
        refetchQueries: [{ query: LOAD_BOOKS }],
      });
    } else {
      alert("Bookname, Genre and Author cannot be empty");
    }
  };

  useEffect(() => {
    if (data) {
      setAuthors(data.authors);
    } else {
      // console.log(`error data: ${data}`);
    }
  }, [data]);

  if (loading) {
    return <div>Loading authors...</div>;
  }
  if (authors) {
    return (
      <form onSubmit={submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            placeholder="Book name"
            onChange={(e) => {
              setBookname(e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            placeholder="Genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select
            onChange={(e) => {
              setAuthorid(e.target.value);
            }}
          >
            <option>Select author</option>
            {authors.map((author) => {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit">++</button>
      </form>
    );
  } else {
    return <div>Empty authors returned</div>;
  }
}

export default AddBook;
