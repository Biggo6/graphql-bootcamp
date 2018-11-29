import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import db from './db';
import prisma from './prisma';

const server = new GraphQLServer({
    resolvers: {
        Query
    },
    typeDefs: './src/schema.graphql',
    context: {
        db,
        prisma
    }
});


server.start(() => console.log('Listening...'))