import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
  query {
    books {
      id
      name
      genre
    }
  }
`;

export const LOAD_AUTHORS = gql`
  query {
    authors {
      id
      name
      age
      books {
        name
        genre
      }
    }
  }
`;

export const BOOK_DETAILS = gql`
  query book($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
