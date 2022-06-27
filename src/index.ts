import "reflect-metadata"
import { ApolloServer } from 'apollo-server';
import getAllModules from './modules'
import { buildSubgraphSchema } from '@apollo/federation';
import dataSource from '../ormconfig'

async function startServer() {
  const schemas = await getAllModules()
  const database = await dataSource.initialize()

  const server = new ApolloServer({
    schema: buildSubgraphSchema(schemas),
    context: {
      database
    },
    csrfPrevention: false,
  });

  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`);
}

startServer()