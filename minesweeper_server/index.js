const { ApolloServer, gql, AuthenticationError, ForbiddenError } = require('apollo-server');
const { users } = require('./users');

const typeDefs = gql`
    type Query {
        authenticate(username: String, password: String): String
        me: User
    }

    type User {
        username: String!
        email: String!
    }
`;

const resolvers = {
    Query: {
        authenticate: (parent, {username, password}, context) => {
            const found = users.find(
                user => user.username === username && user.password === password
            );

            return found && found.token;
        },
        me: (parent, args, { user }) => {
            if (!user) throw new AuthenticationError('not authenticated');
            return user;
        }
    }
};

const context = ({ req }) => {
    if (!req.headers.authorization)
        return { user: 'undefined' };
        //throw new AuthenticationError('mssing token');

    const token = req.headers.authorization.substr(7);
    const user = users.find(user => user.token === token);
    //if (!user)
        // throw new AuthenticationError('invalid token');
    return { user };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.listen().then(({ url }) => {
    console.log(`Listening at ${url}`);
});