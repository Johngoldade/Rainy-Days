import { gql } from '@apollo/client'

// define the gql queries 
export const QUERY_ME = gql `
    query Query {
        me {
            _id
            bookCount
            email
            savedBooks {
            authors
            bookId
            description
            image
            link
            title
            }
            username
        }
    }
`