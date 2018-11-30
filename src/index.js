import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import db from './db';
import prisma from './prisma';

const server = new GraphQLServer({
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    typeDefs: './src/schema.graphql',
    context(request) {
        return {
            db,
            prisma,
            request
        }
    }
});


server.start(() => console.log('Listening...'))