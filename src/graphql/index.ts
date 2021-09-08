// Graphql Setup
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { Server } from 'http';
import { resolvers } from './resolvers';
import { Application } from 'express';
import typeDefs from './schemas';
import { verify } from 'jsonwebtoken';
import { DecodedToken } from '@models';


export const setup = async (app: Application, httpServer: Server) => {
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error: any) => {
      return error.originalError
    },  
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    
    context: ({ req }) => {
      try {
        const token: string = req.headers.authorization || '';
  
        if (token) {
          if (!token.startsWith('Bearer'))
            return {};

          const split = token.split('Bearer ')
          if (split.length !== 2)
            return {};

          const _token = split[1]

          const user: DecodedToken = verify(_token, `${process.env.SECRET}`) as DecodedToken;
          if (user) return { user };
        }
  
        return {};
      } catch (error) {
        return {};
      }
    }
  });


  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve: any) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
  console.log(`🚀 GrpahQL Server ready at http://localhost:4000${server.graphqlPath}`);

}