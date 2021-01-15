const { ApolloServer, PubSub } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers/index');
const express = require('express');
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static('public'));

app.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000`);
});
