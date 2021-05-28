import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // HttpLink,
  // from,
} from "@apollo/client";
// import { onError } from "@apollo/client/link/error";

import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//   if (graphqlErrors) {
//     // graphqlErrors.map(({ message, location, path }) => {
//     //   alert(`Graphql error: ${message}`);
//     // });
//     console.log(graphqlErrors);
//   }
// });
// const link = from([
//   new HttpLink({ uri: "http://localhost:5000/graphql" }),
//   errorLink,
// ]);

const link = "http://localhost:5000/graphql";

const client = new ApolloClient({
  uri: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
