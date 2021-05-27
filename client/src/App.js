import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // HttpLink,
  // from,
} from "@apollo/client";
// import { onError } from "@apollo/client/link/error";

import BookList from "./components/BookList";

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
      <BookList />
    </ApolloProvider>
  );
}

export default App;
