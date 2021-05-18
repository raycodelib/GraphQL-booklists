const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.get("/", function (req, res) {
  res.send("Use route /graphql to the graphqlHTTP");
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
