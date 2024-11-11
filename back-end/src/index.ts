

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDef } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from './database/database';
import dotenv from "dotenv";
import path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const server = new ApolloServer({
  typeDefs : typeDef,
  resolvers,
  formatError: (error) => {
    return error;
  }
});


async function startApolloServer() {
    try{
      await connectDB();
    }
    catch(error){
      console.error("error connecting to mongodb");
    }
    const PORT = Number(process.env.PORT);

    const { url } = await startStandaloneServer(server, { listen: { port: PORT || 4000 } });
    console.log(`🚀 Server listening at: ${url}`);
  }
  
  startApolloServer();

