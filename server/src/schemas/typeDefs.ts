const typeDefs = `
    type Book {
        bookId: String
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Auth {
        token: String
        user: User
    }

    input BookInput {
        authors: [String!]
        description: String!
        bookId: String!
        image: String!
        title: String!
    }
        
    type Query {
        me: User
    }

    type Mutation {
        login( email: String!, password: String!): Auth
        addUser( username: String!, email:String!, password: String! ): Auth
        saveBook( input: BookInput! ): User
        removeBook ( bookId: String! ): User
    }

`

export default typeDefs