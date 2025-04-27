const typeDefs = `
    type Book {
        bookId: string
        title: string
        authors: string[]
        description: string
        image: string
        link: string
    }

    type User {
        _id: ID!
        username: string
        email: string
        savedBooks: Book[]
        bookCount: number
    }

    type Auth {
        token: string
        user: User
    }

    type Query {
        me: User
    }

    input BookInput {
        authors: String[]!
        description: String!
        title: String!
        bookId: String!
        image: String!
        link: String!
    }

    type Mutation {
        login( email: String!, password: String!): Auth
        addUser( username: String!, email:String!, password: String! ): Auth
        saveBook( input: BookInput! ): Auth
        removeBook ( bookId: String! ): User
    }

`

export default typeDefs