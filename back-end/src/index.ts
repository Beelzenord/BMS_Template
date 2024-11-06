

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDef } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";


const server = new ApolloServer({
  typeDefs : typeDef,
  resolvers,
  formatError: (error) => {
    return error;
  }
});



async function startApolloServer() {
    const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
    console.log(`🚀 Server listening at: ${url}`);
  }
  
  startApolloServer();