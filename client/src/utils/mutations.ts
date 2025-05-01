import { gql } from '@apollo/client'

export const LOGIN_USER = gql `
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
            savedBooks {
                bookId
            }
            email
            }
            token
        }
    }
`

export const ADD_USER = gql `
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            bookCount
            email
        }
    }
}
`

export const SAVE_BOOK = gql `
    mutation Mutation($input: BookInput!) {
        saveBook(input: $input) {
            _id
            bookCount
            email
        }
    }
`

export const REMOVE_BOOK = gql `
    mutation Mutation($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            bookCount
            email
        }
    }
`

