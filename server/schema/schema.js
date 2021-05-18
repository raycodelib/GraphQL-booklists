const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

var books = [
  { name: "Harry Potter 1", genre: "Fantasy", id: "1", authorid: "1" },
  { name: "Harry Potter 2", genre: "Fantasy", id: "2", authorid: "2" },
  { name: "Harry Potter 3", genre: "Fantasy", id: "3", authorid: "3" },
  { name: "Harry Potter 4", genre: "Fantasy", id: "4", authorid: "2" },
  { name: "Harry Potter 5", genre: "Fantasy", id: "5", authorid: "3" },
  { name: "Harry Potter 6", genre: "Fantasy", id: "6", authorid: "3" },
];

var authors = [
  { name: "JK", age: 50, id: "1" },
  { name: "ABC", age: 60, id: "2" },
  { name: "XYZ", age: 70, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //code to get data from db
        return _.find(books, { id: args.id });
      },
    },

    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //code to get data from db
        return _.find(authors, { id: args.id });
      },
    },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
