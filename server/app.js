// required lib
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
require("dotenv").config();

// init app
const app = express();

// connect to mongodb via mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch((err) => {
    console.log(`db connection error: ${err.message}`);
    process.exit(-1);
  });

//middleware to pass request to graphql
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

//root page information
app.get("/", function (req, res) {
  res.send("Please use the route /graphql to the graphqlHTTP");
});

//server is listening to port 4000
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is listening on port: " + process.env.SERVER_PORT);
});
