import express from 'express'
import path from 'node:path'
import type { Request, Response } from 'express' // Added
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server' // Added
import { expressMiddleware } from '@apollo/server/express4' // Added
import { typeDefs, resolvers } from './schemas/index.js' // Added
import { authenticateToken } from './utils/auth.js' // Added
// import routes from './routes/index.js'


const server = new ApolloServer({
  typeDefs,
  resolvers
})

const startApolloServer = async () => {
  await server.start()
  await db()
  const app = express();
  const PORT = process.env.PORT || 3001

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server, { context: authenticateToken as any }))

  if (process.env.NODE_ENV === 'production') {
    console.log(__dirname)
    app.use(express.static(path.join(__dirname, '/client/dist')))

    

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join( __dirname, '/client/dist/index.html'))
    });
  }

  app.listen( PORT, () => {
    console.log(`🌍 Server is running on port ${PORT}.`)
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
  })

}

startApolloServer()




// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
