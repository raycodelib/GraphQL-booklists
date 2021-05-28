import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_AUTHORS } from "../GraphQL/Queries";

function AddBook() {
  const { loading, data } = useQuery(LOAD_AUTHORS);
  const [authors, setAuthors] = useState();

  useEffect(() => {
    if (data) {
      console.log(data);
      setAuthors(data.authors);
    } else {
      //   console.log(`error data: ${data}`);
    }
  }, [data]);

  if (loading) {
    return <div>Loading authors...</div>;
  }
  if (authors) {
    return (
      <form>
        <div className="field">
          <label>Book name:</label>
          <input type="text"></input>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text"></input>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            {authors.map((author) => {
              return <option key={author.id}>{author.name}</option>;
            })}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  } else {
    return <div>Empty authors returned</div>;
  }
}

export default AddBook;
