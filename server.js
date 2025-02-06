const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const app = express();

// Define a route for GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enables GraphiQL for testing
  })
);

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${port}/graphql`);
});
