import { User } from "../models/index"
import { signToken, AuthenticationError } from '../utils/auth'

interface Book {
    bookId: string
    title: string
    authors: string[]
    description: string
    image: string
    link: string
}

interface User {
    _id: unknown
    username: string
    email: string
    savedBooks: Book[]
    bookCount: number
}

interface LoginArgs {
    email: string
    password: string
}

interface AddUserArgs {
    username: string
    email: string
    password: string
}

interface BookInputArgs {
    input: {
        authors: string[]
        description: string
        title: string
        bookId: string
        image: string
        link: string
    }
}

interface Auth {
    token: string
    user: User
}

interface Context {
    user?: User;
  }

const resolvers = {
    Query: {
        me: async (_parent: any, _args: any, context: Context ): Promise<User | null>  => {
            if (!context.user) {
                throw AuthenticationError
            }
            return await User.findOne({ _id: context.user._id })
        }
    },
    Mutation: {
        login: async ( _parent: any, { email, password }: LoginArgs ): Promise<Auth> => {
            const user = await User.findOne({ email })
            if (!user) {
                throw new AuthenticationError('Invalid credentials')
            }
            const verifiedPassword = await user.isCorrectPassword(password)
            if (!verifiedPassword) {
                throw new AuthenticationError('Invalid credentials')
            }

            const token = signToken(user.username, user.email, user._id)
            return { token, user }
        },
        addUser: async ( _parent: any, { username, email, password }: AddUserArgs ): Promise<Auth> => {
            const user = await User.create({ username, email, password })
            if (!user) {
                throw new Error("Error creating user")
            }
            const token = signToken(user.username, user.email, user._id)
            return { token, user }
        },
        saveBook: async ( _parent: any, { input }: BookInputArgs, context: Context ): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('Invalid credentials')
            }
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: {...input} } },
                { new: true, runValidators: true }
            );
        },
        removeBook: async ( _parent: any, { bookId }: {bookId: string}, context: Context ): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('Invalid credentials')
            }
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
        }
    }
}

export default resolvers