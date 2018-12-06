'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _index = require('./resolvers/index');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _graphqlYoga.GraphQLServer({
    resolvers: _index.resolvers,
    typeDefs: './src/schema.graphql',
    context: function context(request) {
        return {
            db: _db2.default,
            prisma: _prisma2.default,
            request: request
        };
    },

    fragmentReplacements: _index.fragmentReplacements
});

server.start({
    port: process.env.PORT || 4000
}, function () {
    return console.log('Listening...');
});